import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag, Row, Col, Icon, Card, Button } from 'antd';
import style from './weekly-list-item.less';


export default class ListItem extends React.Component {
    static propTypes = {
        data: PropTypes.shape({}).isRequired, // week,month,weekTime数据
        bool: PropTypes.bool.isRequired, // 是否有对应周报
        box: PropTypes.shape({}).isRequired, // 周报details
        index: PropTypes.number.isRequired, // 数组的序号
        onButtonClick: PropTypes.func.isRequired,
        onDetailsClick: PropTypes.func.isRequired
    }


    render() {
        const { data, bool, box, index, onButtonClick, onDetailsClick } = this.props;
        return (
            <Row className={style.cardList}>
                <Col span={4}>
                    <p className={style.monthWeek}>
                        <span>Week</span>
                        {data.month}
                        <span>-</span>
                        {data.week}
                    </p>
                    <p>{data.weekTime}</p>
                    <>
                        {box.commentCount !== undefined
                            ? (
                                <p className={style.commentIcon}>
                                    <Icon type="message" />
                                    {" " + box.commentCount}
                                </p>) : null}
                    </>
                </Col>
                <Col span={20}>
                    {
                        bool
                            ? (
                                <Card bordered={false} className={style.greyBackground} onClick={(e) => { onDetailsClick(e, box.id); }}>
                                    <div className={style.cardItem}>
                                        <Tag color="#87d068">进展</Tag>
                                        <p className={style.marginbottom0}>{box.details1}</p>
                                    </div>
                                    <div className={style.cardItem}>
                                        {box.weeklyType2 === 1
                                            ? <Tag color="#87d068">进展</Tag>
                                            : <Tag color='rgb(16, 142, 233)'>计划</Tag>
                                        }
                                        <p className={style.marginbottom0}>{box.details2}</p>
                                    </div>
                                    <div className={style.cardItem}>
                                        <p className={style.marginbottom0}>...</p>
                                    </div>
                                </Card>) : null
                    }
                    {
                        (index === 0 && data.month === moment().month() + 1 && !bool)
                            // true
                            ? (
                                <Card bordered={false} className={style.textCenter}>
                                    <p>你还未填写本周周报，是否新建?</p>
                                    <Button type="primary" onClick={(e) => { onButtonClick(e, data.month, data.week, data.weekTime); }}>新建周报</Button>
                                </Card>) : null}
                    {
                        (!bool && (index !== 0 || data.month !== moment().month() + 1))
                            ? (
                                <Card bordered={false} className={style.textCenter}>
                                    <p>你未填写本周周报</p>
                                </Card>
                            ) : null
                    }
                </Col>
            </Row>
        );
    }
}
