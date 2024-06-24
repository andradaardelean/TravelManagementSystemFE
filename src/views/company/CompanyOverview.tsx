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
                    <Card title="Keep track of your routes!" bordered={false} style={{textAlign: "center"}}>
                        Check and schedule new routes.
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
        </CompanyLayout>
    );
};

export default CompanyOverview;
