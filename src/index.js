import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import WeekList from './pages/weeklyList/view';
import 'antd/dist/antd.less';


ReactDom.render(
    <Provider store={store}>
        <WeekList />
    </Provider>,
    document.getElementById('app')
);
