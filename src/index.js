import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import history from '../utils/history';
import App from './App';
import store from './redux/store';
import WeekList from './pages/weeklyList/view';
import 'antd/dist/antd.less';
import 'ant-design-pro/dist/ant-design-pro.css';

history.listen((location, action) => {
    if (action === 'PUSH') {
        window.scroll(0, 0);
    }
});


ReactDom.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('app')
);
