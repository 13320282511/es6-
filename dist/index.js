/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export defineReactive */
/* harmony export (immutable) */ __webpack_exports__["a"] = observe;
/* unused harmony export set */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dep__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_lang__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_util__ = __webpack_require__(9);
/**
 * Created by zj on 2017/12/8.
 */




class Observer {
    constructor(value) {
        this.vmCount = 0;
        this.dep = new __WEBPACK_IMPORTED_MODULE_1__dep__["a" /* default */]();
        console.log('value',value)
        Object(__WEBPACK_IMPORTED_MODULE_2__util_lang__["a" /* def */])(value, '__ob__', this)
        if (Array.isArray(value)) {
            const augment = hasProto
                ? protoAugment
                : copyAugment
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}
/* unused harmony export default */


function defineReactive(obj,
                               key,
                               val,
                               customSetter,
                               shallow) {
    const dep = new __WEBPACK_IMPORTED_MODULE_1__dep__["a" /* default */]()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }

    // cater for pre-defined getter/setters
    const getter = property && property.get
    const setter = property && property.set
console.log('www')
    let childOb = !shallow && observe(val)
    console.log('childOb',childOb)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            if (__WEBPACK_IMPORTED_MODULE_1__dep__["a" /* default */].target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val
            /* eslint-disable no-self-compare */
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            /* eslint-enable no-self-compare */
            if (process.env.NODE_ENV !== 'production' && customSetter) {
                customSetter()
            }
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            childOb = !shallow && observe(newVal)
            dep.notify()
        }
    })
}

function observe(value, asRootData) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__shared_util__["b" /* isObject */])(value)) {
        return
    }
    let ob;
    ob = new Observer(value);
    ob.vmCount++;
    return ob;
}

