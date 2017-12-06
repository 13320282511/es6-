/**
 * Created by zj on 2017/12/6.
 */
import Vue from './main.js';

window.p = new Vue({
    el:'#app',
    data:{
        text:'text1',
        text2:'texttwo'
    },
    render() {
        console.log('yes')
    }
});