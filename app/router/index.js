import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom';

import Home from '../pages/home/home.bundle';
import Record from '../pages/record/record.bundle';
import Helpcenter from '../pages/helpcenter/helpcenter.bundle';
import Production from '../pages/production/production.bundle';
import Balance from '../pages/balance/balance.bundle';
import Echart from '../pages/echart/echart.bundle';
import {BundleFun} from '../utils/bundle';

class RouterConfig extends React.Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path='/' exact component={()=>BundleFun(Home)}/>
                    <Route path='/record' component={(props)=>BundleFun(Record,props)}/>
                    <Route path='/helpcenter' component={()=>BundleFun(Helpcenter)}/>
                    <Route path='/production' component={()=>BundleFun(Production)}/>
                    <Route path='/balance' component={()=>BundleFun(Balance)}/>
                    <Route path='/echart' component={()=>BundleFun(Echart)}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default RouterConfig;