import React from 'react';
import PropTypes from 'prop-types';
import WriteItem from './weely-write-item/index';

export default class WriteView extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        buttonName: PropTypes.string.isRequired,
        okrs: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }

    render() {
        const { data, buttonName, okrs } = this.props;
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <WriteItem
                            key={index.toString()}
                            buttonName={buttonName}
                            title={item.summary}
                            okr={item.oDetail}
                            detail={item.details}
                            okrs={okrs}
                        />
                    );
                })}
            </>
        );
    }
}
