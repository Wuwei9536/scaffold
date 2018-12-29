import React from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { renderRoutes } from 'react-router-config';
import store from './redux/store';
import Routes from './router';
import Login from './pages/logIn/view';


class App extends React.Component {
    static propTypes = {
        history: PropTypes.shape({}).isRequired,
        authority: PropTypes.string.isRequired
    }

    render() {
        const { history, authority } = this.props;
        const Authorized = RenderAuthorized(authority);
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/user' exact component={Login} />
                    <Authorized authority={['wien']} noMatch={<Redirect to="/user" />}>
                        {renderRoutes(Routes)}
                    </Authorized>
                </Switch>
            </Router>
        );
    }
}
const mapStateToProps = state => ({
    authority: state.ReducerLogin.ladp
});


export default connect(mapStateToProps)(App);
