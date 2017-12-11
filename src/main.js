/**
 * Created by zj on 2017/12/6.
 */
import Observer from './core/observer/index'
import {observe} from './core/observer/index'
import {initMixin} from './core/instance/init'
function  Vue(options) {
    this._init(options);
}
initMixin(Vue);
export default Vue;