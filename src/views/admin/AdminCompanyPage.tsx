import {Button, Col, message, Row, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import AdminLayout from "../../components/layouts/AdminLayout";
import {useCompanies, useDeleteCompany} from "../../hooks/company.hooks";
import {Company} from "../../types/interfaces/Company";
import {useNavigate} from "react-router-dom";


const AdminCompanyPage = () => {
    const {data: companies, refetch, isFetching, isLoading} = useCompanies();
    const navigate = useNavigate();

    const {mutate: deleteCompany} = useDeleteCompany();

    const columns: ColumnsType<Company> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Owner Name",
            dataIndex: "ownerName",
            key: "ownerName",
        },
        {
            title: "Owner Email",
            dataIndex: "ownerEmail",
            key: "ownerEmail",
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
                    <h1>All Companies</h1>
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
