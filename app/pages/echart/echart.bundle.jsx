/*
 * @Author: Tmac-1 
 * @Date: 2018-04-23 23:44:19 
 * @Last Modified by: Tmac-1
 * @Last Modified time: 2018-05-03 17:39:40
 */

import React from 'react';
import PublicHeader from '../../components/header/header';
import './echart.less'
 
//引入echart主模块
import echarts from '../../../node_modules/echarts/dist/echarts.common';
// 引入柱状图
import '../../../node_modules/echarts/lib/chart/bar';
// 引入提示框和标题组件
import '../../../node_modules/echarts/lib/component/tooltip';
import '../../../node_modules/echarts/lib/component/title';

class Echart extends React.Component{
   
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '商品销量'

                },
                tooltip: {},
                legend:{
                  right:'center',
                  bottom:0,
                  orient:'horizontal'     
                },
                xAxis: {
                    data: ['iPhone6', 'iPhone7', 'iPhone8', 'vivo', 'meat10', 'honor']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
    }

    render(){
        return (
            <main className='echart-container'>
                <PublicHeader title='数据可视化' record/>
                <div id='main' className='main' style={{ width:'100%', height: 500}}></div>
            </main>
          
        )

    }
}

export default Echart;
