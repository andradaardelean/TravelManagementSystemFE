import React from "react";
import {Button, Form, Input, message} from "antd";
import {useRequestPasswordReset} from "../../hooks/auth.hooks";
import {useNavigate} from "react-router-dom";

type FieldType = {
    username?: string;
    email?: string;
};

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const {mutate: requestPasswordReset} = useRequestPasswordReset();
    const onFinish = (values: any) => {
        if (values.username && values.email) {
            requestPasswordReset({username: values.username, email: values.email}).then(() => {
                message.success("Password reset request sent. Please check your email!");
                navigate("/login");
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            width: "198vh",
            height: "99vh",
            display: "flex",
        }}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: "Please input your username!"}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{required: true, message: "Please input your email!"}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Request Password Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ForgotPassword;
