/*
 * @Author: Tmac-1 
 * @Date: 2018-04-25 15:34:35 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-05-03 17:42:56
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './utils/setRem';
import './style/base.css';
import Route from './router/index';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';
import store from './store/store';

FastClick.attach(document.body);


        ReactDOM.render(
                <Provider store={store}>
                        <Route/>
                 </Provider>,       
                 document.getElementById('app')
        )       


