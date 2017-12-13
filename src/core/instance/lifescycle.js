/**
 * Created by zj on 2017/12/13.
 */
import Watcher from '../observer/watcher'
export function mountComponent (
    vm,
    el,
    hydrating
){
    vm.$el = el
    if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode
        if (process.env.NODE_ENV !== 'production') {
            /* istanbul ignore if */
            if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                vm.$options.el || el) {
                warn(
                    'You are using the runtime-only build of Vue where the template ' +
                    'compiler is not available. Either pre-compile the templates into ' +
                    'render functions, or use the compiler-included build.',
                    vm
                )
            } else {
                warn(
                    'Failed to mount component: template or render function not defined.',
                    vm
                )
            }
        }
    }
   // callHook(vm, 'beforeMount')

    let updateComponent
    /* istanbul ignore if */
    // if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    //     updateComponent = () => {
    //         const name = vm._name
    //         const id = vm._uid
    //         const startTag = `vue-perf-start:${id}`
    //         const endTag = `vue-perf-end:${id}`
    //
    //         mark(startTag)
    //         const vnode = vm._render()
    //         mark(endTag)
    //         measure(`vue ${name} render`, startTag, endTag)
    //
    //         mark(startTag)
    //         vm._update(vnode, hydrating)
    //         mark(endTag)
    //         measure(`vue ${name} patch`, startTag, endTag)
    //     }
    // } else {
        updateComponent = () => {
            vm._update(vm._render(), hydrating)
        }
    // }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    let noop = false
    new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */)
    hydrating = false

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
        vm._isMounted = true
        //callHook(vm, 'mounted')
    }
    return vm
}

export function callHook (vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            try {
                handlers[i].call(vm)
            } catch (e) {
                handleError(e, vm, `${hook} hook`)
            }
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook)
    }
}