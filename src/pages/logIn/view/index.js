import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import style from '../style/index.less';
import * as LoginActions from '../../../redux/actions/action/action.Login';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginDemo extends React.Component {
  state = {
    notice: '',
    type: 'tab2',
    autoLogin: true
  }

  static propTypes = {
    LoginActions: PropTypes.shape({}).isRequired
  }

  onSubmit = (err, values) => {
    let username = "";
    const { autoLogin, type } = this.state;
    const { LoginActions } = this.props;
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
    if (values.username) {
      username = values.username;
    }
    LoginActions.AddLadp(username);
    // eslint-disable-next-line
    // this.props.history.go(-1);
  }

  onTabChange = (key) => {
    this.setState({
      type: key
    });
    /* eslint-disable */
    console.log(this.props.authority)
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
        <Link to="/">/</Link>
      </Login>
    );
  }
}

const mapStateToProps = state => ({
  authority: state.ReducerLogin.ladp
});


const mapDispatchToProps = dispatch => ({
  LoginActions: bindActionCreators(LoginActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginDemo);
