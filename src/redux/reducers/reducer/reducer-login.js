import actions from '../../actions/types/type-Login';

const ladpinitial = {
    ladp:window.localStorage.getItem('account')
};

export default function Login(state = ladpinitial, action) {
    switch (action.type) {
        case actions.Add_LADP:
            return {
                ladp:action.ladp
            };
        default:
            return state;
    }
}
