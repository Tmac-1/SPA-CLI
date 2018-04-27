/*
 * @Author: Tmac-1 
 * @Date: 2018-04-12 17:04:07 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-18 01:19:28
 */
 
 import { createStore , combineReducers ,applyMiddleware} from 'redux';
 import * as home from  './home/reducer';
 import * as production from './production/reducer';
 import thunk from 'redux-thunk';
 
 let store  =  createStore(
     combineReducers( {...home ,...production} ),
     applyMiddleware(thunk)
 )

 export default store;