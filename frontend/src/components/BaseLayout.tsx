import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import {Menu, Layout} from "antd";
import {UploadOutlined} from "@ant-design/icons";

const {Header, Content, Footer, Sider} = Layout;

export class BaseLayout extends Component {
    render() {
        return (
            <>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                    >

                        <Link to="/">
                            <div className="logo"/>
                        </Link>
                        <Menu
                            theme="dark"
                            mode="inline"
                            items={
                                [
                                    {
                                        key: '1',
                                        icon: React.createElement(UploadOutlined),
                                        label: <NavLink to="/getSecret">
                                            Get secret
                                        </NavLink>,
                                    },
                                    {
                                        key: '2',
                                        icon: React.createElement(UploadOutlined),
                                        label: <NavLink to="/create">
                                            Create secret
                                        </NavLink>,
                                    }
                                ]
                            }
                        />
                    </Sider>
                    <Layout>
                        <Header className="site-layout-sub-header-background" style={{padding: 0}}/>
                        <Content style={{margin: '24px 16px 0'}}>
                            <div className="site-layout-background" style={{padding: 24, height: "85vh"}}>
                                <main className='main'>{
                                    // @ts-ignore
                                    this.props.children
                                }</main>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </>
        );
    }
}