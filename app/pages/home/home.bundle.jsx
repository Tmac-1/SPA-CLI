/*
 * @Author: Tmac-1 
 * @Date: 2018-04-05 12:11:47 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-23 10:54:45
 */

 import React from 'react';
 import PubicHeader from '../../components/header/header';
 import {NavLink} from 'react-router-dom';
 import { connect } from 'react-redux';
 import { saveFormData , saveImg , clearData } from '../../store/home/action';
 import { is , fromJS} from 'immutable';
 import { clearSelected } from '../../store/production/action';
 import envconfig from '../../envconfig/envconfig';
 import API from '../../api/api';
 import PropTypes from 'prop-types';
 import TouchableOpacity from '../../components/TouchableOpacity/TouchableOpacity';
 import PublicAlert from '../../components/alert/alert';
 import Toast from '../../components/toast/toast';
 import './home.less';


 class Home extends React.Component{
   
    static propTypes = {
        formData:PropTypes.object.isRequired,
        saveFormData:PropTypes.func.isRequired,
        saveImg:PropTypes.func.isRequired,
        clearData:PropTypes.func.isRequired,
        clearSelected:PropTypes.func.isRequired
   };

   state = {
       alertStatus:false, //弹窗状态
       alertTip:'',  //弹窗提示文字
       toastStatus:false, // 提示层状态
       toastTip:'' // 提示层文字
   }

    /** 
    * 将表单数据保存zhiredux，保存状态
    * @param { string } type 数据 orderSum || name || phoneNo
    * @param { object } event 事件对象
    */ 
    handleInput = ( type,event ) =>{
        let value = event.target.value;
        switch( type ){
            case 'orderSum' :
               value = value.replace(/\D/g,'');
            break;
            case 'name' :
            break;
            case 'phoneNo':
            break;
            default:;
        }
        this.props.saveFormData(value,type)
    }

    /**
     * 上传图片，并将图片地址存到redux，保留状态
    */
    uploadImg =  async event =>{
          try{
         this.setState({
                  toastStatus:true,
                  toastTip:"上传中..."
              })
              console.log(this.state.toastTip)
              let formdata = new FormData();
              formdata.append('file',event.target.files[0]);
              let result = await API.uploadImg({data:formdata})
             await this.props.saveImg(envconfig.imgUrl + result.image_path);
     
          this.setState({
            toastTip:'上传成功'
                })
            
          setTimeout(()=>{
              this.setState({
                  toastStatus:false
              })
          },2000)      

              console.log(this.state.toastTip)

          }catch(err){
              console.error(err)
          }
    }


    // 提交表单
    submitForm = ()=>{
        const { orderSum , name , phoneNo } = this.props.formData
        let alertTip = '';
        if(!orderSum.toString().length){
            alertTip = '请填写金额';
        }else if (!name.toString().length){
            alertTip = '请填写姓名';
        }else if (!phoneNo.toString().length){
            alertTip = '请填写正确的手机号'
        }else{
            alertTip = '添加数据成功'
            this.props.clearData();
            this.props.clearSelected();
        }
        
        this.setState({
            alertStatus:true,
            alertTip:alertTip
        })  
        
    }

    // 关闭弹窗
    closeAlert = () =>{
        this.setState({
            alertStatus:false,
            alertTip:''
        })
    }

    // 初始化数据，获取已选择的商品
    initData = props =>{
        this.selectedProList = [];
        props.proData.dataList.forEach( item =>{
            if(item.selectStatus && item.selectNum){
                this.selectedProList.push(item)
            }
        })

    }

    // 更新选择商品的state
    componentWillReceiveProps(nextProps){
        if( !is( fromJS(this.props) , fromJS(nextProps) )){
            this.initData(nextProps)
        }
    }

    componentWillMount(){
        this.initData(this.props)
    }


    render(){
        return(
            <main className='home-container'>
                  <PubicHeader title='首页' record/>
                  <p className='common-title'>请录入您的信息</p>
                  <form className='home-form'>
                       <div className='home-form-item'>
                           <span>销售金额：</span>
                           <input type="text" placeholder='请输入订单金额' value={this.props.formData.orderSum} onChange={this.handleInput.bind(this,'orderSum')}/>
                       </div>
                       <div className='home-form-item'>
                            <span>客户姓名：</span>
                            <input type="text" placeholder='请输入客户姓名' value={this.props.formData.name} onChange={this.handleInput.bind(this,'name')}/>
                       </div>
                       <div className='home-form-item'>
                            <span>客户电话：</span>
                            <input type="text" placeholder='请输入客户' value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this,'phoneNo')}/>
                       </div>
                  </form>

                  <div>
                      <p className='common-title'>请选择销售的产品</p> 
                      <NavLink to='/production' className='common-select-btn'>
                      {
                          this.selectedProList.length ? 
                          <ul className='selected-pro-list'>
                              {
                                  this.selectedProList.map((item,index) =>{
                                      return <li key={index} className='selected-pro-item ellipsis'>{item.product_name}X{item.selectNum}</li>
                                  })
                              }
                          </ul> : "选择产品"    
                      }

                      </NavLink>
                        
                  </div>

                  <div className='upload-img-con'>
                      <p className='common-title'>请上传发票凭据</p>
                      <div className='file-lable'>
                          <span className='common-select-btn'>上传图片</span>
                          <input type="file" onChange={this.uploadImg}/>
                      </div>
                      <img src={this.props.formData.imgpath} className='select-img' alt=""/>
                  </div>

                  <TouchableOpacity className='submit-btn' clickCallBack={this.submitForm} text='提交'/>
                  <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus}/>
                  <Toast toastStatus={this.state.toastStatus}  text={this.state.toastTip}/>
            </main>
        )
    }

 }

 export default connect(
     state =>{
      return {
         formData:state.formData,
         proData:state.proData,
         }   
     },
     {
        saveFormData,
        saveImg,
        clearData,
        clearSelected
     }
 )(Home);