import {Button, Col, Input, message, Row, Space, Table} from "antd";
import {useDeleteBooking, useGetAllBookings} from "../../hooks/booking.hooks";
import AdminLayout from "../../components/layouts/AdminLayout";
import {SearchOutlined} from "@ant-design/icons";

const AdminBookingPage = () => {
    const {data: bookings, isLoading, isFetching, refetch} = useGetAllBookings();

    const {mutate: cancelBooking} = useDeleteBooking();


    const columnOptions = (column: string) => {
        return {
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
                <div style={{padding: 8}}>
                    <Input
                        autoFocus
                        placeholder="Search start location"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button onClick={() => confirm()} type="primary" icon={<SearchOutlined/>} size="small"
                                style={{width: 90}}>
                            Search
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{width: 90}}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: any, record: any) => record[`${column}`].toString().toLowerCase().includes(value.toLowerCase()),
        }
    }

    const columns = [
        {
            title: 'Id',
            key: 'id',
            render: (record: any) => record?.id,
            ...columnOptions('id')
        },
        {
            title: 'Type',
            key: 'type',
            render: (booking: any) => booking.type,
            ...columnOptions('type')
        },
        {
            title: 'Passengers',
            key: 'passengersNo',
            render: (booking: any) => booking.passengersNo,
            ...columnOptions('passengersNo')
        },
        // {
        //     title: 'From',
        //     dataIndex: 'fromStop',
        //     key: 'fromStop',
        //     render: (fromStop: any) => fromStop?.location,
        //     ...columnOptions('fromStop')
        // },
        // {
        //     title: 'To',
        //     dataIndex: 'toStop',
        //     key: 'toStop',
        //     render: (toStop: any) => toStop?.location,
        //     ...columnOptions('toStop')
        // },
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
                    <h1>Bookings</h1>
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
