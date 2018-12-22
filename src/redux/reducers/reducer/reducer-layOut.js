import actions from '../../actions/types/type-layOut';

const layOutinitialState = {
    siderList: [
        { name: "我的周报", type: "book", to: "/" },
        { name: "我的OKR", type: "calendar", to: "/okr" },
        { name: "我的关注", type: "star", to: "/attention" },
        { name: "人员列表", type: "user", to: "/staff" }
    ]
};

export default function LayOut(state = layOutinitialState, action) {
    switch (action.type) {
        case actions.aaa:
            return {
                ...state
            };
            default:
            return state;
    }
}
