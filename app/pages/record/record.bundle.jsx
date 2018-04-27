import React from 'react';
import PublicHeader from '../../components/header/header';
import { NavLink , Switch , Route ,Redirect} from 'react-router-dom';
import RecordList from './components/recordList';
import './record.less';
import API from '../../api/api';


class Record extends React.Component{

    state ={
        flagBarPos:'17%'
    }

    /**
     * 设置头部底部标签位置
     * @param {string} type 数据类型
     */
    setFlagBarPos = type => {
        let flagBarPos;
        switch( type ){
           case 'passed':
           flagBarPos='17%';
           break;
           case 'audited':
           flagBarPos ='50%';
           break;
           case 'failed' :
           flagBarPos = '83%';
           break;
           default:
           flagBarPos ='17%'
        }
        this.setState({flagBarPos})
    }

    componentWillReceiveProps(nextProps){
          // 属性变化时设置头部底部标签位置
        let currentType = this.props.location.pathname.split('/')[2]
        let type = nextProps.location.pathname.split('/')[2];
        if(currentType !== type){
            this.setFlagBarPos(type)
        }
    }
      
    testDevServer = async ()=>{
       let result =  await API.testDevServer({talent_searchKey:'',pageNum:1,OnePageNum:20})
       console.log(result)
    }

    render(){
        return(
            <main className='common-con-top'>
                <PublicHeader title='记录'/>
                  <section className="record-nav-con">
                         <nav className="record-nav">
                                <NavLink to={`${this.props.match.path}/passed`}  className="nav-link">已通过</NavLink>
                                <NavLink to={`${this.props.match.path}/audited`} className="nav-link">待审核</NavLink>
                                <NavLink to={`${this.props.match.path}/failed`}  className="nav-link">未通过</NavLink>
                                <i className="nav-flag-bar" style={{ left:this.state.flagBarPos}}></i>
                         </nav>
                  </section>
                  <Switch>
                      <Route path={`${this.props.match.path}/:type`} component={RecordList}/>
                      <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/passed`} exact />
                  </Switch>
                  
                  <button onClick={this.testDevServer} >测试转发</button>

            </main>
          
        )
    }

}

export default Record;