import {Button, Col, message, Row, Space, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {User} from "../../types/interfaces/User";
import {useDeleteUser, useUsersByCompany} from "../../hooks/user.hooks";
import {useAuth} from "../../context/AuthContext";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


const CompanyUserPage = () => {
    const {user} = useAuth();
    const {data: users, refetch, isLoading} = useUsersByCompany(user?.company ?? "");

    const {mutate: deleteUser} = useDeleteUser();

    const [isCompanyOwner, setIsCompanyOwner] = useState(user?.username === user?.company)

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
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Company",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: (_, {tags}) => (
                <>
                    {tags?.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
                    <h1>Company Users</h1>
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
