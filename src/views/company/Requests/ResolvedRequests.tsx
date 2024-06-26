import {Avatar, List} from "antd";

interface Props {
    status: string,
}

const ResolvedRequests = ({status}: Props) => {
    //TODO: get active tickets from API
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ]
    return (
        <>
            <List
                pagination={{position: "bottom", align: "center"}}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"/>
                    </List.Item>
                )}
            />
        </>
    )
};

export default ResolvedRequests;