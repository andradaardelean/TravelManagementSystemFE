export interface User {
    username: string;
    name: string;

    userType: string;
    phone?: string;
    email?: string;
    company?: string;

    tags?: string[];
}
