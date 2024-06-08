import React from "react";
import {Button, Form, Input, message, Result} from "antd";
import {useChangePassword} from "../../hooks/auth.hooks";
import {useNavigate, useParams} from "react-router-dom";
import {useUserByToken} from "../../hooks/user.hooks";

type FieldType = {
    password?: string;
};

const ChangePassword: React.FC = () => {
    const {token} = useParams();
    const {data: user} = useUserByToken(token ?? "");
    const navigate = useNavigate();
    const {mutate: changePassword} = useChangePassword();
    const onFinish = (values: any) => {
        if (values.password && token) {
            changePassword({password: values.password, token}).then(() => {
                message.success("Password changed successfully!");
                navigate("/login");
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    if (!user) {
        return (<Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => navigate('/login')}>Login</Button>}
        />);
    }

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
                    label="New Password"
                    name="password"

                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
