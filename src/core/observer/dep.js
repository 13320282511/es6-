/**
 * Created by zj on 2017/12/8.
 */
import Watcher from './watcher'
export default class Dep {
    constructor() {
        this.id = 1;
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        const subs = this.subs.slice();
        for(let i = 0;i<subs.length;i++) {
            subs[i].update();
        }
    }
}
Dep.target = null;