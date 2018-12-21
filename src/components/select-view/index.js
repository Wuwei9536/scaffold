import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag, Row, Col, Form, Card, Select, List, Avatar, Button } from 'antd';
import style from './select-view.less';

const FormItem = Form.Item;
const Option = Select.Option;
export default class SelectView extends React.Component {
    static defaultProps = {
        onChange: () => { },
        quarter: 0
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any).isRequired, // option数据
        onChange: PropTypes.func,
        defaultValue: PropTypes.string.isRequired,
        quarter: PropTypes.number
    }

    render() {
        const { data, onChange, defaultValue, quarter } = this.props;
        return (
            <FormItem>
                <Select defaultValue={defaultValue} style={{ width: 190 }} onChange={onChange}>
                    {data.map((item, index) => {
                        return (
                            <Option
                                value={item}
                                key = {index.toString()}
                                disabled={(index !== 0 && index >= quarter) && "true"}
                            >
                                {item}
                            </Option>
                        );
                    })}
                </Select>
            </FormItem>
        );
    }
}
