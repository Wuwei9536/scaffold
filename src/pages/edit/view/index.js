import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tag, Row, Form, Card, Button, Spin, Modal } from 'antd';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import style from '../style/index.less';
import WriteView from '../../../components/weekly-write-view/index';
import * as editActions from '../../../redux/actions/action/action-edit';
import history from '../../../../utils/history';

const confirm = Modal.confirm;

const placeholder = {
    titleProgress: "进展，限制40字",
    titlePlan: "计划，限制40字",
    titleProblem: "问题，限制40字，选填",
    okr: "请选择关联的okr",
    content: "请输入内容"
};

class Edit extends React.Component {
    state = {
        editShow: false
    }

    static defaultProps = {
        weeklyVoEdit: {}
    }

    static propTypes = {
        dataProgress: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        dataPlan: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        dataProblem: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        okrs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        editActions: PropTypes.shape({}).isRequired,
        weeklyVoEdit: PropTypes.shape({})
    }

    componentDidMount() {
        // eslint-disable-next-line
        const { state } = this.props.location
        if (state) {
            window.localStorage.setItem('editParam', JSON.stringify(state));
        }
        this.editParam = JSON.parse(window.localStorage.getItem('editParam'));
        if (this.editParam.from) {
            this.requestDetail('/api/support/week/getLastWeeklyDetail',
                this.editParam,
                '/api/support/week/selectOkrOption', this.editParam.from);
        } else {
            this.requestDetail('api/support/week/getWeeklyDetail',
                this.editParam,
                '/api/support/week/selectOkrOption');
        }
    }

    componentWillUnmount() {
        const { editActions } = this.props;
        editActions.setDataProgress([{}]);
        editActions.setDataPlan([{}]);
        editActions.setDataProblem([{}]);
        editActions.setWeeklyVoEdit({});
    }


