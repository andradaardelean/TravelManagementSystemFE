import {useEffect, useState} from "react";
import {Button, Form, Input, notification, Select, Typography} from "antd";
import {useEditUser, useUser} from "../../../hooks/user.hooks";
import {useParams} from "react-router-dom";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {UserRoles} from "../../../types/constants";

const EditUserPage = () => {
    const {mutate: updateUser} = useEditUser();
    const {id} = useParams();
    const {data: user} = useUser(id ?? "");
    const [formData, setFormData] = useState({
        username: user?.username ?? '',
        name: user?.name ?? '',
        userType: user?.userType,
        phone: user?.phone ?? '',
        email: user?.email ?? '',
        company: user?.company ?? '',
        tags: user?.tags ?? []
    });

    useEffect(() => {
        setFormData({
            username: user?.username ?? '',
            name: user?.name ?? '',
            userType: user?.userType,
            phone: user?.phone ?? '',
            email: user?.email ?? '',
            company: user?.company ?? '',
            tags: user?.tags ?? []
        });
    }, [user]);

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        updateUser(formData).then(() => {
            notification.success({message: 'User updated successfully!'});
        }).catch(() => {
            notification.error({message: 'Failed to update user.'});
        })
    };

    return (
        <AdminLayout>
           <Typography.Title level={2}>Edit User</Typography.Title>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Username" required>
                    <Input name="username" value={formData.username} style={{ width: "20vw"}}/>
                </Form.Item>
                <Form.Item label="Name" required>
                    <Input name="name" value={formData.name} onChange={handleInputChange} style={{ width: "20vw"}}/>
                </Form.Item>
                <Form.Item label="User Type" required>
                    <Select value={formData.userType} style={{ width: "20vw"}}/>
                </Form.Item>
                <Form.Item label="Phone">
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: "20vw"}}/>
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" value={formData.email} onChange={handleInputChange} style={{ width: "20vw"}}/>
                </Form.Item>
                <Form.Item label="Company">
                    <Input name="company" value={formData.company} onChange={handleInputChange} style={{ width: "20vw"}}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Save Changes</Button>
            </Form>
        </AdminLayout>
    );
};

export default EditUserPage;