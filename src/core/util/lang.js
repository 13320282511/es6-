/**
 * Created by zj on 2017/12/12.
 */
export function isReserved (str){
    const c = (str + '').charCodeAt(0)
    return c === 0x24 || c === 0x5F
}

export function def (obj, key, val, enumerable) {
    console.log('obj def',obj)
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}