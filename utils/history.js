import { createBrowserHistory, createMemoryHistory } from 'history';

const createHistory = () => {
    if (window) {
        return createBrowserHistory();
    } else {
        return createMemoryHistory();
    }
};

export default createHistory();
