import actions from '../../actions/types/type-info';

const infoInitial = {
    weekResults: [{}],
    nextWeekPlans: [{}],
    weekQas: [{}],
    infoShow: false,
    infoParam: null,
    comments: [{}],
    weeklyVo: {}
};

export default function Info(state = infoInitial, action) {
    switch (action.type) {
        case actions.SET_WEEK_RESULTS:
            return {
                ...state,
                weekResults: action.weekResults
            };
        case actions.SET_WEEK_PLAN:
            return {
                ...state,
                nextWeekPlans: action.nextWeekPlans
            };
        case actions.SET_WEEK_QA:
            return {
                ...state,
                weekQas: action.weekQas
            };
        case actions.SET_INFO_SHOW:
            return {
                ...state,
                infoShow: action.infoShow
            };
        case actions.SET_INFO_PARAM:
            return {
                ...state,
                infoParam: action.infoParam
            };
        case actions.SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        case actions.SET_WEEKLYVO:
            return {
                ...state,
                weeklyVo: action.weeklyVo
            };
        default:
            return state;
    }
}
