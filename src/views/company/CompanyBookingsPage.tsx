import {useAuth} from "../../context/AuthContext";
import {Button, Col, Input, Row, Space, Table} from "antd";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import {useBookingsByCompany} from "../../hooks/booking.hooks";
import {useNavigate} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

const CompanyBookingPage = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {data: bookings, isLoading} = useBookingsByCompany(user?.company ?? "");

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
            render: (record: any) => record?.booking?.id,
            ...columnOptions('id')
        },
        {
            title: 'Type',
            dataIndex: 'booking',
            key: 'type',
            render: (booking: any) => booking.type,
            ...columnOptions('type')
        },
        {
            title: 'Passengers',
            dataIndex: 'booking',
            key: 'passengersNo',
            render: (booking: any) => booking.passengersNo,
            ...columnOptions('passengersNo')
        },
        {
            title: 'From',
            dataIndex: 'fromStop',
            key: 'fromStop',
            render: (fromStop: any) => fromStop.location,
            ...columnOptions('fromStop')
        },
        {
            title: 'To',
            dataIndex: 'toStop',
            key: 'toStop',
            render: (toStop: any) => toStop.location,
            ...columnOptions('toStop')
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: any) => (
                <Button onClick={() => navigate(`/booking-timeline/${record?.booking?.id}`)}>View Timeline</Button>
            ),
        },
    ];

    return (
        <CompanyLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>Bookings</h1>
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