    requestDetail = async (urlDetail, param, urlOkr, from) => {
        const { editActions } = this.props;
        let optsdetail = {
            method: 'post',
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let optsOkr = {
            method: 'post',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await fetch(urlOkr, optsOkr)
            .then((response) => {
                return response.json();
            }).then((res) => {
                editActions.setOkr(res.data.okrs);
            }).catch((error) => {
                // eslint-disable-next-line
                console.log('%cerror: ', 'font-size:15px;background-color: rgb(135, 208, 104);', error);
            });
        await fetch(urlDetail, optsdetail)
            .then((response) => {
                return response.json();
            }).then((res) => {
                if (from) {
                    editActions.setDataProgress(res.data.lastWeekPlans);
                } else {
                    editActions.setWeeklyVoEdit(res.data.weeklyDetailInfo.weeklyVo);
                    editActions.setDataProgress(res.data.weeklyDetailInfo.weekResults);
                    editActions.setDataPlan(res.data.weeklyDetailInfo.nextWeekPlans);
                    editActions.setDataProblem(res.data.weeklyDetailInfo.weekQas);
                }
                this.setState({ editShow: true });
            }).catch((error) => {
                // eslint-disable-next-line
                console.log('%cerror: ', 'font-size:15px;background-color: rgb(135, 208, 104);', error);
            });
    }

    addItem = (id) => {
        this.form.validateFields((errors, value) => {
            console.log('%cvalue: ', 'font-size:15px;background-color: rgb(135, 208, 104);', value);
            console.log('%cerrors: ', 'font-size:15px;background-color: rgb(135, 208, 104);', errors);
            if (!errors) {
                const { dataProgress, dataPlan, dataProblem, editActions } = this.props;
                let addData = [];
                switch (id) {
                    case 1:
                        addData = dataProgress.concat([{}]);
                        editActions.setDataProgress(addData);
                        break;
                    case 2:
                        addData = dataPlan.concat([{}]);
                        editActions.setDataPlan(addData);
                        break;
                    case 3:
                        addData = dataProblem.concat([{}]);
                        editActions.setDataProblem(addData);
                        break;
                    default:
                        break;
                }
            }
        });
        // const { dataProgress, dataPlan, dataProblem, editActions } = this.props;
        // let addData = [];
        // switch (id) {
        //     case 1:
        //         addData = dataProgress.concat([{}]);
        //         editActions.setDataProgress(addData);
        //         break;
        //     case 2:
        //         addData = dataPlan.concat([{}]);
        //         editActions.setDataPlan(addData);
        //         break;
        //     case 3:
        //         addData = dataProblem.concat([{}]);
        //         editActions.setDataProblem(addData);
        //         break;
        //     default:
        //         break;
        // }
    }

    onChangeField = (weeklyType, index, changedFields, allValues) => {
        const { dataProgress, dataPlan, dataProblem } = this.props;
        switch (weeklyType) {
            case 1:
                dataProgress[index] = {
                    summary: allValues.summary.value,
                    krId: allValues.krId.value,
                    details: allValues.details.value,
                    weeklyType
                };
                break;
            case 2:
                dataPlan[index] = {
                    summary: allValues.summary.value,
                    krId: allValues.krId.value,
                    details: allValues.details.value,
                    weeklyType
                };
                break;
            case 3:
                dataProblem[index] = {
                    summary: allValues.summary.value,
                    krId: allValues.krId.value,
                    details: allValues.details.value,
                    weeklyType
                };
                break;
            default:
                break;
        }
    }

    save = (e, from) => {
        const { dataProgress, dataPlan, dataProblem } = this.props;
        const { year, qtype, month, week, weekTime } = this.editParam;
        let WeeklyVo;
        let url;
        let path;
        if (from) {
            WeeklyVo = {
                newWeeklyVo: {
                    year,
                    qtype,
                    month: 11,
                    week: 3,
                    weekTime: "11月26日-12月2日",
                    weekResults: dataProgress,
                    nextWeekPlans: dataPlan,
                    weekQas: dataProblem
                }
            };
            url = '/api/support/week/addWeekly';
            path = '/';
        } else {
            WeeklyVo = {
                commitWeeklyVo: {
                    weeklyId: this.editParam.weeklyId,
                    weekResults: dataProgress,
                    nextWeekPlans: dataPlan,
                    weekQas: dataProblem
                }
            };
            url = '/api/support/week/editWeekly';
            path = '/details';
        }
        let opts = {
            method: 'post',
            body: JSON.stringify(WeeklyVo),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, opts).then((res) => {
            return res.json();
        }).then((res) => {
        }).catch((error) => {
            // eslint-disable-next-line
            console.log("error", error);
        });
        history.push(path);
    }

    showConfirm = () => {
        confirm({
            title: '点击取消将不会保存已编辑的内容?',
            content: '你确定要取消吗？',
            cancelText: '取消',
            okText: '确定',
            onOk() {
                history.push('/');
            },
            onCancel() { }
        });
    }


    delete = (e, index, weeklyType, summary) => {
        const { dataProgress, dataPlan, dataProblem, editActions } = this.props;
        let restData = [];
        let spliceData = this.spliceData;
        if (summary) {
            confirm({
                title: '删除条目将同时删除已输入的内容',
                content: '你确定要删除吗？',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                    spliceData(weeklyType, dataProgress, dataPlan, dataProblem, restData, index, editActions);
                },
                onCancel() { }
            });
        } else {
            spliceData(weeklyType, dataProgress, dataPlan, dataProblem, restData, index, editActions);
        }
    }

    spliceData = (weeklyType, dataProgress, dataPlan, dataProblem, restData, index, editActions) => {
        switch (weeklyType) {
            case 1:
                dataProgress.splice(index, 1);
                restData = [...dataProgress];
                editActions.setDataProgress(restData);
                break;
            case 2:
                dataPlan.splice(index, 1);
                restData = [...dataPlan];
                editActions.setDataPlan(restData);
                break;
            case 3:
                dataProblem.splice(index, 1);
                restData = [...dataProblem];
                editActions.setDataProblem(restData);
                break;
            default:
                break;
        }
    }

    takeValidateFields = (ref) => {
        this.form = ref.props.form;
    }

    render() {
        const { dataProgress, dataPlan, dataProblem, okrs, weeklyVoEdit } = this.props;
        const { editShow } = this.state;
        return (
            <>
                {editShow
                    ? (
                        <>
                            <div className={style.marginBottom100}>
                                <Card>
                                    {weeklyVoEdit
                                        ? <>
                                            <span className={style.weekTime}>
                                                {"Week " + weeklyVoEdit.month + "-" + weeklyVoEdit.week}
                                            </span>
                                            <span>{weeklyVoEdit.weekTime}</span>
                                        </>
                                        : null}
                                    <Card className={style.cardBackground}>
                                        <Row type="flex" justify="space-around">
                                            <div>
                                                <Tag className={style.leftTag}>本周进展</Tag>
                                            </div>
                                            <div className={style.widthFlex}>
                                                <Form>
                                                    <WriteView
                                                        data={dataProgress}
                                                        okrs={okrs}
                                                        title={placeholder.titleProgress}
                                                        holder={placeholder}
                                                        onChangeField={this.onChangeField}
                                                        weeklyType={1}
                                                        takeValidateFields={this.takeValidateFields}
                                                        onDelete={this.delete}
                                                    />
                                                    <Button type="dashed" className={style.addButton} onClick={(e) => { this.addItem(1, e); }}>添加进展</Button>
                                                </Form>
                                            </div>
                                        </Row>
                                    </Card>
                                    <Card className={style.cardBackground}>
                                        <Row type="flex" justify="space-around">
                                            <div>
                                                <Tag className={style.leftTagPlan}>下周计划</Tag>
                                            </div>
                                            <div className={style.widthFlex}>
                                                <Form>
                                                    <WriteView
                                                        data={dataPlan}
                                                        okrs={okrs}
                                                        title={placeholder.titlePlan}
                                                        holder={placeholder}
                                                        onChangeField={this.onChangeField}
                                                        weeklyType={2}
                                                        takeValidateFields={this.takeValidateFields}
                                                        onDelete={this.delete}
                                                    />
                                                </Form>
                                                <Button type="dashed" className={style.addButton} onClick={(e) => { this.addItem(2, e); }}>添加计划</Button>
                                            </div>
                                        </Row>
                                    </Card>
                                    <Card className={style.cardBackground}>
                                        <Row type="flex" justify="space-around">
                                            <div>
                                                <Tag className={style.leftTagProblem}>遗留问题</Tag>
                                            </div>
                                            <div className={style.widthFlex}>
                                                <Form>
                                                    <WriteView
                                                        data={dataProblem}
                                                        okrs={okrs}
                                                        title={placeholder.titleProblem}
                                                        holder={placeholder}
                                                        onChangeField={this.onChangeField}
                                                        weeklyType={3}
                                                        takeValidateFields={this.takeValidateFields}
                                                        onDelete={this.delete}
                                                    />
                                                </Form>
                                                <Button type="dashed" className={style.addButton} onClick={(e) => { this.addItem(3, e); }}>添加问题</Button>
                                            </div>
                                        </Row>
                                    </Card>
                                </Card>
                            </div>
                            <FooterToolbar>
                                <Button type="primary" onClick={(e) => { this.save(e, this.editParam.from); }}>保存</Button>
                                <Button onClick={this.showConfirm}>取消</Button>
                            </FooterToolbar>
                        </>
                    ) : <Spin tip="Loading" className={style.loading} />}
            </>
        );
    }
}


const mapStateToProps = state => ({
    dataProgress: state.ReducerEdit.dataProgress,
    dataPlan: state.ReducerEdit.dataPlan,
    dataProblem: state.ReducerEdit.dataProblem,
    okrs: state.ReducerEdit.okrs,
    weeklyVoEdit: state.ReducerEdit.weeklyVoEdit
});

const mapDispatchToProps = dispatch => ({
    editActions: bindActionCreators(editActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
