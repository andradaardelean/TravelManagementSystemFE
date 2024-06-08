import {Card, Col, Divider, Row} from "antd";
import UserLayout from "../../components/layouts/UserLayout";
import CalendarComponent from "./Calendar";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <UserLayout>
            <Divider orientation="center">Public Transport App</Divider>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card
                        hoverable
                        onClick={() => navigate('/search')}
                        className="dashboard-card"
                    >
                        <Card.Meta
                            className="card-meta"
                            title={<div className="card-meta-title">Explore Routes & Purchase Tickets</div>}
                            description={<div className="card-meta-description">Time to travel.</div>}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        hoverable
                        onClick={() => navigate('/my-reservations')}
                        className="dashboard-card"
                    >
                        <Card.Meta
                            className="card-meta"
                            title={<div className="card-meta-title">See Bookings</div>}
                            description={<div className="card-meta-description">Check timelines & destinations.</div>}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]} className="row-margin-top">
                <Col span={12}>
                    <Card
                        hoverable
                        onClick={() => navigate('/search')}
                        className="dashboard-card"
                    >
                        <Card.Meta
                            className="card-meta"
                            title={<div className="card-meta-title">Issues</div>}
                            description={<div className="card-meta-description">Customer Support Department.</div>}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        hoverable
                        onClick={() => navigate('/search')}
                        className="dashboard-card"
                    >
                        <Card.Meta
                            className="card-meta"
                            title={<div className="card-meta-title">Stay Updated</div>}
                            description={<div className="card-meta-description">Info Section.</div>}
                        />
                    </Card>
                </Col>
            </Row>

            <Row style={{marginTop: 100}}>
                <CalendarComponent/>
            </Row>
        </UserLayout>
    );
};

export default Home;

