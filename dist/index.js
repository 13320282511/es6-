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
/**
 * Created by zj on 2017/12/6.
 */
class Vue {
    constructor(options) {
        this._data = options.data
        _proxy(this, options.render,this._data)
        // observer(this._data, options.render)
    }
}
function _proxy(object, cb,data) {
    const that = object;
    const obj = data;
    Object.keys(data).forEach((key) => {
        console.log('data',data);
        var val = that._data[key];
        console.log(val)
        console.log('obj',obj)
       Object.defineProperty(that._data, key, {
           enumberable: true,
           configurable: true,
            get: ()=>{
                return obj[key]
            },
            set:(val)=> {
                that._data[key] = val;
            }
        })
    })

}
// function observer(value, cb) {
//     Object.keys(value).forEach((key) => {defineReactive(value, key, value[key] , cb)})
// }
// function defineReactive(obj, key, val, cb) {
//     Object.defineProperty(obj, key, {
//         enumberable: true,
//         configurable: true,
//         get: () => {
//             return val
//         },
//         set: newVal =>{
//
//             cb()
//         }
//     })
// }
/* harmony default export */ __webpack_exports__["a"] = (Vue);

/***/ })
/******/ ]);