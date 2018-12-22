import React from 'react';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import store from './redux/store';
import Routes from './router';

const App = ({ history }) => (
    <Provider store={store}>
        <Router history={history}>
            {renderRoutes(Routes)}
        </Router>
    </Provider>
);

App.propTypes = {
    history: PropTypes.shape({}).isRequired
};

export default App;
