export const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        ...(localStorage.getItem("token") && {Authorization: `Bearer ${localStorage.getItem("token")}`}),
        'Access-Control-Allow-Origin': '*',
    };
}
