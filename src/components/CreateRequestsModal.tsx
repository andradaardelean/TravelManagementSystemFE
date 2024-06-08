import {Button, Form, Input, message, Modal} from "antd";
import {useCreateRequest} from "../hooks/requests.hooks";
import TextArea from "antd/es/input/TextArea";

interface CreateRequestsModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const CreateRequestsModal = ({isModalOpen, setIsModalOpen}: CreateRequestsModalProps) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();

    const {mutate: createRequest} = useCreateRequest();

    const onFinish = (values: any) => {
        createRequest({
            type: "COMPANY_APPLICATION",
            company: {
                id: 0,
                name: values.name,
                ownerEmail: values.ownerEmail,
                ownerName: values.ownerEmail,
                phone: values.phone,
                description: values.description,
            }
        }).finally(() => {
            setIsModalOpen(false);
            message.success("Request sent successfully");
        });
    };


    return (
        <>
            <Modal title="Make a Request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   footer={[null, null]}>
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{maxWidth: 500}}

                >
                    <Form.Item name="name" label='Name'>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="ownerName" label="Owner Name">
                        <Input/>
                    </Form.Item>

                    <Form.Item name="ownerEmail" label="Owner Email">
                        <Input/>
                    </Form.Item>

                    <Form.Item name="phone" label="Phone">
                        <Input/>
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <TextArea rows={3}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Send request
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default CreateRequestsModal;