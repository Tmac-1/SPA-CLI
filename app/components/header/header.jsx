import React from 'react'
import {Layout, Icon,Dropdown } from 'antd'

const { Header } = Layout;


class KKHeader extends React.Component{
    render(){
        return(
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                />
                <div className="user-info">
                <img src="../../assets/img/keke-logo" alt=""/>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                        Hover me <Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
            </Header>
        )
    }
}

export default KKHeader;
