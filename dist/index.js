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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants__ = __webpack_require__(4);
/**
 * Created by zj on 2017/12/11.
 */

/* harmony default export */ __webpack_exports__["a"] = ({
    optionMergeStrategies: Object.create(null),
    _lifecycleHooks: __WEBPACK_IMPORTED_MODULE_0__shared_constants__["b" /* LIFECYCLE_HOOKS */],
    /**
     * Whether to record perf
     */
    performance: false,
    /**
     * Custom user key aliases for v-on
     */
    keyCodes: Object.create(null),
    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],
    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: () => false
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_util__ = __webpack_require__(3);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_util__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_util__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_util__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_util__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_util__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__shared_util__["j"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__env__ = __webpack_require__(10);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__env__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lang__ = __webpack_require__(5);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__perf__ = __webpack_require__(11);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__perf__["a"]; });
/**
 * Created by zj on 2017/12/13.
 */





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = extend;
/* harmony export (immutable) */ __webpack_exports__["c"] = hasOwn;
/* harmony export (immutable) */ __webpack_exports__["h"] = isUndef;
/* harmony export (immutable) */ __webpack_exports__["d"] = isDef;
/* harmony export (immutable) */ __webpack_exports__["e"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["g"] = isTrue;
/* harmony export (immutable) */ __webpack_exports__["f"] = isPrimitive;
/* harmony export (immutable) */ __webpack_exports__["i"] = isValidArrayIndex;
/* harmony export (immutable) */ __webpack_exports__["j"] = makeMap;
/**
 * Created by zj on 2017/12/11.
 */
function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}

const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}
// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v){
    return v === undefined || v === null
}

function isDef (v) {
    return v !== undefined && v !== null
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}
function isTrue (v){
    return v === true
}
/**
 * Check if value is primitive
 */
function isPrimitive (value){
    return typeof value === 'string' || typeof value === 'number'
}
/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
    //暂时不清楚为什么还要String(val)
    const n = parseFloat(String(val))
    //如果n不是小数的正整数  而且必须是有限数字  NAN Infinity和-Infinity都不行
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}
const emptyObject = Object.freeze({})
/* harmony export (immutable) */ __webpack_exports__["a"] = emptyObject;

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str,
                        expectsLowerCase) {
    const map = Object.create(null)
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? val => map[val.toLowerCase()]
        : val => map[val]
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by zj on 2017/12/11.
 */
const SSR_ATTR = 'data-server-rendered'
/* harmony export (immutable) */ __webpack_exports__["c"] = SSR_ATTR;

const ASSET_TYPES = [
    'component',
    'directive',
    'filter'
]
/* harmony export (immutable) */ __webpack_exports__["a"] = ASSET_TYPES;

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured'
]
/* harmony export (immutable) */ __webpack_exports__["b"] = LIFECYCLE_HOOKS;


/***/ }),
/* 5 */
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
    console.log('obj def',obj)
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dep__ = __webpack_require__(9);
/**
 * Created by zj on 2017/12/8.
 */

let uid = 0;
class Watcher {
    constructor(vm, expOrFn, cb, options,isRenderWatcher) {
        this.vm = vm;
        this.cb = cb;
        //Dep.target = this;
        //console.log(Dep)
        if (isRenderWatcher) {
            vm._watcher = this
        }
        vm._watchers.push(this)
        // options
        if (options) {
            this.deep = !!options.deep
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
        } else {
            this.deep = this.user = this.lazy = this.sync = false
        }
        this.cb = cb
        this.id = ++uid // uid for batching
        this.active = true
        this.dirty = this.lazy // for lazy watchers
        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.expression = process.env.NODE_ENV !== 'production'
            ? expOrFn.toString()
            : ''
        // parse expression for getter
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            if (!this.getter) {
                this.getter = function () {}
                process.env.NODE_ENV !== 'production' && warn(
                    `Failed watching path: "${expOrFn}" ` +
                    'Watcher only accepts simple dot-delimited paths. ' +
                    'For full control, use a function instead.',
                    vm
                )
            }
        }
        this.value = this.lazy
            ? undefined
            : this.get()
    }
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get () {
        Object(__WEBPACK_IMPORTED_MODULE_0__dep__["c" /* pushTarget */])(this)
        let value
        const vm = this.vm
        try {
            value = this.getter.call(vm, vm)
        } catch (e) {
            if (this.user) {
                handleError(e, vm, `getter for watcher "${this.expression}"`)
            } else {
                throw e
            }
        } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value)
            }
            Object(__WEBPACK_IMPORTED_MODULE_0__dep__["b" /* popTarget */])()
            this.cleanupDeps()
        }
        return value
    }
    /**
     * Clean up for dependency collection.
     */
    cleanupDeps () {
        let i = this.deps.length
        while (i--) {
            const dep = this.deps[i]
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this)
            }
        }
        let tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    update() {

    }
    addDep(dep) {
        dep.addSub(this)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Watcher;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return activeInstance; });
