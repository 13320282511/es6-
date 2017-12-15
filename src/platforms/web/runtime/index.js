/**
 * Created by zj on 2017/12/13.
 */
// public mount method
import Vue from '../../../core/index'
import {inBrowser} from '../../../core/util/index'
import {mountComponent} from '../../../core/instance/lifecycle'
import {query} from '../util/index'
import {patch} from './patch'
// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : function(){}
Vue.prototype.$mount = function (el,
                                 hydrating) {
    el = el && inBrowser ? query(el) : undefined
    return mountComponent(this, el, hydrating)
}
export default Vue;