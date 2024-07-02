import { useDeleteRoute, useRoutesByCompany } from "../../hooks/routes.hooks";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Col, Input, message, Row, Space, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import CompanyLayout from "../../components/layouts/CompanyLayout";
import { useNavigate } from "react-router-dom";

const CompanyRoutesPage = () => {
    const { user } = useAuth();
    const { data: routes, refetch, isLoading, isFetching } = useRoutesByCompany(user?.company ?? "");
    const navigate = useNavigate();

    const { mutate: deleteRoute } = useDeleteRoute();

    const columnOptions = (column: string) => {
        return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    <Input
                        autoFocus
                        placeholder="Search start location"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button onClick={() => confirm()} type="primary" icon={<SearchOutlined />} size="small"
                            style={{ width: 90 }}>
                            Search
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: any, record: any) => record[`${column}`]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
        }
    }

    const columns = [
        {
            title: 'Start Location',
            dataIndex: 'startLocation',
            key: 'startLocation',
            ...columnOptions('startLocation')
        },
        {
            title: 'End Location',
            dataIndex: 'endLocation',
            key: 'endLocation',
            ...columnOptions('endLocation')
        },
        {
            title: 'Departure',
            dataIndex: 'startDateTime',
            key: 'startDateTime',
            render: (text: any) => new Date(text).toLocaleString()
        },
        {
            title: 'Arrival',
            dataIndex: 'endDateTime',
            key: 'endDateTime',
            render: (text: any) => new Date(text).toLocaleString()
        },
        {
            title: 'Price Per Seat',
            dataIndex: 'pricePerSeat',
            key: 'pricePerSeat',
            ...columnOptions('pricePerSeat')
        },
        {
            title: 'Available Seats',
            dataIndex: 'availableSeats',
            key: 'availableSeats',
            ...columnOptions('availableSeats')
        },
        {
            title:"Recurrence",
            dataIndex:"recurrenceType",
            key:"recurrenceType",
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    {record.startDateTime > new Date() && (
                        <>
                            <Button style={{ marginLeft: 5 }} type={'default'} danger onClick={() => deleteRoute({ routesDTO: record, removeAllRecursive: false }).then(() => {
                                message.success('Route deleted successfully!');
                                refetch();
                            }).catch((err) => {
                                message.error(`Route cannot be deleted as there are active bookings.`)
                            })}>Delete</Button>
                            {record.recurrenceType !== 'NONE' && (
                            <Button style={{ marginLeft: 5 }} type={'default'} danger onClick={() => deleteRoute({ routesDTO: record, removeAllRecursive: true }).then(() => {
                                message.success('Routes deleted successfully!');
                                refetch();
                            }).catch((err) => {
                                message.error(`Routes cannot be deleted as there are active bookings.`)
                            })}>Delete recurrence</Button>
                                )}
                        </>
                    )}
                </Space>
            )
        }
    ];

    return (
        <CompanyLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>Routes</h1>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => navigate("/routes/create")} style={{ marginBottom: 16 }}>
                        Add Route
                    </Button>
                </Col>
            </Row>

            <Table
                loading={isLoading || isFetching}
                dataSource={routes}
                columns={columns}
                rowKey="id"
                style={{ marginTop: 20 }}
                pagination={{ pageSize: 10 }}
            />
        </CompanyLayout>
    );
}

export default CompanyRoutesPage;
