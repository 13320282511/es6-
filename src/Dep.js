/**
 * Created by zj on 2017/12/7.
 */
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        const subs = this.subs.slice()
        for(let i=0; i<subs.length;i++) {
            subs[i].update()
        }
    }
}
export default Dep