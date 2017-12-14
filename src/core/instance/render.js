/**
 * Created by zj on 2017/12/14.
 */
import {emptyObject} from '../util/index'
import VNode,{createEmptyVNode} from '../vdom/vnode'
export function renderMixin (Vue) {
    // install runtime convenience helpers
    //installRenderHelpers(Vue.prototype)

    Vue.prototype.$nextTick = function (fn) {
        return nextTick(fn, this)
    }

    Vue.prototype._render = function (){
        const vm = this
        const { render, _parentVnode } = vm.$options

        if (vm._isMounted) {
            // if the parent didn't update, the slot nodes will be the ones from
            // last render. They need to be cloned to ensure "freshness" for this render.
            for (const key in vm.$slots) {
                const slot = vm.$slots[key]
                // _rendered is a flag added by renderSlot, but may not be present
                // if the slot is passed from manually written render functions
                if (slot._rendered || (slot[0] && slot[0].elm)) {
                    vm.$slots[key] = cloneVNodes(slot, true /* deep */)
                }
            }
        }

        vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject

        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode
        // render self
        let vnode
        try {
            console.log('render',render)
            console.log('vm._renderProxy',vm._renderProxy)
            console.log('vm.$createElement',vm.$createElement)
            vnode = render.call(vm._renderProxy)
            //vnode = render.call(vm._renderProxy, vm.$createElement)
        } catch (e) {
            handleError(e, vm, `render`)
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            if (process.env.NODE_ENV !== 'production') {
                if (vm.$options.renderError) {
                    try {
                        vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
                    } catch (e) {
                        handleError(e, vm, `renderError`)
                        vnode = vm._vnode
                    }
                } else {
                    vnode = vm._vnode
                }
            } else {
                vnode = vm._vnode
            }
        }
        // return empty vnode in case the render function errored out
        if (!(vnode instanceof VNode)) {
            if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
                warn(
                    'Multiple root nodes returned from render function. Render function ' +
                    'should return a single root node.',
                    vm
                )
            }
            vnode = createEmptyVNode()
        }
        // set parent
        vnode.parent = _parentVnode
        return vnode
    }
}
