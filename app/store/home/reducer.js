/*
 * @Author: Tmac-1 
 * @Date: 2018-04-12 17:10:31 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-21 16:02:25
 */

 import * as home from './action-type';

 let defaultState = {
     orderSum:'', //金额
     name:'',     //姓名
     phoneNo:'' , //手机号
     imgpath:''   //图片地址
 }

 // 首页表单数据 
 export const formData = ( state = defaultState , action ) =>{
    //  console.log(action.type)
      switch(action.type){
         case home.SAVEFORMDATA:
         return { ...state,...{[action.datatype]:action.value}};
         case home.SAVEIMG:
         return { ...state,...{imgpath:action.path}}
         case home.CLEARDATA:
         return { ...state,...defaultState}
         default:
         return state;
     }
 }