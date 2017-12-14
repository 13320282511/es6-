/**
 * Created by zj on 2017/12/8.
 */
import config from '../config'
import {mark} from '../util/index'
import {mergeOptions} from '../util/options';
import {initState} from './state'
import {initProxy} from './proxy'
import {callHook,initLifecycle} from './lifescycle'
let uid = 0;
export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this;
        vm._uid = uid++;
        let startTag, endTag
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
            startTag = `vue-perf-start:${vm._uid}`
            endTag = `vue-perf-end:${vm._uid}`
            mark(startTag)
        }

        // a flag to avoid this being observed
        vm._isVue = true
        // merge options
        if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options)
        } else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            )
        }
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            initProxy(vm)
        } else {
            vm._renderProxy = vm
        }
        initLifecycle(vm);
        callHook(vm, 'beforeCreate');
        initState(vm);
        callHook(vm, 'created');
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}
export function resolveConstructorOptions (Ctor) {
    let options = Ctor.options;
    return options;
}