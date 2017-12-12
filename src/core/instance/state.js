/**
 * Created by zj on 2017/12/12.
 */
import {isReserved} from '../util/lang'
import {observe} from '../observer/index'
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function () {
    },
    set: function () {
    }
}
export function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
function getData (data, vm) {
    console.log('dataFunction',data)
    try {
        return data.call(vm, vm)
    } catch (e) {
        handleError(e, vm, `data()`)
        return {}
    }
}
export function initState (vm) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
        initData(vm)
    } else {
        observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm, opts.computed)
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}

function initData(vm) {
    let data = vm.$options.data
    console.log('data',data)
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {}
        console.log('data1',data)
    // if (!isPlainObject(data)) {
    //     data = {}
    //     process.env.NODE_ENV !== 'production' && warn(
    //         'data functions should return an object:\n' +
    //         'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
    //         vm
    //     )
    // }
    // proxy data on instance
    const keys = Object.keys(data)
    const props = vm.$options.props
    const methods = vm.$options.methods
    let i = keys.length
    while (i--) {
        const key = keys[i]
        if (process.env.NODE_ENV !== 'production') {
            if (methods && hasOwn(methods, key)) {
                warn(
                    `Method "${key}" has already been defined as a data property.`,
                    vm
                )
            }
        }
        if (props && hasOwn(props, key)) {
            process.env.NODE_ENV !== 'production' && warn(
                `The data property "${key}" is already declared as a prop. ` +
                `Use prop default value instead.`,
                vm
            )
        } else if (!isReserved(key)) {
            proxy(vm, `_data`, key)
        }
    }
    // observe data
    observe(data, true /* asRootData */)
}

export function stateMixin(Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    const dataDef = {}
    dataDef.get = function () {
        return this._data
    }
    const propsDef = {}
    propsDef.get = function () {
        return this._props
    }
    if (process.env.NODE_ENV !== 'production') {
        dataDef.set = function (newData) {
            warn(
                'Avoid replacing instance root $data. ' +
                'Use nested data properties instead.',
                this
            )
        }
        propsDef.set = function () {
            warn(`$props is readonly.`, this)
        }
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef)
    Object.defineProperty(Vue.prototype, '$props', propsDef)

    Vue.prototype.$set = set
    Vue.prototype.$delete = del

    Vue.prototype.$watch = function (expOrFn,
                                     cb,
                                     options) {
        const vm = this
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {}
        options.user = true
        const watcher = new Watcher(vm, expOrFn, cb, options)
        if (options.immediate) {
            cb.call(vm, watcher.value)
        }
        return function unwatchFn() {
            watcher.teardown()
        }
    }
}