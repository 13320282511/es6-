/**
 * Created by zj on 2017/12/11.
 */
export function extend(to, _from) {
    for(var key in _from) {
        to[key] = _from[key];
    }
    return to;
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key){
    return hasOwnProperty.call(obj, key)
}

export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}
