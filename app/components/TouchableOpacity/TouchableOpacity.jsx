/*
 * @Author: Tmac-1 
 * @Date: 2018-04-13 17:42:09 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-13 17:55:06
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 
/*
  * 点击状态组件
*/  
 class TouchableOpacity extends React.Component{

    static propTypes = {
      clickCallBack:PropTypes.func,
      text:PropTypes.string,
      className:PropTypes.string
    }
   
    handleTouchStart = ()=>{
        this.refs.btn.style.opacity = '0.3'
    } 

    handleTouchEnd = ()=>{
        this.refs.btn.style = '1'
        this.props.clickCallBack()
    }

    render(){
        return(
            <div className={`btn-con ${this.props.className}`} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}
                 ref='btn'
            >
                 {this.props.text || '确认'}
            </div>
        )
    }

 }
 
 export default TouchableOpacity;


