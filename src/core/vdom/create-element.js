/**
 * Created by zj on 2017/12/15.
 */
import VNode,{createEmptyVNode} from './vnode'
import {isDef} from '../../core/util'
const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2
export function createElement(context,
                              tag,
                              data,
                              children,
                              normalizationType,
                              alwaysNormalize) {
    // if (Array.isArray(data) || isPrimitive(data)) {
    //     normalizationType = children
    //     children = data
    //     data = undefined
    // }
    // if (isTrue(alwaysNormalize)) {
    //     normalizationType = ALWAYS_NORMALIZE
    // }
    return _createElement(context, tag, data, children, normalizationType)
}

export function _createElement(context,
                               tag,
                               data,
                               children,
                               normalizationType) {
    // if (isDef(data) && isDef((data).__ob__))
    // {
    //     process.env.NODE_ENV !== 'production' && warn(
    //         `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
    //         'Always create fresh vnode data objects in each render!',
    //         context
    //     )
    //     return createEmptyVNode()
    // }
    // // object syntax in v-bind
    // if (isDef(data) && isDef(data.is)) {
    //     tag = data.is
    // }
    if (!tag) {
        // in case of component :is set to falsy value
        return createEmptyVNode()
    }
    // warn against non-primitive key
    // if (process.env.NODE_ENV !== 'production' &&
    //     isDef(data) && isDef(data.key) && !isPrimitive(data.key)
    // ) {
    //     warn(
    //         'Avoid using non-primitive value as key, ' +
    //         'use string/number value instead.',
    //         context
    //     )
    // }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
        typeof children[0] === 'function'
    ) {
        data = data || {}
        data.scopedSlots = {default: children[0]}
        children.length = 0
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children)
    } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children)
    }
    let vnode, ns
    if (typeof tag === 'string') {
        // let Ctor
        // ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
        // if (config.isReservedTag(tag)) {
        //     // platform built-in elements
        //     vnode = new VNode(
        //         config.parsePlatformTagName(tag), data, children,
        //         undefined, undefined, context
        //     )
        // } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        //     // component
        //     vnode = createComponent(Ctor, data, context, children, tag)
        // } else {
        //     // unknown or unlisted namespaced elements
        //     // check at runtime because it may get assigned a namespace when its
        //     // parent normalizes children
        //     vnode = new VNode(
        //         tag, data, children,
        //         undefined, undefined, context
        //     )
        // }
        vnode = new VNode(
            tag, data, children,
            undefined, undefined, context
        )
    } else {
        // direct component options / constructor
        vnode = createComponent(tag, data, context, children)
    }
    if (isDef(vnode)) {
       // if (ns) applyNS(vnode, ns)
        return vnode
    } else {
        return createEmptyVNode()
    }
}