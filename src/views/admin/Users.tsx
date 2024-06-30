import {Button, Input, message, Space, Table, Tag} from "antd";
import {ColumnsType} from "antd/es/table";
import {User} from "../../types/interfaces/User";
import AdminLayout from "../../components/layouts/AdminLayout";
import {useDeleteUser, useUsers} from "../../hooks/user.hooks";
import {Link} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";


const AdminUserPage = () => {
    const {data: users, refetch, isLoading, isFetching} = useUsers();
    const {mutate: deleteUser} = useDeleteUser();
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
            <h1>Users</h1>
            <Table dataSource={users} columns={columns} loading={isFetching || isLoading}/>
        </AdminLayout>
    );
};

export default AdminUserPage;
