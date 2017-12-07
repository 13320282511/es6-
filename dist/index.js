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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(1);
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Watcher__ = __webpack_require__(3);
/**
 * Created by zj on 2017/12/6.
 */


class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data, options.render);
        let watcher = new __WEBPACK_IMPORTED_MODULE_1__Watcher__["a" /* default */](this);
    }
}
function _proxy(data,Vue) {
    const that = Vue;
    console.log('that',that)
    Object.keys(data).forEach((key) => {
        console.log('data',data)
       Object.defineProperty(data, key, {
           enumerable: true,
           configurable: true,
            get: ()=>{
                return that._data[key] || 88
            },
            set:(val)=> {
                that._data[key] = val;
            }
        })
    })

}
function observer(value, cb) {
    Object.keys(value).forEach((key) => {defineReactive(value, key, value[key] , cb)})
}
// function defineReactive(obj, key, val, cb) {
//     Object.defineProperty(obj, key, {
//         enumerable: true,
//         configurable: true,
//         get: () => {
//             console.log(1111)
//             //return obj[key]
//         },
//         set: newVal =>{
//
//             cb()
//         }
//     })
// }
function defineReactive (obj, key, val, cb) {
    const dep = new __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */]();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            if (__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target) {
                /*Watcher对象存在全局的Dep.target中*/
                dep.addSub(__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target);
            }
        },
        set:newVal=> {
            /*只有之前addSub中的函数才会触发*/
            dep.notify();
        }
    })
}

__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target = null;
/* harmony default export */ __webpack_exports__["a"] = (Vue);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (Dep);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(2);
/**
 * Created by zj on 2017/12/7.
 */

class Watcher {
    constructor (vm, expOrFn, cb, options) {
        this.cb = cb;
        this.vm = vm;

        /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
        __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target = this;
        /*Github:https://github.com/answershuto*/
        /*触发渲染操作进行依赖收集*/
        this.cb.call(this.vm);
    }

    update () {
        this.cb.call(this.vm);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Watcher);

/***/ })
/******/ ]);