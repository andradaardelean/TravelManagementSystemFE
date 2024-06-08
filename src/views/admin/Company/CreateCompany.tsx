import React, {useState} from 'react';
import {Button, Form, Input, notification} from 'antd';
import {useAddCompany} from "../../../hooks/company.hooks";
import AdminLayout from "../../../components/layouts/AdminLayout";

const CreateCompanyPage = () => {
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description: '',
        ownerName: '',
        ownerEmail: '',
        phone: ''
    });

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const {mutate: createCompany} = useAddCompany();

    const handleSubmit = async () => {
        createCompany(formData).then(() => {
            notification.success({message: 'Company created successfully!'});
        }).catch(() => {
            notification.error({message: 'Failed to create company.'});
        });
    };

    return (
        <AdminLayout>
            <h2>Create Company</h2>
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Name" required>
                    <Input name="name" value={formData.name} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Description">
                    <Input name="description" value={formData.description} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Owner Name" required>
                    <Input name="ownerName" value={formData.ownerName} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Owner Email" required>
                    <Input name="ownerEmail" value={formData.ownerEmail} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Owner Phone" required>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange}/>
                </Form.Item>
                <Button type="primary" htmlType="submit">Create Company</Button>
            </Form>
        </AdminLayout>
    );
};

export default CreateCompanyPage;