import {Card, Col, Divider, Row, Statistic, Timeline, Typography} from "antd";
import AdminLayout from "../../components/layouts/AdminLayout";
import {ArrowDownOutlined, ArrowUpOutlined, SmileOutlined,} from "@ant-design/icons";
import CountUp from "react-countup";
import {useAdminStatistics} from "../../hooks/admin.hooks";

const {Title} = Typography;

const formatter = (value: number) => <CountUp end={value} separator=","/>;

const AdminOverview = () => {

    const {data: statistics, isLoading} = useAdminStatistics();
    return (
        <AdminLayout>
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
                        title="Active Users"
                        value={statistics?.users}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Active Companies"
                        value={statistics?.companies}
                        precision={2}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
            </Row>

            <Row gutter={16} style={{marginTop: 30, textAlign: "center"}}>
                <Col span={12}>
                    <Statistic
                        title="Active Bookings"
                        value={statistics?.bookings}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="On-going Routes"
                        value={statistics?.routes}
                        precision={2}
                        formatter={(e) => e && formatter(Number(e))}
                    />
                </Col>
            </Row>

            <Row gutter={16} style={{marginTop: 30, textAlign: "center"}}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="This month Requests"
                            value={statistics?.requests}
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
                            title="Last month Requests"
                            value={9.3}
                            precision={2}
                            valueStyle={{color: "#cf1322"}}
                            prefix={<ArrowDownOutlined/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default AdminOverview;
