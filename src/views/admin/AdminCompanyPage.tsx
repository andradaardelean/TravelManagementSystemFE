import {Button, Col, Input, message, Row, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import AdminLayout from "../../components/layouts/AdminLayout";
import {useCompanies, useDeleteCompany} from "../../hooks/company.hooks";
import {Company} from "../../types/interfaces/Company";
import {useNavigate} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";


const AdminCompanyPage = () => {
    const {data: companies, refetch, isFetching, isLoading} = useCompanies();
    const navigate = useNavigate();

    const {mutate: deleteCompany} = useDeleteCompany();

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


    const columns: ColumnsType<Company> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...columnOptions('name')
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...columnOptions('description')
        },
        {
            title: "Owner Name",
            dataIndex: "ownerName",
            key: "ownerName",
            ...columnOptions('ownerName')
        },
        {
            title: "Owner Email",
            dataIndex: "ownerEmail",
            key: "ownerEmail",
            ...columnOptions('ownerEmail')
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default" onClick={() => {
                        navigate(`/companies/edit/${record.name}`)
                    }}>Edit</Button>
                    <Button type="default" danger onClick={() => deleteCompany(record.id.toString()).then(() => {
                        message.success('Company deleted successfully!');
                        refetch();
                    })}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>Companies</h1>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => navigate("/companies/new")} style={{marginBottom: 16}}>
                        Add Company
                    </Button>
                </Col>
            </Row>
            <Table dataSource={companies} columns={columns} loading={isFetching || isLoading}/>
        </AdminLayout>
    );
};

export default AdminCompanyPage;
