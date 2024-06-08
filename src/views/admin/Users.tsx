import {Button, message, Space, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {User} from "../../types/interfaces/User";
import AdminLayout from "../../components/layouts/AdminLayout";
import {useDeleteUser, useUsers} from "../../hooks/user.hooks";
import {Link} from "react-router-dom";


const AdminUserPage = () => {
    const {data: users, refetch, isLoading, isFetching} = useUsers();
    const {mutate: deleteUser} = useDeleteUser();


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
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/users/edit/${record.username}`}><Button>Edit</Button></Link>
                    <Button type="default" danger
                            onClick={() => deleteUser(record.username).then(() => {
                                    message.success('User deleted successfully!');
                                    refetch()
                                }
                            )}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <AdminLayout>
            <h1>All Users</h1>
            <Table dataSource={users} columns={columns} loading={isFetching || isLoading}/>
        </AdminLayout>
    );
};

export default AdminUserPage;
