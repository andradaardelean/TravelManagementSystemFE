import {Card, Col, Divider, Row, Statistic, Timeline, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, SmileOutlined,} from "@ant-design/icons";
import CountUp from "react-countup";
import {useCompanyStatistics} from "../../hooks/company.hooks";
import {useAuth} from "../../context/AuthContext";
import CompanyLayout from "../../components/layouts/CompanyLayout";

const {Title} = Typography;

const formatter = (value: number) => <CountUp end={value} separator=","/>;

const CompanyOverview = () => {

    const {user} = useAuth();

    const {data: statistics, isLoading} = useCompanyStatistics(user?.company ?? "");

    console.log(`statistics`, statistics)
    return (
        <CompanyLayout>
            <Divider>Overview</Divider>
            <Row gutter={16} style={{margin: 40}}>
                <Col span={12}>
                    <Card title="Solve Requests!" bordered={false} style={{textAlign: "center"}}>
                        Solve requests to keep the system running
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Post new information." bordered={false} style={{textAlign: "center"}}>
                        Post new information to keep the users updated
                    </Card>
                </Col>

            </Row>

            <Row gutter={16} style={{marginTop: 30, textAlign: "center"}}>
                <Col span={12}>
                    <Statistic
                        title="Staff Members"
                        value={statistics?.numberOfEmployees}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Running Routes"
                        value={statistics?.numberOfRoutes}
                        precision={2}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
            </Row>

            <Row gutter={16} style={{marginTop: 30, textAlign: "center"}}>
                <Col span={24}>
                    <Statistic
                        title="Active Bookings"
                        value={statistics?.numberOfBookings}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
            </Row>

            <Row gutter={16} style={{marginTop: 30, textAlign: "center"}}>
                <Col span={12}>
                    <Statistic
                        title="Revenue ($) Day"
                        value={statistics?.moneyPerDay}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Revenue ($) Month"
                        value={statistics?.moneyPerMonth}
                        precision={2}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
            </Row>

            <Row gutter={16} style={{marginTop: 30, textAlign: "center"}}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Today's Km"
                            value={statistics?.kmPerDay}
                            precision={2}
                            valueStyle={{color: "#3f8600"}}
                            prefix={<ArrowUpOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="This month's Km"
                            value={statistics?.kmPerMonth}
                            precision={2}
                            valueStyle={{color: "#cf1322"}}
                            prefix={<ArrowDownOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>

            <Divider style={{marginTop: 55}}>Today's Timeline</Divider>
            <Row gutter={16} style={{marginTop: 35, justifyContent: "center"}}>
                <Timeline
                    style={{
                        marginTop: 25,
                    }}
                    items={[
                        {
                            color: "green",
                            children: "Create a services site 2015-09-01",
                        },
                        {
                            color: "green",
                            children: "Create a services site 2015-09-01",
                        },
                        {
                            color: "red",
                            children: (
                                <>
                                    <p>Solve initial network problems 1</p>
                                    <p>Solve initial network problems 2</p>
                                    <p>Solve initial network problems 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            children: (
                                <>
                                    <p>Technical testing 1</p>
                                    <p>Technical testing 2</p>
                                    <p>Technical testing 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            color: "gray",
                            children: (
                                <>
                                    <p>Technical testing 1</p>
                                    <p>Technical testing 2</p>
                                    <p>Technical testing 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            color: "gray",
                            children: (
                                <>
                                    <p>Technical testing 1</p>
                                    <p>Technical testing 2</p>
                                    <p>Technical testing 3 2015-09-01</p>
                                </>
                            ),
                        },
                        {
                            color: "#00CCFF",
                            dot: <SmileOutlined/>,
                            children: <p>Custom color testing</p>,
                        },
                    ]}
                />
            </Row>
        </CompanyLayout>
    );
};

export default CompanyOverview;
