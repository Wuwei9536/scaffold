import actions from '../../actions/types/type-edit';

const editData = {
    dataProgress: [
        {
            "weeklyDetailId": 2,
            "summary": "本周干了。。。",
            "krId": 123456,
            "oDetail": "目标目标目标",
            "krDetail": "结果结果结果",
            "details": "1、实现了系统的基础设计   2、实现了...",
            "weeklyType": 1
        },
        {
            "weeklyDetailId": 2,
            "summary": "本周干了。。。",
            "krId": 123456,
            "oDetail": "目标目标目标",
            "krDetail": "结果结果结果",
            "details": "1、实现了系统的基础设计   2、实现了...",
            "weeklyType": 1
        }
    ],
    dataPlan: [
        {
            "weeklyDetailId": 2,
            "summary": "本周干了。。。",
            "krId": 123456,
            "oDetail": "目标目标目标",
            "krDetail": "结果结果结果",
            "details": "1、实现了系统的基础设计   2、实现了...",
            "weeklyType": 1
        },
        {
            "weeklyDetailId": 2,
            "summary": "本周干了。。。",
            "krId": 123456,
            "oDetail": "目标目标目标",
            "krDetail": "结果结果结果",
            "details": "1、实现了系统的基础设计   2、实现了...",
            "weeklyType": 1
        }
    ],
    dataProblem: [
        {
            "weeklyDetailId": 2,
            "summary": "本周干了。。。",
            "krId": 123456,
            "oDetail": "目标目标目标",
            "krDetail": "结果结果结果",
            "details": "1、实现了系统的基础设计   2、实现了...",
            "weeklyType": 1
        },
        {
            "weeklyDetailId": 2,
            "summary": "本周干了。。。",
            "krId": 123456,
            "oDetail": "目标目标目标",
            "krDetail": "结果结果结果",
            "details": "1、实现了系统的基础设计   2、实现了...",
            "weeklyType": 1
        }
    ],
    okrs: [{
        "oDetail": "目标1目标",
        "krs": [{
            "krId": 123456,
            "krDetail": "结果结果结果"
        },
        {
            "krId": 123456,
            "krDetail": "其他 默认添加"
        }]
    },
    {
        "oDetail": "目标1目标",
        "krs": [{
            "krId": 123456,
            "krDetail": "结果结果结果"
        },
        {
            "krId": 123456,
            "krDetail": "其他 默认添加"
        }]
    },
    {
        "oDetail": "其他 默认添加",
        "krs": [{
            "krId": 123456,
            "krDetail": "其他默认添加"
        }]
    }]
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
        default:
            return state;
    }
}
