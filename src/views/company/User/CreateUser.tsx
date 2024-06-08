// Componenta CreateUser
import {useState} from "react";
import {Button, Form, Input, notification, Select} from "antd";
import {useAuth} from "../../../context/AuthContext";
import {useCreateUser} from "../../../hooks/user.hooks";
import CompanyLayout from "../../../components/layouts/CompanyLayout";
import {UserRoles} from "../../../types/constants";

const CreateUserPage = () => {
    const {user} = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        userType: UserRoles.COMPANYEMPLOYEE,
        phone: '',
        email: '',
        company: user?.company,
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
        <CompanyLayout>
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
                    <Input name="company" value={formData.company} disabled={true}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Create User</Button>
            </Form>
        </CompanyLayout>
    );
};

export default CreateUserPage;