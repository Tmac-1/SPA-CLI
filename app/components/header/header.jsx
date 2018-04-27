/*
 * @Author: Tmac-1 
 * @Date: 2018-04-05 12:05:06 
 * @Last Modified by: Tmac-1
<<<<<<< HEAD
 * @Last Modified time: 2018-04-23 19:02:06
=======
 * @Last Modified time: 2018-04-23 23:55:32
>>>>>>> 40aa32cf2bc17b342f6ef902c62f75dc1b4a0d15
 */

 import React from 'react';
 import {NavLink} from 'react-router-dom';
 import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
 import PropTypes  from 'prop-types';
 import './header.less';

 class PublicHeader extends React.Component{
   constructor(props){
       super(props)
       this.state={
           navState:false
       }
       this.toggleNav = this.toggleNav.bind(this)
   }
   
   static propTypes ={
       record:PropTypes.any,
       confirm:PropTypes.any,
       title:PropTypes.string.isRequired
   }

   //切换左侧导航栏状态
   toggleNav(){
       this.setState({ navState:!this.state.navState })
   }
   FirstChild(props){
       const childrenArray = React.Children.toArray(props.children)
       return childrenArray[0] || null;
   }

    render(){
        return(
            <header className='header-container'>
                <span className='header-slide-icon iconfont icon-caidan2' onClick={this.toggleNav}></span>
                <span className='header-title'>{this.props.title}</span>
                {
                    this.props.record&& <NavLink to='/record' exact className='header-link iconfont icon-jilu' />
                }
                {
                    this.props.confirm && <NavLink to='/' exact className='header-link header-link-confirm'>确定</NavLink>
                }
    
                
              <ReactCSSTransitionGroup
                component={this.FirstChild}
                transitionName="nav"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                  {
                this.state.navState &&   <aside key='nav-slide' className='nav-slide-list' onClick={this.toggleNav}>
                          
                       <NavLink to='/' exact className='nav-link icon-jia'>首页</NavLink>
                       <NavLink to='/balance' className='nav-link icon-jia'>提现</NavLink>
                       <NavLink to='/helpcenter' className='nav-link icon-jia'>帮助中心</NavLink>
                       <NavLink to='/echart' className='nav-link icon-jia'>数据可视化</NavLink>

                                         </aside>    
                  }
              </ReactCSSTransitionGroup>
                

            </header>
        )
    }
 }

 export default PublicHeader;