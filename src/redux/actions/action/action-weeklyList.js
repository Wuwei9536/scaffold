import actions from '../types/types-weeklyList';

export const setWeeklyListData = (data) => {
    return {
        type:actions.SET_WEEKLYLIST_DATA,
        data
    };
};

export const setRequestResult = (requestResult) => {
    return {
        type:actions.SET_REQUEST_RESULT,
        requestResult
    };
};
