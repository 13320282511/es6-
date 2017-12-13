/**
 * Created by zj on 2017/12/13.
 */
// public mount method
import Vue from '../../../index'
import {inBrowser} from '../../../core/util/index'
import {mountComponent} from '../../../core/instance/lifescycle'
import {query} from '../util/index'
Vue.prototype.$mount = function (el,
                                 hydrating) {
    el = el && inBrowser ? query(el) : undefined
    return mountComponent(this, el, hydrating)
}
export default Vue;