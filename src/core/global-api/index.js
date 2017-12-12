/**
 * Created by zj on 2017/12/12.
 */
import config from '../config';
import {ASSET_TYPES} from '../../shared/constants'
export function initGlobalAPI(Vue) {
    const configDef = {}
    configDef.get = () => config
    Object.defineProperty(Vue, 'config', configDef)
    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })
    // Vue.options._base = Vue;
}