/**
 * Created by zj on 2017/12/6.
 */
import {stateMixin} from './core/instance/state'
import {initMixin} from './core/instance/init'
function  Vue(options) {
    this._init(options);
}
initMixin(Vue);
// stateMixin(Vue)
export default Vue;