/*
 * @Author: Tmac-1 
 * @Date: 2018-04-13 18:27:16 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-14 17:48:45
 */

 import React from 'react';
 import TouchableOpacity from '../TouchableOpacity/TouchableOpacity';
 import PropTypes from 'prop-types';
 import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
 import './alert.less';

 class Alert extends React.Component{

   static propTypes ={
       closeAlert:PropTypes.func.isRequired,
       alertTip:PropTypes.string.isRequired,
       alertStatus:PropTypes.bool.isRequired
   }

    //css动画组件设置目标组件
    FirstChild = props =>{
        const childrenArray = React.Children.toArray(props.children)
        return childrenArray[0] || null;
    }

    // 关闭弹窗
    confirm = ()=>{
        this.props.closeAlert();
    }

    render(){
        return(
            <ReactCSSTransitionGroup
               component={this.FirstChild}
               transitionName='alert'
               transitionEnterTimeout={300}
               transitionLeaveTimeout={300}
            >
               {
                   this.props.alertStatus && 
                   <div className='alert-con'>
                        <div className='alert-context'>
                                <div className='alert-content-detail'>{this.props.alertTip}</div>
                                <TouchableOpacity className='confirm-btn' clickCallBack={this.confirm}/>
                        </div>
                   </div>

               }        
            </ReactCSSTransitionGroup>
        )
    }

 }

 export default Alert;
 






