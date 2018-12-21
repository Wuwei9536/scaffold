import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { Tag, Row, Col, Form, Card, Select, List, Avatar, Button } from 'antd';
import style from '../style/index.less';
import ListView from '../../../components/weekly-list-view';
import SelectView from '../../../components/select-view';
import * as WeeklyListActions from '../../../redux/actions/action/action-weeklyList';
import InitTimeShow from '../../../../utils/weekTime';


const FormItem = Form.Item;
const yearNow = moment().year();
const quarterNow = moment().quarter();
const monthNow = moment().month() + 1;
const dateNow = moment().date();

class View extends React.Component {
    constructor() {
        super();
        this.state = {
            timeShow: []
        };
    }

    static propTypes = {
        data: PropTypes.shape({}).isRequired,
        endDate: PropTypes.shape({}).isRequired
        // route: PropTypes.shape({
        //     routes: PropTypes.arrayOf(PropTypes.shape({}))
        // }).isRequired
    }

    componentDidMount() {
        let timeShow = InitTimeShow(yearNow, monthNow, dateNow, quarterNow);
        this.setState({ timeShow });
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
        const { data } = this.props;
        const { timeShow } = this.state;
        return (
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
                    store={data.weeklyInfo}
                />
            </Card>
        );
    }
}
const mapStateToProps = state => ({
    endDate: state.ReducerWeeklyList.endDate,
    data: state.ReducerWeeklyList.data
});

const mapDispatchToProps = dispatch => ({
    weeklyListActions: bindActionCreators(WeeklyListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
