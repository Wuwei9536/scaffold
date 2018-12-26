import actions from '../types/type-Login';

export const AddLadp = (ladp) => {
    return {
        type: actions.Add_LADP,
        ladp
    };
};
