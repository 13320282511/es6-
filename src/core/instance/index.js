/**
 * Created by zj on 2017/12/6.
 */
import {stateMixin} from './state'
import {initMixin} from './init'
import {renderMixin} from './render'
import {lifecycleMixin} from './lifescycle'
function  Vue(options) {
    this._init(options);
}
initMixin(Vue);
stateMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
export default Vue;