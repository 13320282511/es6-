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
}
Dep.target = null;