import {useDeleteRoute, useRoutesByCompany} from "../../hooks/routes.hooks";
import {useAuth} from "../../context/AuthContext";
import {Button, Card, Col, Input, message, Row, Space, Table} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import CompanyLayout from "../../components/layouts/CompanyLayout";
import {useNavigate} from "react-router-dom";

const CompanyRoutesPage = () => {
    const {user} = useAuth();
    const {data: routes, refetch, isLoading, isFetching} = useRoutesByCompany(user?.company ?? "");
    const navigate = useNavigate();

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
            // Similar filter setup for End Location
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
        },
        {
            title: 'Available Seats',
            dataIndex: 'availableSeats',
            key: 'availableSeats',
        }
    ];

    return (
        <CompanyLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>Company Routes</h1>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => navigate("/routes/create")} style={{marginBottom: 16}}>
                        Add Route
                    </Button>
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
                            extra={
                                <>
                                    <Button danger type={'default'}
                                            onClick={() => deleteRoute(route.id.toString()).then(() => {
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
        </CompanyLayout>
    );
}

export default CompanyRoutesPage;