/* harmony export (immutable) */ __webpack_exports__["c"] = initLifecycle;
/* harmony export (immutable) */ __webpack_exports__["e"] = mountComponent;
/* harmony export (immutable) */ __webpack_exports__["d"] = lifecycleMixin;
/* harmony export (immutable) */ __webpack_exports__["b"] = callHook;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observer_watcher__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vdom_patch__ = __webpack_require__(12);
/**
 * Created by zj on 2017/12/13.
 */


let activeInstance = null;
function initLifecycle (vm) {
    const options = vm.$options

    // locate first non-abstract parent
    let parent = options.parent
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }

    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm

    vm.$children = []
    vm.$refs = {}

    vm._watcher = null
    vm._inactive = null
    vm._directInactive = false
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}
function mountComponent (
    vm,
    el,
    hydrating
){
    vm.$el = el
    if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode
        if (process.env.NODE_ENV !== 'production') {
            /* istanbul ignore if */
            if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                vm.$options.el || el) {
                warn(
                    'You are using the runtime-only build of Vue where the template ' +
                    'compiler is not available. Either pre-compile the templates into ' +
                    'render functions, or use the compiler-included build.',
                    vm
                )
            } else {
                warn(
                    'Failed to mount component: template or render function not defined.',
                    vm
                )
            }
        }
    }
   // callHook(vm, 'beforeMount')

    let updateComponent
    /* istanbul ignore if */
    // if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    //     updateComponent = () => {
    //         const name = vm._name
    //         const id = vm._uid
    //         const startTag = `vue-perf-start:${id}`
    //         const endTag = `vue-perf-end:${id}`
    //
    //         mark(startTag)
    //         const vnode = vm._render()
    //         mark(endTag)
    //         measure(`vue ${name} render`, startTag, endTag)
    //
    //         mark(startTag)
    //         vm._update(vnode, hydrating)
    //         mark(endTag)
    //         measure(`vue ${name} patch`, startTag, endTag)
    //     }
    // } else {
        updateComponent = () => {
            vm._update(vm._render(), hydrating)
        }
    // }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    let noop = false
    new __WEBPACK_IMPORTED_MODULE_0__observer_watcher__["a" /* default */](vm, updateComponent, noop, null, true /* isRenderWatcher */)
    hydrating = false

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
        vm._isMounted = true
        //callHook(vm, 'mounted')
    }
    return vm
}
function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
        const vm= this
        if (vm._isMounted) {
            callHook(vm, 'beforeUpdate')
        }
        const prevEl = vm.$el
        const prevVnode = vm._vnode
        const prevActiveInstance = activeInstance
        activeInstance = vm
        vm._vnode = vnode
        // Vue.prototype.__patch__ is injected in entry points
        // based on the rendering backend used.
        console.log('prevVnode',prevVnode)
        if (!prevVnode) {
            // initial render
            console.log('vm.$el',vm.$el)
            console.log('vnode',vnode)
            vm.$el = vm.__patch__(
                vm.$el, vnode, hydrating, false /* removeOnly */,
                vm.$options._parentElm,
                vm.$options._refElm
            )
            // no need for the ref nodes after initial patch
            // this prevents keeping a detached DOM tree in memory (#5851)
            vm.$options._parentElm = vm.$options._refElm = null
        } else {
            // updates
            vm.$el = vm.__patch__(prevVnode, vnode)
        }
        activeInstance = prevActiveInstance
        // update __vue__ reference
        if (prevEl) {
            prevEl.__vue__ = null
        }
        if (vm.$el) {
            vm.$el.__vue__ = vm
        }
        // if parent is an HOC, update its $el as well
        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
            vm.$parent.$el = vm.$el
        }
        // updated hook is called by the scheduler to ensure that children are
        // updated in a parent's updated hook.
    }

    Vue.prototype.$forceUpdate = function () {
        const vm = this
        if (vm._watcher) {
            vm._watcher.update()
        }
    }

    Vue.prototype.$destroy = function () {
        const vm = this
        if (vm._isBeingDestroyed) {
            return
        }
        callHook(vm, 'beforeDestroy')
        vm._isBeingDestroyed = true
        // remove self from parent
        const parent = vm.$parent
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
            remove(parent.$children, vm)
        }
        // teardown watchers
        if (vm._watcher) {
            vm._watcher.teardown()
        }
        let i = vm._watchers.length
        while (i--) {
            vm._watchers[i].teardown()
        }
        // remove reference from data ob
        // frozen object may not have observer.
        if (vm._data.__ob__) {
            vm._data.__ob__.vmCount--
        }
        // call the last hook...
        vm._isDestroyed = true
        // invoke destroy hooks on current rendered tree
        vm.__patch__(vm._vnode, null)
        // fire destroyed hook
        callHook(vm, 'destroyed')
        // turn off all instance listeners.
        vm.$off()
        // remove __vue__ reference
        if (vm.$el) {
            vm.$el.__vue__ = null
        }
        // release circular reference (#6759)
        if (vm.$vnode) {
            vm.$vnode.parent = null
        }
    }
}
function callHook (vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            try {
                handlers[i].call(vm)
            } catch (e) {
                handleError(e, vm, `${hook} hook`)
            }
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook)
    }
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export proxy */
/* harmony export (immutable) */ __webpack_exports__["a"] = initState;
/* harmony export (immutable) */ __webpack_exports__["b"] = stateMixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_lang__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observer_index__ = __webpack_require__(21);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__observer_index__["b" /* observe */])(vm._data = {}, true /* asRootData */)
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
    Object(__WEBPACK_IMPORTED_MODULE_1__observer_index__["b" /* observe */])(data, true /* asRootData */)
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

    Vue.prototype.$set = __WEBPACK_IMPORTED_MODULE_1__observer_index__["c" /* set */]
    Vue.prototype.$delete = __WEBPACK_IMPORTED_MODULE_1__observer_index__["a" /* del */]

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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = pushTarget;
/* harmony export (immutable) */ __webpack_exports__["b"] = popTarget;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(6);
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
const targetStack = []

