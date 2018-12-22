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

const FormItem = Form.Item;
const yearNow = moment().year();
const quarterNow = moment().quarter();
const monthNow = moment().month() + 1;
const dateNow = moment().date();

class WeeklyList extends React.Component {
    constructor() {
        super();
        this.state = {
            timeShow: []
        };
    }

    static propTypes = {
        data: PropTypes.shape({}).isRequired,
        weeklyListActions: PropTypes.shape({}).isRequired,
        requestResult:PropTypes.bool.isRequired
        // route: PropTypes.shape({
        //     routes: PropTypes.arrayOf(PropTypes.shape({}))
        // }).isRequired
    }

    componentWillMount() {
        console.log("will mount");
    }

    componentDidMount() {
        console.log("mount");
        this.requestData("/api/support/week/getWeeklys", { "qtype": 4, "userId": "", "year": 2018 });
        let timeShow = InitTimeShow(yearNow, monthNow, dateNow, quarterNow);
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
            console.log("res", res);
            const { weeklyListActions } = this.props;
            weeklyListActions.setWeeklyListData(res.data);
            weeklyListActions.setRequestResult(true);
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


    render() {
        console.log("render");
        const { data, requestResult } = this.props;
        const { timeShow } = this.state;
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
                                    <span>...的周报</span>
                                </FormItem>
                            </Form>
                            <ListView
                                data={timeShow}
                                qweeks={data.weeklyInfo.qweeks}
                            />
                        </Card>) : <Icon type="loading" className={style.localCenter} />}
            </>
        );
    }
}
const mapStateToProps = state => ({
    data: state.ReducerWeeklyList.data,
    requestResult: state.ReducerWeeklyList.requestResult
});

const mapDispatchToProps = dispatch => ({
    weeklyListActions: bindActionCreators(WeeklyListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyList);
