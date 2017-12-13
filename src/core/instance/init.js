/**
 * Created by zj on 2017/12/8.
 */
import {mergeOptions} from '../util/options';
import {initState} from './state'
import {callHook} from './lifescycle'
let uid = 0;
export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this;
        vm._uid = uid++;
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm)
        initState(vm);
        callHook(vm, 'beforeCreate');
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