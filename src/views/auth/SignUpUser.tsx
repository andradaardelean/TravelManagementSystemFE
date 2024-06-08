import {Button, Form, Input, notification} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSignup} from "../../hooks/auth.hooks";
import {UserRoles} from "../../types/constants";

const SignUpUser = () => {
    const {mutate: signUpMutation} = useSignup();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        phone: "",
        userType: UserRoles.CLIENT,
    });

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const navigate = useNavigate();
    const handleSubmit = async () => {
        signUpMutation(formData).then(() => {
            notification.success({message: 'User created successfully!'});
            navigate('/');
        }).catch(() => {
            notification.error({message: 'Failed to create user.'});
        })
    };

    return (
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
            display: "flex",
        }}>
            <Form onFinish={handleSubmit} layout="vertical"
                  style={{maxWidth: 800}}>
                <Form.Item label="Name" required>
                    <Input name="name" value={formData.name} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Username">
                    <Input name="username" value={formData.username} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Password" required>
                    <Input type={"password"} name="password" value={formData.password} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Email" required>
                    <Input name="email" value={formData.email} onChange={handleInputChange}/>
                </Form.Item>
                <Form.Item label="Phone Number" required>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" block>Sign up</Button>
            </Form>
        </div>
    );
};

export default SignUpUser;
