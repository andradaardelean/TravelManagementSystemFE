import {Button, Col, Input, message, Row, Space, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {User} from "../../types/interfaces/User";
import {useDeleteUser, useUsersByCompany} from "../../hooks/user.hooks";
import {useAuth} from "../../context/AuthContext";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";


const CompanyUserPage = () => {
    const {user} = useAuth();
    const {data: users, refetch, isLoading} = useUsersByCompany(user?.company ?? "");

    const {mutate: deleteUser} = useDeleteUser();

    const [isCompanyOwner, setIsCompanyOwner] = useState(user?.username === user?.company)

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


    useEffect(() => {
        if (user) {
            setIsCompanyOwner(user?.name === user?.company)
        }
    }, [user]);

    const columns: ColumnsType<User> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...columnOptions('name')
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            ...columnOptions('username')
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            ...columnOptions('phone')
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...columnOptions('email')
        },
        {
            title: "Company",
            dataIndex: "company",
            key: "company",
            ...columnOptions('company')
        },
        {
            ...(isCompanyOwner && {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    <Space size="middle">
                        <Link to={`/users/edit/${record.username}`}><Button>Edit</Button></Link>
                        <Button type="default" danger onClick={() => deleteUser(record.username).then(() => {
                            message.success('User deleted successfully!');
                            refetch()
                        })}>Delete</Button>
                    </Space>
                ),
            })
        }
    ];

    const navigate = useNavigate();


    return (
        <CompanyLayout>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>Users</h1>
                </Col>
                <Col>
                    {isCompanyOwner && (
                        <Button type="primary" onClick={() => navigate("/users/new")} style={{marginBottom: 16}}>
                            Add User
                        </Button>
                    )}
                </Col>
            </Row>
            <Table dataSource={users} columns={columns} loading={isLoading}/>
        </CompanyLayout>
    );
};

export default CompanyUserPage;
