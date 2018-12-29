import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import moment from 'moment';
import { Tag, Row, Comment, Form, Card, Avatar, Tooltip, Spin, Button } from 'antd';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import style from '../style/index.less';
import InfoView from '../../../components/info-view';
import * as infoActions from '../../../redux/actions/action/action-info';
import history from '../../../../utils/history';
import WeeklyComments from '../../../components/comments/index';

Quill.register('modules/imageDrop', ImageDrop);

class Info extends React.Component {
    state = {
        infoShow: false
    }

    static propTypes = {
        weekResults: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        nextWeekPlans: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        weekQas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        infoActions: PropTypes.shape({}).isRequired,
        comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        weeklyVo: PropTypes.shape({}).isRequired
    }

    componentDidMount() {
        // eslint-disable-next-line
        const { state } = this.props.location
        if (state) {
            window.localStorage.setItem('infoParam', JSON.stringify(state));
        }
        this.infoParam = window.localStorage.getItem('infoParam');
        this.requestData('/api/support/week/getWeeklyDetail', this.infoParam, '/api/support/week/getComment');
    }

    requestData = (urlDetail, param, urlComment) => {
        const { infoActions } = this.props;
        let optsdetail = {
            method: 'post',
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(urlComment, optsdetail)
            .then((response) => {
                return response.json();
            }).then((res) => {
                infoActions.setComments(res.data.comments);
            }).catch((error) => {

            });


        fetch(urlDetail, optsdetail)
            .then((response) => {
                return response.json();
            }).then((res) => {
                infoActions.setWeeklyVo(res.data.weeklyDetailInfo.weeklyVo);
                infoActions.setWeekResults(res.data.weeklyDetailInfo.weekResults);
                infoActions.setWeekPlan(res.data.weeklyDetailInfo.nextWeekPlans);
                infoActions.setWeekQa(res.data.weeklyDetailInfo.weekQas);
                this.setState({ infoShow: true });
            }).catch((error) => {

            });
    }

    toEditor = () => {
        let path = {
            pathname: '/edit',
            state: JSON.parse(this.infoParam)
        };
        history.push(path);
    }

    commentPublish = () => {
        // eslint-disable-next-line
        const { getFieldValue } = this.props.form;
        const { infoActions } = this.props;
        let content = getFieldValue('content');
        let param = {
            content,
            weeklyId: JSON.parse(this.infoParam).weeklyId
        };
        let opts = {
            method: 'post',
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch('/api/support/week/addComment', opts)
            .then((response) => {
                return response.json();
            }).then((res) => {
                fetch('/api/support/week/getComment', opts)
                    .then((response) => {
                        return response.json();
                    }).then((res) => {
                        infoActions.setComments(res.data.comments);
                    }).catch((error) => {

                    });
            }).catch((error) => {
            });
    }

    backWeekly = () => {
        history.push('/');
    }


    render() {
        const { weekResults, nextWeekPlans, weekQas, comments, weeklyVo } = this.props;
        const { infoShow } = this.state;
        let noEditTime = new Date(weeklyVo.noEditTime).toLocaleString();
        // eslint-disable-next-line
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                {infoShow
                    ? <>
                        <div className={style.marginBottom100}>
                            <Card>
                                <span className={style.weekTime}>
                                    {"Week " + weeklyVo.month + "-" + weeklyVo.week}
                                </span>
                                <span>{weeklyVo.weekTime}</span>
                                <div>{"创建于 " + noEditTime}</div>
                                <Card className={style.cardBackground}>
                                    <Row type="flex" justify="space-around">
                                        <div>
                                            <Tag className={style.leftTag}>本周进展</Tag>
                                        </div>
                                        <div className={style.widthFlex}>
                                            <InfoView
                                                data={weekResults}
                                            />
                                        </div>
                                    </Row>
                                </Card>
                                <Card className={style.cardBackground}>
                                    <Row type="flex" justify="space-around">
                                        <div>
                                            <Tag className={style.leftTagPlan}>下周计划</Tag>
                                        </div>
                                        <div className={style.widthFlex}>
                                            <InfoView
                                                data={nextWeekPlans}
                                            />
                                        </div>
                                    </Row>
                                </Card>
                                <Card className={style.cardBackground}>
                                    <Row type="flex" justify="space-around">
                                        <div>
                                            <Tag className={style.leftTagProblem}>遗留问题</Tag>
                                        </div>
                                        <div className={style.widthFlex}>
                                            <InfoView
                                                data={weekQas}
                                            />
                                        </div>
                                    </Row>
                                </Card>
                                <div className={style.comment}>
                                    {
                                        getFieldDecorator('content', {
                                            rules: [{ required: true, message: 'Please select your country!' }]
                                        })(
                                            <ReactQuill
                                                theme="snow"
                                                className={style.commentText}
                                            />
                                        )
                                    }
                                </div>
                                <div className={style.commentCommit}>
                                    <Button type="primary" onClick={this.commentPublish}>发表评论</Button>
                                </div>
                                <div className={style.commentResult}>
                                    <Card>
                                        <WeeklyComments
                                            data={comments}
                                            onChangeComment={this.onChangeComment}
                                        />
                                    </Card>
                                </div>
                            </Card>
                        </div>
                        <FooterToolbar>
                            <Button type="primary" onClick={this.backWeekly}>返回我的周报</Button>
                            <Button onClick={this.toEditor}>编辑</Button>
                        </FooterToolbar>
                    </> : <Spin />}
            </>
        );
    }
}


const mapStateToProps = state => ({
    weekResults: state.ReducerInfo.weekResults,
    nextWeekPlans: state.ReducerInfo.nextWeekPlans,
    weekQas: state.ReducerInfo.weekQas,
    comments: state.ReducerInfo.comments,
    weeklyVo: state.ReducerInfo.weeklyVo
});

const mapDispatchToProps = dispatch => ({
    infoActions: bindActionCreators(infoActions, dispatch)
});

const InfoForm = Form.create({})(Info);
export default connect(mapStateToProps, mapDispatchToProps)(InfoForm);
