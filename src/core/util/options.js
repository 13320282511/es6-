/**
 * Created by zj on 2017/12/8.
 */
import {ASSET_TYPES,LIFECYCLE_HOOKS} from '../../shared/constants'
import config from '../config'
import {extend,hasOwn} from '../../shared/util'
const strats = config.optionMergeStrategies;
const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
        ? parentVal
        : childVal
}
function mergeHook (
    parentVal,
    childVal
){
    return childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal
}
ASSET_TYPES.forEach(function(type) {
    strats[type+'s'] = mergeAssets;
})
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
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
function mergeData (to, from) {
    if (!from) return to
    let key, toVal, fromVal
    const keys = Object.keys(from)
    for (let i = 0; i < keys.length; i++) {
        key = keys[i]
        toVal = to[key]
        fromVal = from[key]
        if (!hasOwn(to, key)) {
            set(to, key, fromVal)
        } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
            mergeData(toVal, fromVal)
        }
    }
    return to
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
    let key;
    const options = {};
    for(key in parent) {
        mergeFiled(key)
    }
    for (key in child) {
        if (!hasOwn(parent,key)) {
            mergeFiled(key)
        }
    }
    function mergeFiled(key) {
        const strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key)
    }
    return options;
}