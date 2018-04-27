/*
 * @Author: Tmac-1 
 * @Date: 2018-04-27 11:37:36 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-27 11:51:36
 */

import React from 'react';

export default class Bundle extends React.Component {
   state = {
      mod: null
   }
   componentWillMount() {
      this.load(this.props);
   }
   componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
         this.load(nextProps);
      }
   }
   // load 方法，用于更新 mod 状态
   load(props) {
      // 初始化
      this.setState({
         mod: null
      });
      /*
         调用传入的 load 方法，并传入一个回调函数
         这个回调函数接收 在 load 方法内部异步获取到的组件，并将其更新为 mod 
      */ 
      props.load(mod => {
         this.setState({
            mod: mod.default ? mod.default : mod
         });
      });
   }

   render() {
      /*
         将存在状态中的 mod 组件作为参数传递给当前包装组件的'子'
      */ 
      return this.state.mod ? this.props.children(this.state.mod) : null;
   }
}

const BundleFun = (Component,props) =>
        <Bundle load={Component}>
            {(Component)=><Component {...props}/>}
        </Bundle>

export  {
  Bundle , BundleFun 
}

