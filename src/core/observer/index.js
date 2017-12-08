/**
 * Created by zj on 2017/12/8.
 */
import Watcher from './watcher'
import Dep from './dep'
export default class Observer {
    constructor(value) {
        new Dep()
    }
}
export function observe(value, asRootData) {
    let ob;
    ob =new Observer(value);
    return ob;
}