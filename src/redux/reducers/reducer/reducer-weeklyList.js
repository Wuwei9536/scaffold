import actions from '../../actions/types/types-weeklyList';

const weeklyListInitialState = {
    data: {
        "weeklyInfo": {
            "qWeeks": []
        }
    },
    requestResult: false
};


export default function WeeklyList(state = weeklyListInitialState, action) {
    switch (action.type) {
        case actions.SET_WEEKLYLIST_DATA:
            return {
                ...state,
                data: action.data
            };
        case actions.SET_REQUEST_RESULT:
            return {
                ...state,
                requestResult:action.requestResult
            };
        default:
            return state;
    }
}
