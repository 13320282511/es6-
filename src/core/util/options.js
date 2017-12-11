/**
 * Created by zj on 2017/12/8.
 */
import {ASSET_TYPES} from '../../shared/constants'
import config from '../config'
import {extend} from '../../shared/util'
const strats = config.optionMergeStrategies;
ASSET_TYPES.forEach(function(type) {
    strats[type+'s'] = mergeAssets;
})
strats.data = function(parentVal, childVal, vm) {
    if(!vm) {

    }
    return mergeDataOrFn(parentVal, childVal, vm)
}
function mergeAssets(parentVal, childVal, vm, key) {
    const res = Object.create(parentVal || null);
    if(childVal) {
        return extend(res, childVal)
    }
    return res;
}
export function mergeDataOrFn(parentVal, childVal, vm) {
    if(!vm) {

    } else {
        return function mergedInstanceDataFn () {
            // instance merge
            const instanceData = typeof childVal === 'function'
                ? childVal.call(vm)
                : childVal
            const defaultData = typeof parentVal === 'function'
                ? parentVal.call(vm)
                : parentVal
            if (instanceData) {
                return mergeData(instanceData, defaultData)
            } else {
                return defaultData
            }
        }
    }
}
export function mergeOptions(parent, child, vm) {
    console.log('parent',parent)
    let key;
    const options = {};
    for(key in parent) {
        mergeFiled(key)
    }
    for (key in child) {
        // if (!parent.hasOwnProperty(key)) {
        //     mergeField(key)
        // }
        mergeFiled(key)
    }
    function mergeFiled(key) {
        const strat = strats[key];
        options[key] = strat(parent[key], child[key], vm, key)
    }
    console.log('options',options)
    return options;
}