import actions from '../types/type-edit';


export const setDataProgress = (dataProgress) => {
    return {
        type:actions.SET_DATA_PROGRESS,
        dataProgress
    };
};

export const setDataPlan = (dataPlan) => {
    return {
        type:actions.SET_DATA_PLAN,
        dataPlan
    };
};

export const setDataProblem = (dataProblem) => {
    return {
        type:actions.SET_DATA_PROBLEM,
        dataProblem
    };
};
