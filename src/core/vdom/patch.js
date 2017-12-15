/**
 * Created by zj on 2017/12/14.
 */
import {isDef, isUndef, isTrue,isPrimitive} from '../../core/util'
import {SSR_ATTR} from '../../shared/constants'
import VNode from '../vdom/vnode'
import config from '../config'
import {activeInstance} from '../../core/instance/lifecycle'
export function createPatchFunction(backend) {
    const nodeOps = backend;

    function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }
    let inPre = 0
    /*创建一个节点*/
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
        /*insertedVnodeQueue为空数组[]的时候isRootInsert标志为true*/
        vnode.isRootInsert = !nested // for transition enter check
        /*创建一个组件节点*/
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return
        }

        const data = vnode.data
        const children = vnode.children
        const tag = vnode.tag
        if (isDef(tag)) {
            if (process.env.NODE_ENV !== 'production') {
                if (data && data.pre) {
                    inPre++
                }
                if (
                    !inPre &&
                    !vnode.ns &&
                    !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
                    config.isUnknownElement(tag)
                ) {
                    warn(
                        'Unknown custom element: <' + tag + '> - did you ' +
                        'register the component correctly? For recursive components, ' +
                        'make sure to provide the "name" option.',
                        vnode.context
                    )
                }
            }
            vnode.elm = vnode.ns
                ? nodeOps.createElementNS(vnode.ns, tag)
                : nodeOps.createElement(tag, vnode)
            setScope(vnode)

            /* istanbul ignore if */
            let __WEEX__ = false;
            if (__WEEX__) {
                // in Weex, the default insertion order is parent-first.
                // List items can be optimized to use children-first insertion
                // with append="tree".
                const appendAsTree = isDef(data) && isTrue(data.appendAsTree)
                if (!appendAsTree) {
                    if (isDef(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue)
                    }
                    insert(parentElm, vnode.elm, refElm)
                }
                createChildren(vnode, children, insertedVnodeQueue)
                if (appendAsTree) {
                    if (isDef(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue)
                    }
                    insert(parentElm, vnode.elm, refElm)
                }
            } else {
                createChildren(vnode, children, insertedVnodeQueue)
                if (isDef(data)) {
                    //invokeCreateHooks(vnode, insertedVnodeQueue)
                }
                insert(parentElm, vnode.elm, refElm)
            }

            if (process.env.NODE_ENV !== 'production' && data && data.pre) {
                inPre--
            }
        } else if (isTrue(vnode.isComment)) {
            vnode.elm = nodeOps.createComment(vnode.text)
            insert(parentElm, vnode.elm, refElm)
        } else {
            vnode.elm = nodeOps.createTextNode(vnode.text)
            insert(parentElm, vnode.elm, refElm)
        }
    }
    /*创建一个组件*/
    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
        let i = vnode.data
        if (isDef(i)) {
            const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
            if (isDef(i = i.hook) && isDef(i = i.init)) {
                i(vnode, false /* hydrating */, parentElm, refElm)
            }
            // after calling the init hook, if the vnode is a child component
            // it should've created a child instance and mounted it. the child
            // component also has set the placeholder vnode's elm.
            // in that case we can just return the element and be done.
            /*
             在调用了init钩子以后，如果VNode是一个子组件，它应该已经创建了一个子组件实例并挂载它。
             子组件也应该设置了一个VNode占位符，我们直接返回组件实例即可。
             意思就是如果已经存在组件实例，则不需要重新创建一个新的，我们要做的就是初始化组件以及激活组件即可，还是用原来的组件实例。
             */
            if (isDef(vnode.componentInstance)) {
                /*初始化组件*/
                initComponent(vnode, insertedVnodeQueue)
                if (isTrue(isReactivated)) {
                    reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
                }
                return true
            }
        }
    }
    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    /*为scoped CSS 设置scoped id*/
    function setScope (vnode) {
        let i
        let ancestor = vnode
        while (ancestor) {
            if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
                nodeOps.setAttribute(vnode.elm, i, '')
            }
            ancestor = ancestor.parent
        }
        // for slot content they should also get the scopeId from the host instance.
        if (isDef(i = activeInstance) &&
            i !== vnode.context &&
            isDef(i = i.$options._scopeId)) {
            nodeOps.setAttribute(vnode.elm, i, '')
        }
    }
    function createChildren (vnode, children, insertedVnodeQueue) {
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; ++i) {
                createElm(children[i], insertedVnodeQueue, vnode.elm, null, true)
            }
        } else if (isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
        }
    }
    /*调用创建的钩子函数*/
    function invokeCreateHooks (vnode, insertedVnodeQueue) {
        /*循环调用modules中的create钩子*/
        for (let i = 0; i < cbs.create.length; ++i) {
            cbs.create[i](emptyNode, vnode)
        }
        i = vnode.data.hook // Reuse variable
        if (isDef(i)) {
            if (isDef(i.create)) i.create(emptyNode, vnode)
            if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
        }
    }
    function insert (parent, elm, ref) {
        if (isDef(parent)) {
            if (isDef(ref)) {
                if (ref.parentNode === parent) {
                    nodeOps.insertBefore(parent, elm, ref)
                }
            } else {
                nodeOps.appendChild(parent, elm)
            }
        }
    }
    return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
        if (isUndef(vnode)) {
            return
        }
        const insertedVnodeQueue = []
        if (isUndef(oldVnode)) {

        } else {
            const isRealElement = isDef(oldVnode.nodeType);
            if (!isRealElement) {

            } else {
                if (isRealElement) {
                    if (oldVnode.nodeType == 1) {
                        oldVnode.removeAttribute(SSR_ATTR);
                        hydrating = true
                    }
                    if (isTrue(hydrating)) {

                    }
                    oldVnode = emptyNodeAt(oldVnode)
                }
                const oldElm = oldVnode.elm
                const parentElm = nodeOps.parentNode(oldElm)
                console.log('parentElm',parentElm)
                createElm(
                    vnode,
                    insertedVnodeQueue,
                    // extremely rare edge case: do not insert if old element is in a
                    // leaving transition. Only happens when combining transition +
                    // keep-alive + HOCs. (#4590)
                    oldElm._leaveCb ? null : parentElm,
                    nodeOps.nextSibling(oldElm)
                )
            }
        }
    }
}