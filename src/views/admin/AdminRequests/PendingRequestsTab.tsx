import {Button, List, Modal} from "antd";
import {useGetAllRequests, useSolverRequest} from "../../../hooks/requests.hooks";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Request} from "../../../types/interfaces/Request";


const PendingRequestsTab: React.FC = () => {
    const {data: requests, isLoading} = useGetAllRequests('PENDING');
    const navigate = useNavigate();

    const {mutate: solveRequest} = useSolverRequest();

    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

    return (
        <>
            <Modal title={`Request ${selectedRequest?.id}`}>
                Company: {selectedRequest?.company}
                <br/>
                Type: {selectedRequest?.type}
                <br/>
                Details: {selectedRequest?.requestDetails}
                <br/>
            </Modal>
            <List
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={requests}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Button key="list-loadmore-edit"
                                          onClick={() => setSelectedRequest(item)}>View Details
                        </Button>,
                            <Button onClick={() => solveRequest({
                                id: item.id,
                                type: item.type,
                                company: item.company
                            })}>Solve</Button>,
                            <Button danger key="list-loadmore-more">Reject</Button>]
                        }
                    >
                        <List.Item.Meta
                            title={`${item.id} - ${item.type}`}
                            description={item.requestDetails}
                        />
                        <div>STATUS: {item.status ?? "UNKNOWN"}</div>
                    </List.Item>
                )}
            />
        </>
    );
};

export default PendingRequestsTab;