function set(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    const ob = (target).__ob__
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - declare it upfront in the data option.'
        )
        return val
    }
    if (!ob) {
        target[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(12)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by zj on 2017/12/8.
 */
let uid = 0;
class Watcher {
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
/* unused harmony export default */


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_global_api_index__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_js__ = __webpack_require__(3);
/**
 * Created by zj on 2017/12/6.
 */


Object(__WEBPACK_IMPORTED_MODULE_0__core_global_api_index__["a" /* initGlobalAPI */])(__WEBPACK_IMPORTED_MODULE_1__main_js__["a" /* default */]);
window.Vue = __WEBPACK_IMPORTED_MODULE_1__main_js__["a" /* default */];

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_instance_state__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_instance_init__ = __webpack_require__(5);
/**
 * Created by zj on 2017/12/6.
 */


function  Vue(options) {
    this._init(options);
}
Object(__WEBPACK_IMPORTED_MODULE_1__core_instance_init__["a" /* initMixin */])(Vue);
// stateMixin(Vue)
/* harmony default export */ __webpack_exports__["a"] = (Vue);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(1);
/**
 * Created by zj on 2017/12/8.
 */

class Dep {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Dep;

Dep.target = null;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initMixin;
/* unused harmony export resolveConstructorOptions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_options__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(11);
/**
 * Created by zj on 2017/12/8.
 */


let uid = 0;
function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this;
        vm._uid = uid++;
        vm.$options = Object(__WEBPACK_IMPORTED_MODULE_0__util_options__["a" /* mergeOptions */])(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm)
        Object(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* initState */])(vm);
    }
}
function resolveConstructorOptions (Ctor) {
    let options = Ctor.options;
    return options;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mergeDataOrFn */
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeOptions;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_util__ = __webpack_require__(9);
/**
 * Created by zj on 2017/12/8.
 */



const strats = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].optionMergeStrategies;
const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
        ? parentVal
        : childVal
}
__WEBPACK_IMPORTED_MODULE_0__shared_constants__["a" /* ASSET_TYPES */].forEach(function(type) {
    strats[type+'s'] = mergeAssets;
})
strats.data = function(parentVal, childVal, vm) {
    if(!vm) {

    }
    return mergeDataOrFn(parentVal, childVal, vm)
}
function mergeAssets(parentVal, childVal, vm, key) {
    const res = Object.create(parentVal || null);
    if(childVal) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__shared_util__["a" /* extend */])(res, childVal)
    }
    return res;
}
function mergeData (to, from) {
    if (!from) return to
    let key, toVal, fromVal
    const keys = Object.keys(from)
    for (let i = 0; i < keys.length; i++) {
        key = keys[i]
        toVal = to[key]
        fromVal = from[key]
        if (!hasOwn(to, key)) {
            set(to, key, fromVal)
        } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
            mergeData(toVal, fromVal)
        }
    }
    return to
}
function mergeDataOrFn(parentVal, childVal, vm) {
    if(!vm) {

    } else {
        return function mergedInstanceDataFn () {
            // instance merge
            const instanceData = typeof childVal === 'function'
                ? childVal.call(vm)
                : childVal
            const defaultData = typeof parentVal === 'function'
                ? parentVal.call(vm)
                : parentVal
            console.log('instanceData',instanceData)
            console.log('defaultData',defaultData)
            if (instanceData) {
                return mergeData(instanceData, defaultData)
            } else {
                return defaultData
            }
        }
    }
}
function mergeOptions(parent, child, vm) {
    console.log('parent',parent)
    let key;
    const options = {};
    for(key in parent) {
        mergeFiled(key)
    }
    for (key in child) {
        // if (!parent.hasOwnProperty(key)) {
        //     mergeField(key)
        // }
        mergeFiled(key)
    }
    function mergeFiled(key) {
        const strat = strats[key];
        options[key] = strat(parent[key], child[key], vm, key)
    }
    console.log('options',options)
    return options;
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by zj on 2017/12/11.
 */
const ASSET_TYPES = [
    'component',
    'directive',
    'filter'
]
/* harmony export (immutable) */ __webpack_exports__["a"] = ASSET_TYPES;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by zj on 2017/12/11.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    optionMergeStrategies: Object.create(null)
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;
/* unused harmony export hasOwn */
/* harmony export (immutable) */ __webpack_exports__["b"] = isObject;
/**
 * Created by zj on 2017/12/11.
 */
function extend(to, _from) {
    for(var key in _from) {
        to[key] = _from[key];
    }
    return to;
}

const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn (obj, key){
    return hasOwnProperty.call(obj, key)
}

function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initGlobalAPI;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_constants__ = __webpack_require__(7);
/**
 * Created by zj on 2017/12/12.
 */


function initGlobalAPI(Vue) {
    const configDef = {}
    configDef.get = () => __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */]
    Object.defineProperty(Vue, 'config', configDef)
    Vue.options = Object.create(null)
    __WEBPACK_IMPORTED_MODULE_1__shared_constants__["a" /* ASSET_TYPES */].forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })
    // Vue.options._base = Vue;
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export proxy */
/* harmony export (immutable) */ __webpack_exports__["a"] = initState;
/* unused harmony export stateMixin */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_lang__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observer_index__ = __webpack_require__(0);
/**
 * Created by zj on 2017/12/12.
 */


const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function () {
    },
    set: function () {
    }
}
function proxy(target, sourceKey, key) {
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
function initState (vm) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
        initData(vm)
    } else {
        Object(__WEBPACK_IMPORTED_MODULE_1__observer_index__["a" /* observe */])(vm._data = {}, true /* asRootData */)
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
        } else if (!Object(__WEBPACK_IMPORTED_MODULE_0__util_lang__["b" /* isReserved */])(key)) {
            proxy(vm, `_data`, key)
        }
    }
    // observe data
    Object(__WEBPACK_IMPORTED_MODULE_1__observer_index__["a" /* observe */])(data, true /* asRootData */)
}

function stateMixin(Vue) {
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(12)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = isReserved;
/* harmony export (immutable) */ __webpack_exports__["a"] = def;
/**
 * Created by zj on 2017/12/12.
 */
function isReserved (str){
    const c = (str + '').charCodeAt(0)
    return c === 0x24 || c === 0x5F
}

function def (obj, key, val, enumerable) {
    console.log('obj',obj)
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

/***/ })
/******/ ]);