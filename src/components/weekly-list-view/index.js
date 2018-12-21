import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import ListItem from './weekly-list-item';


export default class ListView extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        store: PropTypes.shape({}).isRequired
    }

    render() {
        const { data, store } = this.props;
        const { qWeeks } = store;
        return (
            <>
                {data.map((item, index) => {
                    let bool = false;
                    let box = {};
                    for (let i in qWeeks) {
                        if (qWeeks[i].weeklyVo.month === item.month && qWeeks[i].weeklyVo.week === item.week) {
                            bool = true;
                            box = { details1: qWeeks[i].details1, details2: qWeeks[i].details2 };
                        }
                    }
                    return (
                        <ListItem
                            key={index.toString()}
                            data={item}
                            bool={bool}
                            box={box}
                            index={index}
                        />
                    );
                })}
            </>
        );
    }
}
