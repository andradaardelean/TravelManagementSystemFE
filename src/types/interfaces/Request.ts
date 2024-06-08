export interface Request {
    id: number,
    createdAt: string,
    type: string,
    requestDetails: string,
    status: string,
    company?: any
}