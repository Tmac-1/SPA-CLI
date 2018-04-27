/*
 * @Author: Tmac-1 
 * @Date: 2018-04-22 22:45:28 
 * @Last Modified by:   Tmac-1 
 * @Last Modified time: 2018-04-22 22:45:28 
 */

import React from 'react';
import PublicHeader from '../../components/header/header';
import TouchableOpacity from '../../components/TouchableOpacity/TouchableOpacity'
import PublicAlert from '../../components/alert/alert';
import API from '../../api/api';
import './balance.less'

class Balance extends React.Component{

    state ={
        applyNum:'', //输入值
        alertStatus:false,  //弹窗状态
        alertTip:'',  // 弹窗提示文字
        balance:{    // 可提现金额
            balance:0
        }
    }

    //  初始化数据
    initData = async () =>{
        try{
            let result = await API.getBalance();
            this.setState({balance:result})
        }catch(err){
            console.error(err)
        }
    }

  /**
   * 格式化输入数据
   * 格式为微信红包格式：最大 200.00
   * @param  {object} event 事件对象
   */
   handleInput = event =>{
       let value = event.target.value;
    //    console.log(value)
        //匹配类似100.00
       if( (/^\d*?\.?\d{0,2}?$/gi).test(value)){
          // 01 ->1   
          if((/^0+[1-9]+/).test(value)){
              value = value.replace(/^0+/,'')
          }
          // 00.2 ->0.2
          if((/^0{2}\./).test(value)){
              value = value.replace(/^0+/,'0')
          }
          // .5 -> 0.5
          value = value.replace(/^\./gi,'0.')
          if(parseFloat(value) > 200){
              value = '200.00'
          }
          this.setState({applyNum:value})
       }
   }


    /**
     * 提交判断条件
    */
   submitForm =() =>{
       let alertTip;
       if(!this.state.applyNum){
           alertTip = '请输入提现金额';
       }else if( parseFloat(this.state.applyNum) > this.state.balance.balance){
           alertTip = '申请提现金额不能大于余额';
       }else{
           alertTip = '申请提现成功';
       }

       this.setState({
           alertStatus:true,
           alertTip
       })
   }

    /**
     * 关闭弹窗
    */
   closeAlert =()=>{
       this.setState({
           alertStatus:false,
           alertTip:'',
       })
   }

    componentWillMount(){
        this.initData()
    }

    render(){
        return(
            <main className='home-container'>
                <PublicHeader title='提现' record/>
                <section className='broke-main-content'>
                    <p className='broke-header'>您的可提现金额为：￥ {this.state.balance.balance}</p>
                    <form className="broke-form">
                        <p>  请输入提现金额 （元）</p>
                        <p>￥ <input type="text" value={this.state.applyNum} placeholder='0.00' maxLength='5' onInput={this.handleInput}/></p>
                    </form>
                </section>
                <TouchableOpacity className='submit-btn' clickCallBack={this.submitForm} text='申请提现'/>
                <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus}/>
            </main>
            
        )
    }
}

export default Balance;
