import { combineReducers } from "redux";
import ReducerWeeklyList from './reducer/reducer-weeklyList';
import ReducerLayOut from './reducer/reducer-layOut';


const rootReducer = combineReducers({
    ReducerWeeklyList,
    ReducerLayOut
});

export default rootReducer;
