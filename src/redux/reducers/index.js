import { combineReducers } from "redux";
import ReducerWeeklyList from './reducer/reducer-weeklyList';
import ReducerLayOut from './reducer/reducer-layOut';
import ReducerLogin from './reducer/reducer-login';
import ReducerEdit from './reducer/reducer-edit';
import ReducerInfo from './reducer/reducer-info';

const rootReducer = combineReducers({
    ReducerWeeklyList,
    ReducerLayOut,
    ReducerLogin,
    ReducerEdit,
    ReducerInfo
});

export default rootReducer;
