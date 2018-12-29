import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { Tag, Row, Col, Form, Card, Select, List, Avatar, Button, Icon } from 'antd';
import style from '../style/index.less';
import ListView from '../../../components/weekly-list-view';
import SelectView from '../../../components/select-view';
import * as WeeklyListActions from '../../../redux/actions/action/action-weeklyList';
import InitTimeShow from '../../../../utils/weekTime';
import Loading from './loading';
import history from '../../../../utils/history';

const FormItem = Form.Item;
const yearNow = moment().year();
const quarterNow = moment().quarter();
const monthNow = moment().month() + 1;
const dateNow = moment().date();

class WeeklyList extends React.Component {
    constructor() {
        super();
        this.state = {
            timeShow: [],
            requestResult: false
        };
    }

    static propTypes = {
        data: PropTypes.shape({}).isRequired,
        weeklyListActions: PropTypes.shape({}).isRequired
        // route: PropTypes.shape({
        //     routes: PropTypes.arrayOf(PropTypes.shape({}))
        // }).isRequired
    }


    componentDidMount() {
        let timeShow = InitTimeShow(yearNow, monthNow, dateNow, quarterNow);
        this.requestData("/api/support/week/getWeeklys", { "qtype": quarterNow, "userId": "", "year": yearNow });
        this.setState({ timeShow });
    }

    requestData = (url, param) => {
        let opts = {
            method: 'post',
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, opts).then((res) => {
            return res.json();
        }).then((res) => {
            const { weeklyListActions } = this.props;
            weeklyListActions.setWeeklyListData(res.data);
            this.setState({ requestResult: true });
        }).catch((error) => {
            console.log("error", error);
        });
    }

    quarter = (e) => {
        let timeShow = [];
        switch (e) {
            case "Q1":
                timeShow = InitTimeShow(yearNow, monthNow, dateNow, 1);
                break;
            case "Q2":
                timeShow = InitTimeShow(yearNow, monthNow, dateNow, 2);
                break;
            case "Q3":
                timeShow = InitTimeShow(yearNow, monthNow, dateNow, 3);
                break;
            case "Q4":
                timeShow = InitTimeShow(yearNow, monthNow, dateNow, 4);
                break;
            default:
                break;
        }
        this.setState({ timeShow });
    }

    onButtonClick = (e, month, week, weekTime) => {
        let data = {
            year: yearNow,
            month,
            qtype: quarterNow,
            week: week - 1,
            weekTime,
            from: 1
        };
        let path = {
            pathname: '/edit',
            state: data
        };
        history.push(path);
    }

    DetailsClick = (e, id) => {
        let path = {
            pathname: '/details',
            state: { weeklyId: id }
        };
        history.push(path);
    }


    render() {
        const { data } = this.props;
        const { timeShow, requestResult } = this.state;
        return (
            <>
                {requestResult
                    ? (
                        <Card>
                            <Form layout="inline">
                                <SelectView
                                    data={[yearNow.toString(), (yearNow + 1).toString(), (yearNow + 2).toString(), (yearNow + 3).toString()]}
                                    ifSelect={false}
                                    defaultValue={yearNow.toString()}
                                />
                                <SelectView
                                    onChange={this.quarter}
                                    data={["Q1", "Q2", "Q3", "Q4"]}
                                    ifSelect
                                    defaultValue={"Q" + quarterNow}
                                    quarter={quarterNow}
                                />
                                <FormItem>
                                    {/* eslint-disable */}
                                    <span>{data.weeklyInfo.userName}的周报</span>
                                </FormItem>
                            </Form>
                            <ListView
                                onDetailsClick={this.DetailsClick}
                                data={timeShow}
                                qweeks={data.weeklyInfo.qweeks}
                                onButtonClick={this.onButtonClick}
                            />
                        </Card>) : <Icon type="loading" className={style.localCenter} />}
            </>
        );
    }
}
const mapStateToProps = state => ({
    data: state.ReducerWeeklyList.data,
});

const mapDispatchToProps = dispatch => ({
    weeklyListActions: bindActionCreators(WeeklyListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyList);
