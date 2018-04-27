/*
 * @Author: Tmac-1 
 * @Date: 2018-04-23 00:24:51 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-23 00:58:05
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import './toast.less';


 class Toast extends React.Component{

   static propTypes ={
       text:PropTypes.string.isRequired,
       toastStatus:PropTypes.bool.isRequired
   } 

   render(){
       return  (  
               this.props.toastStatus && 
                <div className='toast'>
                    { this.props.text || '加载中...'}
                 </div>     
       )
   }

 }

 export default Toast;