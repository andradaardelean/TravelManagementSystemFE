import {Button, List, message, Modal} from "antd";
import {useGetAllRequests, useRejectRequest, useSolverRequest} from "../../../hooks/requests.hooks";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Request} from "../../../types/interfaces/Request";


const PendingRequestsTab: React.FC = () => {
    const {data: requests, isLoading, isFetching, refetch} = useGetAllRequests('PENDING');

    const {mutate: solveRequest} = useSolverRequest();

    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal title={`Request ${selectedRequest?.id}`}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[null, null]} centered>
                <span style={{fontWeight: 'bold'}}>Company:</span> {`${selectedRequest?.company?.name} | ${selectedRequest?.company?.description} | ${selectedRequest?.company?.ownerName} | ${selectedRequest?.company?.ownerEmail} | ${selectedRequest?.company?.phone}`}
                <br/>
                <span style={{fontWeight: 'bold'}}>Type:</span> {selectedRequest?.type}
            </Modal>
            <List
                loading={isLoading || isFetching}
                itemLayout="horizontal"
                dataSource={requests}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Button key="list-loadmore-edit"
                                          onClick={() => {setSelectedRequest(item);
                                              showModal()}
                        }>View Details
                        </Button>,
                            <Button onClick={() => solveRequest({
                                id: item.id,
                                type: item.type,
                                company: item.company,
                                status: "APPROVED"
                            }).then(() => {
                                message.success("Request solved successfully!");
                                refetch();
                            })}>Solve</Button>,
                            <Button danger key="list-loadmore-more" onClick={() => solveRequest({
                                id: item.id,
                                type: item.type,
                                company: item.company,
                                status: "REJECTED"
                            }).then(() => {
                                message.success("Request rejected successfully!");
                                refetch();
                            })}>Reject</Button>]
                        }
                    >
                        <List.Item.Meta
                            title={`${item.id} - ${item.type}`}
                            description={`${item?.company?.name} | ${item?.company?.description} | ${item?.company?.ownerName} | ${item?.company?.ownerEmail} | ${item?.company?.phone}`}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default PendingRequestsTab;
