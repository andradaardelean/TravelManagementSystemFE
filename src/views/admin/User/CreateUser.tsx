// Componenta CreateUser
import {useState} from "react";
import {Button, Form, Input, notification, Select} from "antd";
import {useCreateUser} from "../../../hooks/user.hooks";
import AdminLayout from "../../../components/layouts/AdminLayout";
import {UserRoles} from "../../../types/constants";

const CreateUserPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        userType: UserRoles.COMPANYEMPLOYEE,
        phone: '',
        email: '',
        company: ''
    });

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const {mutate: createUser} = useCreateUser();

    const handleSubmit = () => {
        createUser(formData).then(() => {
            notification.success({message: 'User created successfully!'});
        }).catch(() => {
            notification.error({message: 'Failed to create user.'});
        })
    };

    return (
        <AdminLayout>
            <h2>Create User</h2>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Username" required>
                    <Input name="username" value={formData.username} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Name" required>
                    <Input name="name" value={formData.name} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="User Type" required>
                    <Select value={formData.userType}
                            disabled={true}>
                    </Select>
                </Form.Item>
                <Form.Item label="Phone">
                    <Input name="phone" value={formData.phone} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" value={formData.email} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Company">
                    <Input name="company" value={formData.company} onChange={handleInputChange}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Create User</Button>
            </Form>
        </AdminLayout>
    );
};

export default CreateUserPage;