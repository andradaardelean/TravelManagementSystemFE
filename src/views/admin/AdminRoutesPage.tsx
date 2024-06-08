import {useAllRoutes, useDeleteRoute} from "../../hooks/routes.hooks";
import AdminLayout from "../../components/layouts/AdminLayout";
import {Button, Card, Col, Input, message, Row, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const AdminRoutesPage = () => {
    const {data: routes, refetch, isFetching, isLoading} = useAllRoutes();

    const {mutate: deleteRoute} = useDeleteRoute();

    const columns = [
        {
            title: 'Start Location',
            dataIndex: 'startLocation',
            key: 'startLocation',
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
            onFilter: (value: any, record: any) => record.startLocation.toString().toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'End Location',
            dataIndex: 'endLocation',
            key: 'endLocation',
        },
        {
            title: 'Departure',
            dataIndex: 'startDateTime',
            key: 'startDateTime',
        },
        {
            title: 'Arrival',
            dataIndex: 'endDateTime',
            key: 'endDateTime',
        },
        {
            title: 'Price Per Seat',
            dataIndex: 'pricePerSeat',
            key: 'pricePerSeat',
            render: (price: number) => `$${price}`
        },
        {
            title: 'Available Seats',
            dataIndex: 'availableSeats',
            key: 'availableSeats',
        }
    ];

    return (
        <AdminLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>All Routes</h1>
                </Col>
            </Row>
            <Table
                loading={isLoading || isFetching}
                dataSource={routes}
                columns={columns}
                rowKey="id"
                style={{marginTop: 20}}
                pagination={{pageSize: 10}}
            />
            <Row gutter={16} style={{marginTop: 20}}>
                {routes?.map(route => (
                    <Col span={8} key={route.id}>
                        <Card
                            title={`${route.startLocation} - ${route.endLocation}`}
                            style={{margin: 8}}
                            extra={
                                <>
                                    <Button danger onClick={() => deleteRoute(route.id.toString()).then(() => {
                                        message.success('Route deleted successfully!');
                                        refetch();
                                    })}>Delete</Button>
                                </>}
                            hoverable
                        >
                            <p>Departure: {route.startDateTime}</p>
                            <p>Arrival: {route.endDateTime}</p>
                            <p>Price per seat: ${route.pricePerSeat}</p>
                            <p>Available seats: {route.availableSeats} of {route.totalSeats}</p>
                        </Card>
                    </Col>
                ))}
            </Row>

        </AdminLayout>
    );
}

export default AdminRoutesPage;