import UserLayout from "../../components/layouts/UserLayout";
import {Button, Col, Row, Tabs} from "antd";
import ActiveTickets from "./Tickets/ActiveTickets";
import PastTickets from "./Tickets/PastTickets";
import {useNavigate} from "react-router-dom";

const MyBookings = () => {
    const navigate = useNavigate();

    const tabs = [
        {
            label: "Active",
            key: "1",
            children: <ActiveTickets/>,
        },
        {
            label: "Past",
            key: "2",
            children: <PastTickets/>,
        },
    ]
    return (
        <UserLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>My Bookings</h1>
                </Col>
                <Col>
                    <Button type={'primary'} onClick={() => navigate('/search')}>New booking</Button>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="1"
                centered
                items={tabs}
            />
        </UserLayout>
    )
}

export default MyBookings;