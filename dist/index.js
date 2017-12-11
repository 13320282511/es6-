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
/* unused harmony export observe */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dep__ = __webpack_require__(4);
/**
 * Created by zj on 2017/12/8.
 */


class Observer {
    constructor(value) {
        new __WEBPACK_IMPORTED_MODULE_1__dep__["a" /* default */]()
    }
}
/* unused harmony export default */

function observe(value, asRootData) {
    let ob;
    ob =new Observer(value);
    return ob;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by zj on 2017/12/8.
 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(3);
/**
 * Created by zj on 2017/12/6.
 */

window.Vue = __WEBPACK_IMPORTED_MODULE_0__main_js__["a" /* default */];

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_observer_index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_instance_init__ = __webpack_require__(5);
/**
 * Created by zj on 2017/12/6.
 */



function  Vue(options) {
    this._init(options);
}
Object(__WEBPACK_IMPORTED_MODULE_1__core_instance_init__["a" /* initMixin */])(Vue);
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
/**
 * Created by zj on 2017/12/11.
 */
function extend(to, _from) {
    for(var key in _from) {
        to[key] = _from[key];
    }
    return to;
}

/***/ })
/******/ ]);