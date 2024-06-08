import {useAuth} from "../../context/AuthContext";
import {Button, Col, Row, Table} from "antd";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import {useBookingsByCompany} from "../../hooks/booking.hooks";
import {useNavigate} from "react-router-dom";

const CompanyBookingPage = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {data: bookings, isLoading} = useBookingsByCompany(user?.company ?? "");

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'booking',
            key: 'type',
            render: (booking: any) => booking.type,
        },
        {
            title: 'Passengers',
            dataIndex: 'booking',
            key: 'passengersNo',
            render: (booking: any) => booking.passengersNo,
        },
        {
            title: 'From',
            dataIndex: 'fromStop',
            key: 'fromStop',
            render: (fromStop: any) => fromStop.location,
        },
        {
            title: 'To',
            dataIndex: 'toStop',
            key: 'toStop',
            render: (toStop: any) => toStop.location,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: any) => (
                <Button onClick={() => navigate(`/booking-timeline/${record.id}`)}>View Timeline</Button>
            ),
        },
    ];

    return (
        <CompanyLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>Company Bookings</h1>
                </Col>
            </Row>
            <Table
                loading={isLoading}
                dataSource={bookings}
                columns={columns}
                rowKey="id"
                style={{marginTop: 20}}
                pagination={{pageSize: 10}}
            />
        </CompanyLayout>
    );
}

export default CompanyBookingPage;
