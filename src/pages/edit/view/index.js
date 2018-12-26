import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Row, Col, Form, Card, Select, List, Icon, Button, Input } from 'antd';
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';
import style from '../style/index.less';
import WriteView from '../../../components/weekly-write-view/index';
import * as editActions from '../../../redux/actions/action/action-edit';

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

class Edit extends React.Component {
    static propTypes = {
        dataProgress:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        dataPlan:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        dataProblem:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        okrs:PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }

    render() {
        const { dataProgress, dataPlan, dataProblem, okrs } = this.props;
        console.log('%cokrs: ', 'font-size:15px;background-color: rgb(135, 208, 104);', okrs);

        return (
            <Card>
                <Card className={style.cardBackground}>
                    <Row type="flex" justify="space-around">
                        <Col span={1}>
                            <Tag className={style.leftTag}>本周进展</Tag>
                        </Col>
                        <Col span={23}>
                            <Form>
                                <WriteView
                                    data={dataProgress}
                                    buttonName="添加进展"
                                    okrs = {okrs}
                                />
                            </Form>
                        </Col>
                    </Row>
                </Card>
                <Card className={style.cardBackground}>
                    <Row type="flex" justify="space-around">
                        <Col span={1}>
                            <Tag className={style.leftTagPlan}>下周计划</Tag>
                        </Col>
                        <Col span={23}>
                            <Form>
                                <WriteView
                                    data={dataPlan}
                                    buttonName="添加计划"
                                    okrs = {okrs}
                                />
                            </Form>
                        </Col>
                    </Row>
                </Card>
                <Card className={style.cardBackground}>
                    <Row type="flex" justify="space-around">
                        <Col span={1}>
                            <Tag className={style.leftTagProblem}>遗留问题</Tag>
                        </Col>
                        <Col span={23}>
                            <Form>
                                <WriteView
                                    data={dataProblem}
                                    buttonName="添加问题"
                                    okrs = {okrs}
                                />
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Card>
        );
    }
}


const mapStateToProps = state => ({
    dataProgress: state.ReducerEdit.dataProgress,
    dataPlan: state.ReducerEdit.dataPlan,
    dataProblem: state.ReducerEdit.dataProblem,
    okrs : state.ReducerEdit.okrs
});

const mapDispatchToProps = dispatch => ({
    editActions: bindActionCreators(editActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
