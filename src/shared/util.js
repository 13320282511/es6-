/**
 * Created by zj on 2017/12/11.
 */
export function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}
// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
export function isUndef (v){
    return v === undefined || v === null
}

export function isDef (v) {
    return v !== undefined && v !== null
}
export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}
export function isTrue (v){
    return v === true
}
/**
 * Check if value is primitive
 */
export function isPrimitive (value){
    return typeof value === 'string' || typeof value === 'number'
}
/**
 * Check if val is a valid array index.
 */
export function isValidArrayIndex(val) {
    //暂时不清楚为什么还要String(val)
    const n = parseFloat(String(val))
    //如果n不是小数的正整数  而且必须是有限数字  NAN Infinity和-Infinity都不行
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}
export const emptyObject = Object.freeze({})
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(str,
                        expectsLowerCase) {
    const map = Object.create(null)
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? val => map[val.toLowerCase()]
        : val => map[val]
}