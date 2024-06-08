import {Avatar, List, Skeleton} from "antd";

interface Props {
    status: string,
}

const ActiveRequests = ({status}: Props) => {
    //TODO: get active tickets from API
    const data = [
        {
            title: '24-03-2024 18:00',
        },
        {
            title: '24-03-2024 18:00',
        },
        {
            title: '24-03-2024 18:00',
        },
        {
            title: '24-03-2024 18:00',
        },
    ]
    return (
        <>
            <List
                pagination={{position: "bottom", align: "center"}}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">View Timeline</a>,
                            <a style={{color: "red"}} key="list-loadmore-more">Cancel</a>]}>
                        <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                                title={item.title}
                                description="Cluj-Napoca to Satu Mare"/>

                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    )
}

export default ActiveRequests;