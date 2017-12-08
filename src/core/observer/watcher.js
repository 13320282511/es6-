/**
 * Created by zj on 2017/12/8.
 */
export default class Watcher {
    constructor(vm, expOrFn, cb, options) {
        this.vm = vm;
        this.cb = cb;
        //Dep.target = this;
        //console.log(Dep)

    }
    update() {

    }
    addDep(dep) {
        dep.addSub(this)
    }
}