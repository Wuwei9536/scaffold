import actions from '../types/type-info';

export const setWeekResults = (weekResults) => {
    return {
        type:actions.SET_WEEK_RESULTS,
        weekResults
    };
};

export const setWeekPlan = (nextWeekPlans) => {
    return {
        type:actions.SET_WEEK_PLAN,
        nextWeekPlans
    };
};

export const setWeekQa = (weekQas) => {
    return {
        type:actions.SET_WEEK_QA,
        weekQas
    };
};

export const setInfoShow = (infoShow) => {
    return {
        type:actions.SET_INFO_SHOW,
        infoShow
    };
};

export const setInfoParam = (infoParam) => {
    return {
        type:actions.SET_INFO_PARAM,
        infoParam
    };
};

export const setComments = (comments) => {
    return {
        type:actions.SET_COMMENTS,
        comments
    };
};

export const setWeeklyVo = (weeklyVo) => {
    return {
        type:actions.SET_WEEKLYVO,
        weeklyVo
    };
};
