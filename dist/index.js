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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(2);
/**
 * Created by zj on 2017/12/6.
 */


window.p = new __WEBPACK_IMPORTED_MODULE_0__main_js__["a" /* default */]({
    el:'#app',
    data:{
        text:'text1',
        text2:'texttwo'
    },
    render() {
        console.log('yes')
    }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_observer_index__ = __webpack_require__(5);
/**
 * Created by zj on 2017/12/6.
 */


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

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export observe */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dep__ = __webpack_require__(7);
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dep;

Dep.target = null;

/***/ })
/******/ ]);