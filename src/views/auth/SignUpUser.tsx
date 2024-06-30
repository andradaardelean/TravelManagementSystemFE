import {Button, Form, Input, message, notification} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/auth.hooks";
import { UserRoles } from "../../types/constants";

const SignUpUser = () => {
    const { mutate: signUpMutation } = useSignup();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        phone: "",
        userType: UserRoles.CLIENT,
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if(!formData.username || !formData.password || !formData.email || !formData.name || !formData.phone){
            message.error('Please fill all fields');
            return;
        }
        signUpMutation(formData).then(() => {
            message.success('User created successfully!' );
            navigate('/');
        }).catch(() => {
           console.log('error')
        })
    };

    return (
        <div className="signup-pic">
            <div className="form-container">
                <Form onFinish={handleSubmit} layout="vertical">
                    <h1 style={{textAlign:"center"}}>Create new account</h1>
                    <Form.Item label="Name" required>
                        <Input name="name" value={formData.name} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Username">
                        <Input name="username" value={formData.username} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Password" required>
                        <Input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Email" required>
                        <Input name="email" value={formData.email} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Phone Number" required>
                        <Input name="phone" value={formData.phone} onChange={handleInputChange} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block shape={'round'} style={{marginTop: 20}}>Sign up</Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUpUser;