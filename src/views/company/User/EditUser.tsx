import {useState} from "react";
import {Button, Form, Input, notification, Select} from "antd";
import {useEditUser, useUser} from "../../../hooks/user.hooks";
import {useParams} from "react-router-dom";
import CompanyLayout from "../../../components/layouts/CompanyLayout";
import {UserRoles} from "../../../types/constants";

const EditUserPage = () => {
    const {mutate: updateUser} = useEditUser();
    const {id} = useParams();
    const {data: user} = useUser(id ?? "");
    const [formData, setFormData] = useState({
        username: user?.username ?? '',
        name: user?.name ?? '',
        userType: user?.userType ?? UserRoles.COMPANYEMPLOYEE,
        phone: user?.phone ?? '',
        email: user?.email ?? '',
        company: user?.company ?? '',
        tags: user?.tags ?? []
    });


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
        <CompanyLayout>
            <h2>Edit User</h2>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Username" required>
                    <Input name="username" value={formData.username} disabled={true}/>
                </Form.Item>
                <Form.Item label="Name" required>
                    <Input name="name" value={formData.name} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="User Type" required>
                    <Select value={formData.userType} disabled={true}/>
                </Form.Item>
                <Form.Item label="Phone">
                    <Input name="phone" value={formData.phone} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" value={formData.email} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Company">
                    <Input name="company" value={formData.company} disabled={true}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Update User</Button>
            </Form>
        </CompanyLayout>
    );
};

export default EditUserPage;