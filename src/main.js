/**
 * Created by zj on 2017/12/6.
 */
import Dep from './Dep'
import Watcher from './Watcher'
class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data, options.render);
        let watcher = new Watcher(this);
    }
}
function _proxy(data,Vue) {
    const that = Vue;
    console.log('that',that)
    Object.keys(data).forEach((key) => {
        console.log('data',data)
       Object.defineProperty(data, key, {
           enumerable: true,
           configurable: true,
            get: ()=>{
                return that._data[key] || 88
            },
            set:(val)=> {
                that._data[key] = val;
            }
        })
    })

}
function observer(value, cb) {
    Object.keys(value).forEach((key) => {defineReactive(value, key, value[key] , cb)})
}
// function defineReactive(obj, key, val, cb) {
//     Object.defineProperty(obj, key, {
//         enumerable: true,
//         configurable: true,
//         get: () => {
//             console.log(1111)
//             //return obj[key]
//         },
//         set: newVal =>{
//
//             cb()
//         }
//     })
// }
function defineReactive (obj, key, val, cb) {
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            if (Dep.target) {
                /*Watcher对象存在全局的Dep.target中*/
                dep.addSub(Dep.target);
            }
        },
        set:newVal=> {
            /*只有之前addSub中的函数才会触发*/
            dep.notify();
        }
    })
}

Dep.target = null;
export default Vue;