import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { renderRoutes } from 'react-router-config';
import { Layout, Menu, Icon } from 'antd';
import * as LayOutActions from '../../../redux/actions/action/action-layOut';
import style from '../style/index.less';
import history from '../../../../utils/history';


const {
    Header, Content, Footer, Sider
} = Layout;

class LayoutView extends React.Component {
    static propTypes = {
        siderList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        route: PropTypes.shape({
            routes: PropTypes.arrayOf(PropTypes.shape({}))
        }).isRequired
    }

    componentDidMount() {
        this.loginIn("/api/support/week/login", { "ldapName": "wei.wu01", "password": "Ww5201314,,,,,," });
    }

    loginIn = (api, data) => {
        let opts = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(api, opts)
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
            })
            .catch((error) => {
                // eslint-disable-next-line
                console.log("login fail: ", error);
            });
    };


    dealRoute = (path) => {
        history.push(path);
    }


    render() {
        const { siderList, route } = this.props;
        return (
            <Layout>
                <Sider style={{
                    overflow: 'auto', height: '100vh', position: 'fixed', left: 0
                }}
                >
                    <div className="logo"><Icon type="calendar" /></div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
                        {siderList.map((item) => {
                            return (
                                <Menu.Item key={item.to} onClick={(e) => { this.dealRoute(e.key); }}>
                                    <Icon type={item.type} />
                                    <span className="nav-text">{item.name}</span>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '12px 12px 0', overflow: 'initial' }}>
                        {renderRoutes(route.routes)}
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>
                        <FooterToolbar extra="extra information">
                            <Button>Cancel</Button>
                            <Button type="primary">Submit</Button>
                        </FooterToolbar>
                    </Footer> */}
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    siderList: state.ReducerLayOut.siderList
});

const mapDispatchToProps = dispatch => ({
    LayOutActions: bindActionCreators(LayOutActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutView);