function pushTarget (_target) {
    if (Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}
function popTarget () {
    Dep.target = targetStack.pop()
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by zj on 2017/12/13.
 */
const inBrowser = typeof window !== 'undefined'
/* harmony export (immutable) */ __webpack_exports__["a"] = inBrowser;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mark; });
/* unused harmony export measure */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__env__ = __webpack_require__(10);
/**
 * Created by zj on 2017/12/14.
 */

let mark
let measure

if (process.env.NODE_ENV !== 'production') {
    const perf = __WEBPACK_IMPORTED_MODULE_0__env__["a" /* inBrowser */] && window.performance
    /* istanbul ignore if */
    if (
        perf &&
        perf.mark &&
        perf.measure &&
        perf.clearMarks &&
        perf.clearMeasures
    ) {
        mark = tag => perf.mark(tag)
        measure = (name, startTag, endTag) => {
            perf.measure(name, startTag, endTag)
            perf.clearMarks(startTag)
            perf.clearMarks(endTag)
            perf.clearMeasures(name)
        }
    }
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = createPatchFunction;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vdom_vnode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_instance_lifecycle__ = __webpack_require__(7);
/**
 * Created by zj on 2017/12/14.
 */





function createPatchFunction(backend) {
    const nodeOps = backend;

    function emptyNodeAt(elm) {
        return new __WEBPACK_IMPORTED_MODULE_2__vdom_vnode__["b" /* default */](nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }
    let inPre = 0
    /*创建一个节点*/
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
        /*insertedVnodeQueue为空数组[]的时候isRootInsert标志为true*/
        vnode.isRootInsert = !nested // for transition enter check
        /*创建一个组件节点*/
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return
        }

        const data = vnode.data
        const children = vnode.children
        const tag = vnode.tag
        if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(tag)) {
            if (process.env.NODE_ENV !== 'production') {
                if (data && data.pre) {
                    inPre++
                }
                if (
                    !inPre &&
                    !vnode.ns &&
                    !(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].ignoredElements.length && __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].ignoredElements.indexOf(tag) > -1) &&
                    __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].isUnknownElement(tag)
                ) {
                    warn(
                        'Unknown custom element: <' + tag + '> - did you ' +
                        'register the component correctly? For recursive components, ' +
                        'make sure to provide the "name" option.',
                        vnode.context
                    )
                }
            }
            vnode.elm = vnode.ns
                ? nodeOps.createElementNS(vnode.ns, tag)
                : nodeOps.createElement(tag, vnode)
            setScope(vnode)

            /* istanbul ignore if */
            let __WEEX__ = false;
            if (__WEEX__) {
                // in Weex, the default insertion order is parent-first.
                // List items can be optimized to use children-first insertion
                // with append="tree".
                const appendAsTree = Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(data) && Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["e" /* isTrue */])(data.appendAsTree)
                if (!appendAsTree) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue)
                    }
                    insert(parentElm, vnode.elm, refElm)
                }
                createChildren(vnode, children, insertedVnodeQueue)
                if (appendAsTree) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue)
                    }
                    insert(parentElm, vnode.elm, refElm)
                }
            } else {
                createChildren(vnode, children, insertedVnodeQueue)
                if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(data)) {
                    //invokeCreateHooks(vnode, insertedVnodeQueue)
                }
                insert(parentElm, vnode.elm, refElm)
            }

            if (process.env.NODE_ENV !== 'production' && data && data.pre) {
                inPre--
            }
        } else if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["e" /* isTrue */])(vnode.isComment)) {
            vnode.elm = nodeOps.createComment(vnode.text)
            insert(parentElm, vnode.elm, refElm)
        } else {
            vnode.elm = nodeOps.createTextNode(vnode.text)
            insert(parentElm, vnode.elm, refElm)
        }
    }
    /*创建一个组件*/
    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
        let i = vnode.data
        if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i)) {
            const isReactivated = Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(vnode.componentInstance) && i.keepAlive
            if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i = i.hook) && Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i = i.init)) {
                i(vnode, false /* hydrating */, parentElm, refElm)
            }
            // after calling the init hook, if the vnode is a child component
            // it should've created a child instance and mounted it. the child
            // component also has set the placeholder vnode's elm.
            // in that case we can just return the element and be done.
            /*
             在调用了init钩子以后，如果VNode是一个子组件，它应该已经创建了一个子组件实例并挂载它。
             子组件也应该设置了一个VNode占位符，我们直接返回组件实例即可。
             意思就是如果已经存在组件实例，则不需要重新创建一个新的，我们要做的就是初始化组件以及激活组件即可，还是用原来的组件实例。
             */
            if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(vnode.componentInstance)) {
                /*初始化组件*/
                initComponent(vnode, insertedVnodeQueue)
                if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["e" /* isTrue */])(isReactivated)) {
                    reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
                }
                return true
            }
        }
    }
    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    /*为scoped CSS 设置scoped id*/
    function setScope (vnode) {
        let i
        let ancestor = vnode
        while (ancestor) {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i = ancestor.context) && Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i = i.$options._scopeId)) {
                nodeOps.setAttribute(vnode.elm, i, '')
            }
            ancestor = ancestor.parent
        }
        // for slot content they should also get the scopeId from the host instance.
        if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i = __WEBPACK_IMPORTED_MODULE_4__core_instance_lifecycle__["a" /* activeInstance */]) &&
            i !== vnode.context &&
            Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i = i.$options._scopeId)) {
            nodeOps.setAttribute(vnode.elm, i, '')
        }
    }
    function createChildren (vnode, children, insertedVnodeQueue) {
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; ++i) {
                createElm(children[i], insertedVnodeQueue, vnode.elm, null, true)
            }
        } else if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["d" /* isPrimitive */])(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
        }
    }
    /*调用创建的钩子函数*/
    function invokeCreateHooks (vnode, insertedVnodeQueue) {
        /*循环调用modules中的create钩子*/
        for (let i = 0; i < cbs.create.length; ++i) {
            cbs.create[i](emptyNode, vnode)
        }
        i = vnode.data.hook // Reuse variable
        if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i)) {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i.create)) i.create(emptyNode, vnode)
            if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(i.insert)) insertedVnodeQueue.push(vnode)
        }
    }
    function insert (parent, elm, ref) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(parent)) {
            if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(ref)) {
                if (ref.parentNode === parent) {
                    nodeOps.insertBefore(parent, elm, ref)
                }
            } else {
                nodeOps.appendChild(parent, elm)
            }
        }
    }
    return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["f" /* isUndef */])(vnode)) {
            return
        }
        const insertedVnodeQueue = []
        if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["f" /* isUndef */])(oldVnode)) {

        } else {
            const isRealElement = Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["c" /* isDef */])(oldVnode.nodeType);
            if (!isRealElement) {

            } else {
                if (isRealElement) {
                    if (oldVnode.nodeType == 1) {
                        oldVnode.removeAttribute(__WEBPACK_IMPORTED_MODULE_1__shared_constants__["c" /* SSR_ATTR */]);
                        hydrating = true
                    }
                    if (Object(__WEBPACK_IMPORTED_MODULE_0__core_util__["e" /* isTrue */])(hydrating)) {

                    }
                    oldVnode = emptyNodeAt(oldVnode)
                }
                const oldElm = oldVnode.elm
                const parentElm = nodeOps.parentNode(oldElm)
                console.log('parentElm',parentElm)
                createElm(
                    vnode,
                    insertedVnodeQueue,
                    // extremely rare edge case: do not insert if old element is in a
                    // leaving transition. Only happens when combining transition +
                    // keep-alive + HOCs. (#4590)
                    oldElm._leaveCb ? null : parentElm,
                    nodeOps.nextSibling(oldElm)
                )
            }
        }
    }
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = initRender;
/* harmony export (immutable) */ __webpack_exports__["b"] = renderMixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_index__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vdom_vnode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vdom_create_element__ = __webpack_require__(25);
/**
 * Created by zj on 2017/12/14.
 */



