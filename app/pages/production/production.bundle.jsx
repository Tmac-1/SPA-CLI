/*
 * @Author: Tmac-1 
 * @Date: 2018-04-14 23:37:14 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-04-23 19:03:43
 */
import React from 'react';
import PublicHeader from '../../components/header/header';
import { getProData, editPro ,togSelectPro } from '../../store/production/action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './production.less';



class Production extends React.Component{

    static propTypes ={
        proData:PropTypes.object.isRequired,
        getProData:PropTypes.func.isRequired,
        togSelectPro:PropTypes.func.isRequired,
        editPro:PropTypes.func.isRequired,
    }

    /** 
     * 添加或者删减商品，交由redux进行数据处理，作为全局变量
     * @param {int} index 编辑的商品索引
     * @param {int} num 添加||删减的商品数量
    */ 
    handeleEdit = (index,num) =>{
        // console.log(this.props.proData)
        let currentNum = this.props.proData.dataList[index].selectNum + num;
        if( currentNum < 0){
        return 
        }
        this.props.editPro(index,currentNum)
    }

    // 选择商品，交由redux进行数据处理，作为全局变量
    togSelect = index =>{
        this.props.togSelectPro(index)
    }

    componentDidMount(){
        // 初始的时候加载，有数据的时候不再加载，以保留操作数据的状态
        if(!this.props.proData.dataList.length){
            this.props.getProData()
        }
    }

    render(){
       return (
           <main className='common-con-top'>   
               <PublicHeader title='首页' confirm/>
               <section className='pro-list-con'>
                   <ul className='pro-list-ul'>
                   {
                        this.props.proData.dataList.map( (item,index) =>{
                            return  <li className='pro-item' key={index}>
                                        <div className='pro-item-select' onClick={this.togSelect.bind(this,index)}>
                                                <span className={`icon-dui pro-select-status ${item.selectStatus ? 'pro-selected' :''}` }></span>
                                                <span className='pro-name'>{item.product_name}</span>
                                        </div>
                                        <div className='pro-item-edit'>
                                                    <span className={`icon-53 ${item.selectNum > 0 ? 'edit-active' :''}`} onClick={this.handeleEdit.bind(this,index,-1)}></span>  
                                                    <span className='pro-num'>{item.selectNum}</span>  
                                                    <span className='icon-jia' onClick={this.handeleEdit.bind(this,index,1)}></span>  
                                        </div>
                                     </li>                
                        })
                   }
                      
                   </ul>
               </section>
           </main>
           
       )
    }
}

export default connect(
    state =>({
       proData:state.proData,
    }),{
        editPro,
        togSelectPro,
        getProData
    }
)(Production);
