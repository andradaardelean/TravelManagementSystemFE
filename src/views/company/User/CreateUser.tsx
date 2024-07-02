// Componenta CreateUser
import {useState} from "react";
import {Button, Form, Input, message, notification, Select, Typography} from "antd";
import {useAuth} from "../../../context/AuthContext";
import {useCreateUser} from "../../../hooks/user.hooks";
import CompanyLayout from "../../../components/layouts/CompanyLayout";
import {UserRoles} from "../../../types/constants";
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();

    const handleSubmit = () => {
        createUser(formData).then(() => {
            message.success('User created successfully!');
        }).catch(() => {
            message.error( 'Failed to create user.');
        });
        navigate('/users');
    };

    return (
        <CompanyLayout>
            <Typography.Title level={2}>Create User</Typography.Title>
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