function initRender (vm) {
    vm._vnode = null // the root of the child tree
    vm._staticTrees = null // v-once cached trees
    const options = vm.$options
    const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
    const renderContext = parentVnode && parentVnode.context
    //vm.$createElement = function a(a,b){console.log('a',a);console.log('b',b);return 90}
    // vm.$slots = resolveSlots(options._renderChildren, renderContext)
    // vm.$scopedSlots = emptyObject
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
   // vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = (a, b, c, d) => Object(__WEBPACK_IMPORTED_MODULE_2__vdom_create_element__["a" /* createElement */])(vm, a, b, c, d, true)

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
   // const parentData = parentVnode && parentVnode.data

    /* istanbul ignore else */
    // if (process.env.NODE_ENV !== 'production') {
    //     defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
    //         !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    //     }, true)
    //     defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
    //         !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    //     }, true)
    // } else {
    //     defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    //     defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
    // }
}

function renderMixin (Vue) {
    // install runtime convenience helpers
    //installRenderHelpers(Vue.prototype)

    Vue.prototype.$nextTick = function (fn) {
        return nextTick(fn, this)
    }

    Vue.prototype._render = function (){
        const vm = this
        const { render, _parentVnode } = vm.$options

        if (vm._isMounted) {
            // if the parent didn't update, the slot nodes will be the ones from
            // last render. They need to be cloned to ensure "freshness" for this render.
            for (const key in vm.$slots) {
                const slot = vm.$slots[key]
                // _rendered is a flag added by renderSlot, but may not be present
                // if the slot is passed from manually written render functions
                if (slot._rendered || (slot[0] && slot[0].elm)) {
                    vm.$slots[key] = cloneVNodes(slot, true /* deep */)
                }
            }
        }

        vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || __WEBPACK_IMPORTED_MODULE_0__util_index__["a" /* emptyObject */]

        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode
        // render self
        let vnode
        try {
            console.log('vm._renderProxy',vm._renderProxy)
            console.log('vm.$createElement',vm.$createElement)
            //vnode = render.call(vm._renderProxy)
            vnode = render.call(vm._renderProxy, vm.$createElement)
            console.log('vnode',vnode)
        } catch (e) {
            console.log('e',e)
            handleError(e, vm, `render`)
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            if (process.env.NODE_ENV !== 'production') {
                if (vm.$options.renderError) {
                    try {
                        vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
                    } catch (e) {
                        handleError(e, vm, `renderError`)
                        vnode = vm._vnode
                    }
                } else {
                    vnode = vm._vnode
                }
            } else {
                vnode = vm._vnode
            }
        }
        // return empty vnode in case the render function errored out
        if (!(vnode instanceof __WEBPACK_IMPORTED_MODULE_1__vdom_vnode__["b" /* default */])) {
            if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
                warn(
                    'Multiple root nodes returned from render function. Render function ' +
                    'should return a single root node.',
                    vm
                )
            }
            vnode = Object(__WEBPACK_IMPORTED_MODULE_1__vdom_vnode__["a" /* createEmptyVNode */])()
        }
        // set parent
        vnode.parent = _parentVnode
        return vnode
    }
}

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by zj on 2017/12/14.
 */
