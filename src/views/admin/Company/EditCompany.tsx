import {useEffect, useState} from "react";
import {Company} from "../../../types/interfaces/Company";
import {Button, Form, Input, notification} from "antd";
import {useParams} from "react-router-dom";
import {useCompany, useEditCompany} from "../../../hooks/company.hooks";
import AdminLayout from "../../../components/layouts/AdminLayout";

const EditCompanyPage = () => {
    const {id} = useParams();
    const {data: companyData} = useCompany(id ?? '');
    const [formData, setFormData] = useState({
            name: companyData?.name ?? '',
            description: companyData?.description ?? '',
            ownerName: companyData?.ownerName ?? '',
            ownerEmail: companyData?.ownerEmail ?? '',
        } as Company
    );

    useEffect(() => {
        setFormData({
            id: companyData?.id ?? '',
            name: companyData?.name ?? '',
            description: companyData?.description ?? '',
            ownerName: companyData?.ownerName ?? '',
            ownerEmail: companyData?.ownerEmail ?? '',
        });
    }, [companyData]);

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const {mutate: editCompany} = useEditCompany();

    const handleSubmit = async () => {
        editCompany(formData).then(() => {
            notification.success({message: 'Company updated successfully!'});
        }).catch(() => {
            notification.error({message: 'Failed to update company.'});
        })
    };

    return (
        <AdminLayout>
            <h2>Edit Company</h2>
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
                <Button type="primary" htmlType="submit">Update Company</Button>
            </Form>
        </AdminLayout>
    );
};

export default EditCompanyPage;