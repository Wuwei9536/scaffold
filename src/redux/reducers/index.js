import { combineReducers } from "redux";
import ReducerWeeklyList from './reducer/reducer-weeklyList';
import ReducerLayOut from './reducer/reducer-layOut';
import ReducerLogin from './reducer/reducer-login';
import ReducerEdit from './reducer/reducer-edit';

const rootReducer = combineReducers({
    ReducerWeeklyList,
    ReducerLayOut,
    ReducerLogin,
    ReducerEdit
});

export default rootReducer;
