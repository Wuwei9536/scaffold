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
const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean']
    ],
    imageDrop: true
};

const formats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];


export default class WriteItem extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        okr: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
        buttonName: PropTypes.string.isRequired,
        okrs: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }

    render() {
        const { title, okr, detail, buttonName, okrs } = this.props;
        return (
            <>
                <FromItem className={style.marginBottom10}>
                    <Input placeholder={title} suffix={<Icon type="close" />} />
                </FromItem>
                <FromItem className={style.marginBottom10 + " " + style.marginLeft20}>

                    <Select
                        placeholder={okr}
                    >
                        {okrs.map((item, index) => {
                            return (
                                <OptGroup
                                    label={item.oDetail}
                                    key={index.toString()}
                                >
                                    {item.krs.map((kr) => {
                                        return (
                                            <Option value={kr.krDetail} key={index.toString()}>{kr.krDetail}</Option>
                                        );
                                    })}
                                </OptGroup>
                            );
                        })}
                        {/* <OptGroup label="Manager">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </OptGroup>
                        <OptGroup label="Engineer">
                            <Option value="Yiminghe">yiminghe</Option>
                        </OptGroup> */}
                    </Select>
                </FromItem>
                <ReactQuill
                    theme="snow"
                    className={style.textarea}
                    modules={this.modules}
                    formats={this.formats}
                    onChange={this.onQuillChange}
                    placeholder={detail}
                />
                <Button type="dashed" className={style.addButton}>{buttonName}</Button>
            </>
        );
    }
}
