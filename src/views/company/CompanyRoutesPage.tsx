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
        },
        {
            title:"Action",
            key:"action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button style={{marginLeft: 5}} type={'default'} danger onClick={() => deleteRoute({routesDTO: record, removeAllRecursive: false}).then(() => {
                        message.success('Route deleted successfully!');
                        refetch();
                    })}>Delete</Button>
                    <Button style={{marginLeft: 5}} type={'default'} danger onClick={() => deleteRoute({routesDTO: record, removeAllRecursive: true}).then(() => {
                        message.success('Routes deleted successfully!');
                        refetch();
                    })}>Delete recurrence</Button>
                </Space>
            )
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
        </CompanyLayout>
    );
}

export default CompanyRoutesPage;