class VNode {
    // tag: string | void;
    // data: VNodeData | void;
    // children: ?Array<VNode>;
    // text: string | void;
    // elm: Node | void;
    // ns: string | void;
    // context: Component | void; // rendered in this component's scope
    // key: string | number | void;
    // componentOptions: VNodeComponentOptions | void;
    // componentInstance: Component | void; // component instance
    // parent: VNode | void; // component placeholder node
    //
    // // strictly internal
    // raw: boolean; // contains raw HTML? (server only)
    // isStatic: boolean; // hoisted static node
    // isRootInsert: boolean; // necessary for enter transition check
    // isComment: boolean; // empty comment placeholder?
    // isCloned: boolean; // is a cloned node?
    // isOnce: boolean; // is a v-once node?
    // asyncFactory: Function | void; // async component factory function
    // asyncMeta: Object | void;
    // isAsyncPlaceholder: boolean;
    // ssrContext: Object | void;
    // fnContext: Component | void; // real context vm for functional nodes
    // fnOptions: ?ComponentOptions; // for SSR caching
    // fnScopeId: ?string; // functioanl scope id support

    constructor(tag,
                data,
                children,
                text,
                elm,
                context,
                componentOptions,
                asyncFactory) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.fnContext = undefined
        this.fnOptions = undefined
        this.fnScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }

// DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    get child() {
        return this.componentInstance
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = VNode;


const createEmptyVNode = (text) => {
    const node = new VNode()
    node.text = text
    node.isComment = true
    return node
}
/* harmony export (immutable) */ __webpack_exports__["a"] = createEmptyVNode;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = query;
/**
 * Created by zj on 2017/12/13.
 */
/**
 * Query an element selector if it's not an element already.
 */
