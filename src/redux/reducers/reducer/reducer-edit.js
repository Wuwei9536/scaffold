import actions from '../../actions/types/type-edit';

const editData = {
    editShow: false,
    dataProgress: [{}],
    dataPlan: [{}],
    dataProblem: [{}],
    okrs: [{}],
    weekVoEdit: {}
};

export default function Edit(state = editData, action) {
    switch (action.type) {
        case actions.SET_DATA_PROGRESS:
            return {
                ...state,
                dataProgress: action.dataProgress
            };
        case actions.SET_DATA_PLAN:
            return {
                ...state,
                dataPlan: action.dataPlan
            };
        case actions.SET_DATA_PROBLEM:
            return {
                ...state,
                dataProblem: action.dataProblem
            };
        case actions.SET_OKR:
            return {
                ...state,
                okrs: action.okrs
            };
        case actions.SET_EDIT_SHOW:
            return {
                ...state,
                editShow: action.bool
            };
        case actions.SET_WEEKLYVO_EDIT:
            return {
                ...state,
                weeklyVoEdit: action.weeklyVoEdit
            };
        default:
            return state;
    }
}
