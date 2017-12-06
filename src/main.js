/**
 * Created by zj on 2017/12/6.
 */
class Vue {
    constructor(options) {
        this._data = options.data
        _proxy(this, options.render,this._data)
        // observer(this._data, options.render)
    }
}
function _proxy(object, cb,data) {
    const that = object;
    const obj = data;
    Object.keys(data).forEach((key) => {
        console.log('data',data);
        var val = that._data[key];
        console.log(val)
        console.log('obj',obj)
       Object.defineProperty(that._data, key, {
           enumberable: true,
           configurable: true,
            get: ()=>{
                return obj[key]
            },
            set:(val)=> {
                that._data[key] = val;
            }
        })
    })

}
// function observer(value, cb) {
//     Object.keys(value).forEach((key) => {defineReactive(value, key, value[key] , cb)})
// }
// function defineReactive(obj, key, val, cb) {
//     Object.defineProperty(obj, key, {
//         enumberable: true,
//         configurable: true,
//         get: () => {
//             return val
//         },
//         set: newVal =>{
//
//             cb()
//         }
//     })
// }
export default Vue;