function query (el){
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            process.env.NODE_ENV !== 'production' && warn(
                'Cannot find element: ' + el
            )
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__web_runtime_index__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__web_util_index__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_util_perf__ = __webpack_require__(11);
/**
 * Created by zj on 2017/12/13.
 */




const mount = __WEBPACK_IMPORTED_MODULE_0__web_runtime_index__["a" /* default */].prototype.$mount
__WEBPACK_IMPORTED_MODULE_0__web_runtime_index__["a" /* default */].prototype.$mount = function (
    el,
    hydrating
){
    el = el && Object(__WEBPACK_IMPORTED_MODULE_1__web_util_index__["a" /* query */])(el)

    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
        process.env.NODE_ENV !== 'production' && warn(
            `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
    }

    const options = this.$options
    // resolve template/el and convert to render function
    if (!options.render) {
        let template = options.template
        if (template) {
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template)
                    /* istanbul ignore if */
                    if (process.env.NODE_ENV !== 'production' && !template) {
                        warn(
                            `Template element not found or is empty: ${options.template}`,
                            this
                        )
                    }
                }
            } else if (template.nodeType) {
                template = template.innerHTML
            } else {
                if (process.env.NODE_ENV !== 'production') {
                    warn('invalid template option:' + template, this)
                }
                return this
            }
        } else if (el) {
            template = getOuterHTML(el)
        }
        if (template) {
            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && __WEBPACK_IMPORTED_MODULE_2__core_config__["a" /* default */].performance && __WEBPACK_IMPORTED_MODULE_3__core_util_perf__["a" /* mark */]) {
                Object(__WEBPACK_IMPORTED_MODULE_3__core_util_perf__["a" /* mark */])('compile')
            }

            const { render, staticRenderFns } = compileToFunctions(template, {
                shouldDecodeNewlines,
                shouldDecodeNewlinesForHref,
                delimiters: options.delimiters,
                comments: options.comments
            }, this)
            options.render = render
            options.staticRenderFns = staticRenderFns

            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && __WEBPACK_IMPORTED_MODULE_2__core_config__["a" /* default */].performance && __WEBPACK_IMPORTED_MODULE_3__core_util_perf__["a" /* mark */]) {
                Object(__WEBPACK_IMPORTED_MODULE_3__core_util_perf__["a" /* mark */])('compile end')
                measure(`vue ${this._name} compile`, 'compile', 'compile end')
            }
        }
    }
    return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el){
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}
window.Vue = __WEBPACK_IMPORTED_MODULE_0__web_runtime_index__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__web_runtime_index__["a" /* default */]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_index__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_util_index__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_instance_lifecycle__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_index__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__patch__ = __webpack_require__(26);
/**
 * Created by zj on 2017/12/13.
 */
// public mount method





// install platform patch function
__WEBPACK_IMPORTED_MODULE_0__core_index__["a" /* default */].prototype.__patch__ = __WEBPACK_IMPORTED_MODULE_1__core_util_index__["b" /* inBrowser */] ? __WEBPACK_IMPORTED_MODULE_4__patch__["a" /* patch */] : function(){}
__WEBPACK_IMPORTED_MODULE_0__core_index__["a" /* default */].prototype.$mount = function (el,
                                 hydrating) {
    el = el && __WEBPACK_IMPORTED_MODULE_1__core_util_index__["b" /* inBrowser */] ? Object(__WEBPACK_IMPORTED_MODULE_3__util_index__["a" /* query */])(el) : undefined
    return Object(__WEBPACK_IMPORTED_MODULE_2__core_instance_lifecycle__["e" /* mountComponent */])(this, el, hydrating)
}
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__core_index__["a" /* default */]);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_api_index__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__instance_index_js__ = __webpack_require__(20);
/**
 * Created by zj on 2017/12/6.
 */


Object(__WEBPACK_IMPORTED_MODULE_0__global_api_index__["a" /* initGlobalAPI */])(__WEBPACK_IMPORTED_MODULE_1__instance_index_js__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__instance_index_js__["a" /* default */]);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initGlobalAPI;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_constants__ = __webpack_require__(4);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__init__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lifecycle__ = __webpack_require__(7);
/**
 * Created by zj on 2017/12/6.
 */




function  Vue(options) {
    this._init(options);
}
Object(__WEBPACK_IMPORTED_MODULE_1__init__["a" /* initMixin */])(Vue);
Object(__WEBPACK_IMPORTED_MODULE_0__state__["b" /* stateMixin */])(Vue);
Object(__WEBPACK_IMPORTED_MODULE_3__lifecycle__["d" /* lifecycleMixin */])(Vue);
Object(__WEBPACK_IMPORTED_MODULE_2__render__["b" /* renderMixin */])(Vue);
/* harmony default export */ __webpack_exports__["a"] = (Vue);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export defineReactive */
/* harmony export (immutable) */ __webpack_exports__["b"] = observe;
/* harmony export (immutable) */ __webpack_exports__["c"] = set;
/* harmony export (immutable) */ __webpack_exports__["a"] = del;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dep__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_lang__ = __webpack_require__(5);
/**
 * Created by zj on 2017/12/8.
 */





class Observer {
    constructor(value) {
        this.vmCount = 0;
        this.dep = new __WEBPACK_IMPORTED_MODULE_2__dep__["a" /* default */]();
        Object(__WEBPACK_IMPORTED_MODULE_3__util_lang__["a" /* def */])(value, '__ob__', this)
        //我们平常都是一样写的对象，这里数组暂时先不考虑
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
    const dep = new __WEBPACK_IMPORTED_MODULE_2__dep__["a" /* default */]()
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }

    // cater for pre-defined getter/setters
    const getter = property && property.get
    const setter = property && property.set
    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            if (__WEBPACK_IMPORTED_MODULE_2__dep__["a" /* default */].target) {
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
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__shared_util__["e" /* isObject */])(value)) {
        return
    }
    let ob;
    ob = new Observer(value);
    ob.vmCount++;
    return ob;
}

function set(target, key, val) {
    //判断是不是纯数组
    if (Array.isArray(target) && Object(__WEBPACK_IMPORTED_MODULE_1__shared_util__["i" /* isValidArrayIndex */])(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    //如果不是纯属组就走这步（判断key是否在target对象上），类数组状态。判断key不能是原型属性
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    //后面这些目前没清楚是做撒子的，在前面两种都不满足的情况下应该不常见
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

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
    if (Array.isArray(target) && Object(__WEBPACK_IMPORTED_MODULE_1__shared_util__["i" /* isValidArrayIndex */])(key)) {
        target.splice(key, 1)
        return
    }
    const ob = (target).__ob__
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid deleting properties on a Vue instance or its root $data ' +
            '- just set it to null.'
        )
        return
    }
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__shared_util__["c" /* hasOwn */])(target, key)) {
        return
    }
    delete target[key]
    if (!ob) {
        return
    }
    ob.dep.notify()
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = initMixin;
/* unused harmony export resolveConstructorOptions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_index__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_options__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__proxy__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lifecycle__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__render__ = __webpack_require__(13);
/**
 * Created by zj on 2017/12/8.
 */







let uid = 0;
function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this;
        vm._uid = uid++;
        let startTag, endTag
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].performance && __WEBPACK_IMPORTED_MODULE_1__util_index__["h" /* mark */]) {
            startTag = `vue-perf-start:${vm._uid}`
            endTag = `vue-perf-end:${vm._uid}`
            Object(__WEBPACK_IMPORTED_MODULE_1__util_index__["h" /* mark */])(startTag)
        }

        // a flag to avoid this being observed
        vm._isVue = true
        // merge options
        if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options)
        } else {
            vm.$options = Object(__WEBPACK_IMPORTED_MODULE_2__util_options__["a" /* mergeOptions */])(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            )
        }
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
            Object(__WEBPACK_IMPORTED_MODULE_4__proxy__["a" /* initProxy */])(vm)
        } else {
            vm._renderProxy = vm
        }
        Object(__WEBPACK_IMPORTED_MODULE_5__lifecycle__["c" /* initLifecycle */])(vm);
        Object(__WEBPACK_IMPORTED_MODULE_6__render__["a" /* initRender */])(vm);
        Object(__WEBPACK_IMPORTED_MODULE_5__lifecycle__["b" /* callHook */])(vm, 'beforeCreate');
        Object(__WEBPACK_IMPORTED_MODULE_3__state__["a" /* initState */])(vm);
        Object(__WEBPACK_IMPORTED_MODULE_5__lifecycle__["b" /* callHook */])(vm, 'created');
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}
function resolveConstructorOptions (Ctor) {
    let options = Ctor.options;
    return options;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mergeDataOrFn */
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeOptions;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_util__ = __webpack_require__(3);
/**
 * Created by zj on 2017/12/8.
 */



const strats = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].optionMergeStrategies;
const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
        ? parentVal
        : childVal
}
function mergeHook (
    parentVal,
    childVal
){
    return childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal
}
__WEBPACK_IMPORTED_MODULE_0__shared_constants__["a" /* ASSET_TYPES */].forEach(function(type) {
    strats[type+'s'] = mergeAssets;
})
__WEBPACK_IMPORTED_MODULE_0__shared_constants__["b" /* LIFECYCLE_HOOKS */].forEach(hook => {
    strats[hook] = mergeHook
})
strats.data = function(parentVal, childVal, vm) {
    if(!vm) {

    }
    return mergeDataOrFn(parentVal, childVal, vm)
}
function mergeAssets(parentVal, childVal, vm, key) {
    const res = Object.create(parentVal || null);
    if(childVal) {
        return Object(__WEBPACK_IMPORTED_MODULE_2__shared_util__["b" /* extend */])(res, childVal)
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
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__shared_util__["c" /* hasOwn */])(to, key)) {
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
            if (instanceData) {
                return mergeData(instanceData, defaultData)
            } else {
                return defaultData
            }
        }
    }
}
function mergeOptions(parent, child, vm) {
    let key;
    const options = {};
    for(key in parent) {
        mergeFiled(key)
    }
    for (key in child) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_2__shared_util__["c" /* hasOwn */])(parent,key)) {
            mergeFiled(key)
        }
    }
    function mergeFiled(key) {
        const strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key)
    }
    return options;
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initProxy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_index__ = __webpack_require__(2);
/**
 * Created by zj on 2017/12/14.
 */


let initProxy

if (process.env.NODE_ENV !== 'production') {
    const allowedGlobals = Object(__WEBPACK_IMPORTED_MODULE_1__util_index__["g" /* makeMap */])(
        'Infinity,undefined,NaN,isFinite,isNaN,' +
        'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
        'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
        'require' // for Webpack/Browserify
    )

    const warnNonPresent = (target, key) => {
        warn(
            `Property or method "${key}" is not defined on the instance but ` +
            'referenced during render. Make sure that this property is reactive, ' +
            'either in the data option, or for class-based components, by ' +
            'initializing the property. ' +
            'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
            target
        )
    }

    const hasProxy =
        typeof Proxy !== 'undefined' &&
        Proxy.toString().match(/native code/)

    if (hasProxy) {
        const isBuiltInModifier = Object(__WEBPACK_IMPORTED_MODULE_1__util_index__["g" /* makeMap */])('stop,prevent,self,ctrl,shift,alt,meta,exact')
        __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].keyCodes = new Proxy(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].keyCodes, {
            set (target, key, value) {
                if (isBuiltInModifier(key)) {
                    warn(`Avoid overwriting built-in modifier in config.keyCodes: .${key}`)
                    return false
                } else {
                    target[key] = value
                    return true
                }
            }
        })
    }

    const hasHandler = {
        has (target, key) {
            const has = key in target
            const isAllowed = allowedGlobals(key) || key.charAt(0) === '_'
            if (!has && !isAllowed) {
                warnNonPresent(target, key)
            }
            return has || !isAllowed
        }
    }

    const getHandler = {
        get (target, key) {
            if (typeof key === 'string' && !(key in target)) {
                warnNonPresent(target, key)
            }
            return target[key]
        }
    }

    initProxy = function initProxy (vm) {
        if (hasProxy) {
            // determine which proxy handler to use
            const options = vm.$options
            const handlers = options.render && options.render._withStripped
                ? getHandler
                : hasHandler
            vm._renderProxy = new Proxy(vm, handlers)
        } else {
            vm._renderProxy = vm
        }
    }
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createElement;
/* unused harmony export _createElement */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vnode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_util__ = __webpack_require__(2);
/**
 * Created by zj on 2017/12/15.
 */


const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2
function createElement(context,
                              tag,
                              data,
                              children,
                              normalizationType,
                              alwaysNormalize) {
    // if (Array.isArray(data) || isPrimitive(data)) {
    //     normalizationType = children
    //     children = data
    //     data = undefined
    // }
    // if (isTrue(alwaysNormalize)) {
    //     normalizationType = ALWAYS_NORMALIZE
    // }
    return _createElement(context, tag, data, children, normalizationType)
}

function _createElement(context,
                               tag,
                               data,
                               children,
                               normalizationType) {
    // if (isDef(data) && isDef((data).__ob__))
    // {
    //     process.env.NODE_ENV !== 'production' && warn(
    //         `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
    //         'Always create fresh vnode data objects in each render!',
    //         context
    //     )
    //     return createEmptyVNode()
    // }
    // // object syntax in v-bind
    // if (isDef(data) && isDef(data.is)) {
    //     tag = data.is
    // }
    if (!tag) {
        // in case of component :is set to falsy value
        return Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["a" /* createEmptyVNode */])()
    }
    // warn against non-primitive key
    // if (process.env.NODE_ENV !== 'production' &&
    //     isDef(data) && isDef(data.key) && !isPrimitive(data.key)
    // ) {
    //     warn(
    //         'Avoid using non-primitive value as key, ' +
    //         'use string/number value instead.',
    //         context
    //     )
    // }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
        typeof children[0] === 'function'
    ) {
        data = data || {}
        data.scopedSlots = {default: children[0]}
        children.length = 0
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children)
    } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children)
    }
    let vnode, ns
    if (typeof tag === 'string') {
        // let Ctor
        // ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
        // if (config.isReservedTag(tag)) {
        //     // platform built-in elements
        //     vnode = new VNode(
        //         config.parsePlatformTagName(tag), data, children,
        //         undefined, undefined, context
        //     )
        // } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        //     // component
        //     vnode = createComponent(Ctor, data, context, children, tag)
        // } else {
        //     // unknown or unlisted namespaced elements
        //     // check at runtime because it may get assigned a namespace when its
        //     // parent normalizes children
        //     vnode = new VNode(
        //         tag, data, children,
        //         undefined, undefined, context
        //     )
        // }
        vnode = new __WEBPACK_IMPORTED_MODULE_0__vnode__["b" /* default */](
            tag, data, children,
            undefined, undefined, context
        )
    } else {
        // direct component options / constructor
        vnode = createComponent(tag, data, context, children)
    }
    if (Object(__WEBPACK_IMPORTED_MODULE_1__core_util__["c" /* isDef */])(vnode)) {
       // if (ns) applyNS(vnode, ns)
        return vnode
    } else {
        return Object(__WEBPACK_IMPORTED_MODULE_0__vnode__["a" /* createEmptyVNode */])()
    }
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_vdom_patch__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_ops__ = __webpack_require__(27);
/**
 * Created by zj on 2017/12/14.
 */


const patch = Object(__WEBPACK_IMPORTED_MODULE_0__core_vdom_patch__["a" /* createPatchFunction */])(__WEBPACK_IMPORTED_MODULE_1__node_ops__);
/* harmony export (immutable) */ __webpack_exports__["a"] = patch;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createElement"] = createElement;
/* harmony export (immutable) */ __webpack_exports__["tagName"] = tagName;
/* harmony export (immutable) */ __webpack_exports__["parentNode"] = parentNode;
/* harmony export (immutable) */ __webpack_exports__["nextSibling"] = nextSibling;
/* harmony export (immutable) */ __webpack_exports__["createTextNode"] = createTextNode;
/* harmony export (immutable) */ __webpack_exports__["insertBefore"] = insertBefore;
/**
 * Created by zj on 2017/12/15.
 */
function createElement (tagName, vnode){
    const elm = document.createElement(tagName)
    if (tagName !== 'select') {
        return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
        elm.setAttribute('multiple', 'multiple')
    }
    return elm
}
function tagName (node){
    return node.tagName
}
function parentNode (node){
    return node.parentNode
}
function nextSibling (node){
    return node.nextSibling
}
function createTextNode (text) {
    return document.createTextNode(text)
}
function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode)
}

/***/ })
/******/ ]);