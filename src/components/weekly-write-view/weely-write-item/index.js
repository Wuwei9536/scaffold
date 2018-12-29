import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Row, Col, Form, Card, Select, List, Icon, Button, Input } from 'antd';
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';
import style from './weekly-write-item.less';

const { Option, OptGroup } = Select;
const FromItem = Form.Item;

Quill.register('modules/imageDrop', ImageDrop);
// const modules = {
//     toolbar: [
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//         ['link', 'image'],
//         ['clean']
//     ],
//     imageDrop: true
// };

// const formats = [
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
// ];


class WriteItem extends React.Component {
    static defaultProps = {
        title: null,
        okr: null,
        detail: null
    }

    static propTypes = {
        title: PropTypes.string,
        okr: PropTypes.number,
        detail: PropTypes.string,
        okrs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        index: PropTypes.number.isRequired,
        placeholderTitle: PropTypes.string.isRequired,
        holder: PropTypes.shape({}).isRequired
    }


    render() {
        // eslint-disable-next-line
        const { title, okr, detail, okrs, index, placeholderTitle, holder, form } = this.props;
        const { getFieldDecorator } = form;
        let indexDot = index + 1 + '.';
        let selectRules = {};
        if (okr) {
            selectRules = {
                rules: [{ required: true, message: 'Please select your okr!' }],
                initialValue: okr
            };
        } else {
            selectRules = {
                rules: [{ required: true, message: 'Please select your okr!' }]
            };
        }
        return (
            <>
                <FromItem className={style.marginBottom10}>
                    {
                        getFieldDecorator('summary', {
                            rules: [{ required: true, message: 'Please input  summary!' }],
                            initialValue: title
                        })(
                            <Input placeholder={placeholderTitle} suffix={<Icon type="close" />} prefix={<span>{indexDot}</span>} />
                        )
                    }
                </FromItem>
                <FromItem className={style.marginBottom10 + " " + style.marginLeft20}>
                    {
                        getFieldDecorator('krId', selectRules)(
                            <Select
                                placeholder={holder.okr}
                            >
                                {okrs.map((item, index) => {
                                    return (
                                        <OptGroup
                                            label={item.odetail}
                                            key={index.toString()}
                                        >
                                            {item.krs.map((kr) => {
                                                return (
                                                    <Option value={kr.krId} key={kr.krId}>{kr.krDetail}</Option>
                                                );
                                            })}
                                        </OptGroup>
                                    );
                                })}
                            </Select>
                        )
                    }
                </FromItem>
                <FromItem className={style.marginBottom10}>
                    {
                        getFieldDecorator('details', {
                            rules: [{ required: true, message: 'Please input  details!' }],
                            initialValue: detail
                        })(
                            <ReactQuill
                                theme="snow"
                                className={style.textarea}
                                modules={this.modules}
                                formats={this.formats}
                                onChange={this.onQuillChange}
                                placeholder={holder.content}
                            />
                        )
                    }
                </FromItem>
            </>
        );
    }
}

// const WriteItemForm = Form.create({})(WriteItem);
export default Form.create({
    onFieldsChange(props, changedFields, allValues) {
        const { weeklyType, index } = props;
        props.onChangeField(weeklyType, index, changedFields, allValues);
    }
})(WriteItem);
