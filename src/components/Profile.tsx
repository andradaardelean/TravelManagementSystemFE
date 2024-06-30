import React from 'react';
import { useAuth } from "../context/AuthContext";
import { UserRoles } from "../types/constants";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import CompanyLayout from "./layouts/CompanyLayout";
import { useBookingsByUser } from "../hooks/booking.hooks";
import { Avatar, List, Card, Skeleton, Row, Col, Typography, Divider, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
    const { user } = useAuth();

    const mockProfileDetails = {
        email: "user@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        company: "Example Corp",
        adminNote: "Administrator access granted since 2021."
    };

    const renderAdminProfile = () => (
        <AdminLayout>
            <div style={{padding: 50}}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Avatar size={100} icon={<UserOutlined />} />
                        <Title level={3}>{user?.username}</Title>
                    </Col>
                </Row>
                <Divider />
                    <Col span={16}>
                        <Text strong>Role: </Text>{user?.userType}<br />
                        <Text strong>Name: </Text>{user?.name}<br/>
                        <Text strong>Email: </Text>{user?.email}<br/>
                        <Text strong>Phone: </Text>{user?.phone ?? "N/A"}<br/>
                        <Divider/>
                        <Text>{mockProfileDetails?.adminNote}</Text>
                    </Col>
            </div>
        </AdminLayout>
);

const renderCompanyProfile = () => (
        <CompanyLayout>
            <div style={{padding: 50}}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Avatar size={100} icon={<UserOutlined />} />
                        <Title level={3}>{user?.username}</Title>
                    </Col>

                </Row>
                <Divider />
                    <Col span={16}>
                        <Text strong>Role: </Text>{user?.userType}<br />
                        <Text strong>Name: </Text>{user?.name}<br/>
                        <Text strong>Email: </Text>{user?.email}<br/>
                        <Text strong>Phone: </Text>{user?.phone ?? "N/A"}<br/>
                        <Text strong>Company: </Text>{user?.company ?? "N/A"}<br/>
                    </Col>
            </div>
        </CompanyLayout>
);

const renderUserProfile = () => (
        <UserLayout>
            <div style={{padding: 50}}>
            <Row gutter={16}>
                <Col span={8}>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Title level={3}>{user?.username}</Title>
                </Col>
            </Row>
            <Divider />
            <Text strong>Role: </Text>{user?.userType}<br />
                <Text strong>Name: </Text>{user?.name}<br/>
                <Text strong>Email: </Text>{user?.email}<br/>
                <Text strong>Phone: </Text>{user?.phone ?? "N/A"}<br/>
            </div>
        </UserLayout>
    );

    if (user?.userType === UserRoles.ADMIN) {
        return renderAdminProfile();
    } else if (user?.userType === UserRoles.COMPANYEMPLOYEE) {
        return renderCompanyProfile();
    } else {
        return renderUserProfile();
    }
}

export default Profile;