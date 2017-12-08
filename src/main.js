/**
 * Created by zj on 2017/12/6.
 */
import Observer from './core/observer/index'
import {observe} from './core/observer/index'
function  Vue(options) {
    // this._data = options.data
    // this._proxy(this._data)
    // // observer(this._data, options.render)
    // observe(this._data());
    // _proxy(data) {
    //     const that = this;
    //     Object.keys(data).forEach((key) => {
    //         Object.defineProperty(that, key, {
    //             enumerable: true,
    //             configurable: true,
    //             get: ()=>{
    //                 return that._data[key]
    //             },
    //             set:(val)=> {
    //                 that._data[key] = val;
    //             }
    //         })
    //     })
    //
    // }
    this._init(options);
}

export default Vue;