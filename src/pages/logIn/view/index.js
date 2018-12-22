import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
import style from '../style/index.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

export default class LoginDemo extends React.Component {
  state = {
    notice: '',
    type: 'tab2',
    autoLogin: true
  }

  onSubmit = (err, values) => {
    const { autoLogin, type } = this.state;
    console.log('value collected ->', { ...values, autoLogin: autoLogin });
    if (type === 'tab1') {
      this.setState({
        notice: ''
      }, () => {
        if (!err && (values.username !== 'admin' || values.password !== '888888')) {
          setTimeout(() => {
            this.setState({
              notice: 'The combination of username and password is incorrect!'
            });
          }, 500);
        }
      });
    }
  }

  onTabChange = (key) => {
    this.setState({
      type: key
    });
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked
    });
  }

  render() {
    const { type, notice, autoLogin } = this.state;
    return (
        <Login
        defaultActiveKey={type}
        onTabChange={this.onTabChange}
        onSubmit={this.onSubmit}
        >
            <Tab key="tab1" tab="Account">
                {
            notice
            && <Alert style={{ marginBottom: 24 }} message={notice} type="error" showIcon closable />
          }
                <UserName name="username" />
                <Password name="password" />
            </Tab>
            <Tab key="tab2" tab="Mobile">
                <Mobile name="mobile" />
                <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
            </Tab>
            <div>
                <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>Keep me logged in</Checkbox>
                <a style={{ float: 'right' }} href="##">Forgot password</a>
            </div>
            <Submit>Login</Submit>
            <div>
                <span>Other login methods</span>
                <span className="icon icon-alipay" />
                <span className="icon icon-taobao" />
                <span className="icon icon-weibo" />
                <a style={{ float: 'right' }} href="##">Register</a>
            </div>
        </Login>
    );
  }
}
