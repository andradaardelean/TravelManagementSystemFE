import {Button, Col, message, Row, Table} from "antd";
import {useDeleteBooking, useGetAllBookings} from "../../hooks/booking.hooks";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminBookingPage = () => {
    const {data: bookings, isLoading, isFetching, refetch} = useGetAllBookings();

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
            title: "Action",
            key: "actions",
            render: (record: any) => (
                <Row justify="space-between">
                    <Col>
                        <Button danger onClick={() => cancelBooking(record.id).then(() => {
                            message.success("Booking deleted successfully!");
                            refetch();
                        })}>Delete</Button>
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
