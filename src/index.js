/**
 * Created by zj on 2017/12/6.
 */
import {initGlobalAPI} from './core/global-api/index'
import Vue from './main.js';
initGlobalAPI(Vue);
window.Vue = Vue;