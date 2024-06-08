import {Button, Col, Row, Table} from "antd";
import {useDeleteBooking, useGetAllBookings} from "../../hooks/booking.hooks";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminBookingPage = () => {
    const {data: bookings, isLoading, isFetching} = useGetAllBookings();

    const {mutate: cancelBooking} = useDeleteBooking();

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: 'Passenger',
            dataIndex: 'passengersNo',
            key: 'passenger',
        },
        {
            title: "Actions",
            key: "actions",
            render: (record: any) => (
                <Row justify="space-between">
                    <Col>
                        <Button danger onClick={() => cancelBooking(record.id)}>Cancel</Button>
                    </Col>
                </Row>
            ),
        }
    ];

    return (
        <AdminLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>All Bookings</h1>
                </Col>
            </Row>
            <Table
                loading={isLoading || isFetching}
                dataSource={bookings}
                columns={columns}
                rowKey="id"
                style={{marginTop: 20}}
                pagination={{pageSize: 10}}
            />
        </AdminLayout>
    );
}

export default AdminBookingPage;
