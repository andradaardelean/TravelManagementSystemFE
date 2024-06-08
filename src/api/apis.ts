import API from './axiosWrapper'
import {BookingArgs} from "../types/interfaces/HooksArgs/BookingArgs";
import {Route} from "../types/interfaces/Route";
import {User} from "../types/interfaces/User";
import {Company} from "../types/interfaces/Company";
import {SearchRouteArgs} from "../types/interfaces/HooksArgs/SearchRouteArgs";
import {AddRouteArgs} from "../types/interfaces/HooksArgs/AddRouteArgs";
import {AddCompanyArgs} from "../types/interfaces/HooksArgs/AddCompanyArgs";
import {SearchResult} from "../types/interfaces/SeachResults";
import {AddBookingArgs} from "../types/interfaces/HooksArgs/AddBookingArgs";
import {RequestResetPassword} from "../types/interfaces/HooksArgs/RequestResetPassword";
import {ChangePassword} from "../types/interfaces/HooksArgs/ChangePassword";
import {AddRequestArgs} from "../types/interfaces/HooksArgs/AddRequestArgs";
import {Request} from "../types/interfaces/Request";
import {SignUpArgs} from "../types/interfaces/HooksArgs/SignUpArgs";
import {SolveRequestArgs} from "../types/interfaces/HooksArgs/SolveRequestArgs";


// AUTH
export const login = async () => {
    const ENDPOINT = '/user/login';
    const res = await API.post(ENDPOINT);
    return res.data;
}

export const signup = async (args: SignUpArgs) => {
    const ENDPOINT = '/user/signup'
    const data = {
        ...args
    }
    console.log(`data`, data)
    const res = await API.post(ENDPOINT, data);
    return res.data;
}

export const logout = async () => {
    const ENDPOINT = '/user/logout';
    const res = await API.post(ENDPOINT);
    return res.data;
}

export const requestPasswordReset = async (requestPasswordReset: RequestResetPassword) => {
    const ENDPOINT = '/user/forgotPassword';
    const res = await API.put(ENDPOINT, {
        ...requestPasswordReset
    });
    return res.data;
}

export const changeUserPassword = async (changePassword: ChangePassword) => {
    const ENDPOINT = '/user/changePassword';
    const res = await API.put(ENDPOINT, {
        ...changePassword
    });
    return res.data;
}

// ROUTES

export const addRoute = async (route: AddRouteArgs) => {
    const ENDPOINT = '/routes';
    const res = await API.post(ENDPOINT, route);
    return res.data;
}

export const deleteRoute = async (routeId: string) => {
    const ENDPOINT = `/routes/${routeId}`;
    const res = await API.delete(ENDPOINT);
    return res.data;
}

export const editRoute = async (route: Route) => {
    const ENDPOINT = `/routes`;
    const res = await API.put(ENDPOINT, route);
    return res.data;
}

export const getRoutes = async (args: SearchRouteArgs): Promise<SearchResult[]> => {
    const params = args;
    const res = await API.get("/routes/search", {
        params: {
            search: params.search ?? null,
            startDate: params.startDate ?? null,
            endDate: params.endDate ?? null,
            startLocation: params.startLocation ?? null,
            endLocation: params.endLocation ?? null,
            passengersNo: params.passengersNo ?? null,
            type: params.type ?? null
        },
    });
    return res.data;
}

export const getRoute = async (id: string): Promise<Route> => {
    const ENDPOINT = `/routes/${id}`;
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const getRoutesByCompany = async (company: string) => {
    const ENDPOINT = `/routes/forCompany/${company}`;
    console.log('ENDPOINT', ENDPOINT)
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const getAllRoutes = async (): Promise<Route[]> => {
    const res = await API.get("/routes");
    return res.data;
}

// BOOKINGS

export const getBookingsById = async (args: BookingArgs) => {
    const ENDPOINT = `/bookings/${args.id}`
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const getAllBookings = async () => {
    const ENDPOINT = '/bookings'
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const getBookingsByUsername = async (args: BookingArgs) => {
    const ENDPOINT = `/bookings/byUsername/${args.username}`
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const createBooking = async (createBookingArgs: AddBookingArgs) => {
    const ENDPOINT = '/bookings'
    const res = await API.post(ENDPOINT, createBookingArgs);
    return res?.data;
}

export const getBookingsByCompany = async (company: string) => {
    const ENDPOINT = `/bookings/forCompany/${company}`
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const deleteBooking = async (id: string) => {
    const ENDPOINT = `/bookings/${id}`
    const res = await API.delete(ENDPOINT);
    return res.data;
}

// USERS

export const getUserByUsername = async (username: string) => {
    const ENDPOINT = `/user/${username}`;
    const res = await API.get(ENDPOINT);
    return res.data;

}

export const getUserByToken = async (token: string) => {
    const ENDPOINT = `/user/validateToken/${token}`;
    const res = await API.get(ENDPOINT);
    return res.data;

}

export const getAllUsers = async () => {
    const ENDPOINT = '/user';
    const res = await API.get(ENDPOINT);
    return res.data;

}

export const getUsersByCompany = async (company: string) => {
    const ENDPOINT = `/user/byCompany/${company}`;
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const editUser = async (user: Partial<User>) => {
    const ENDPOINT = '/user';
    const res = await API.put(ENDPOINT, user);
    return res.data;
}

export const addUser = async (user: User) => {
    const ENDPOINT = '/user';
    const res = await API.post(ENDPOINT, user);
    return res.data;
}

export const deleteUser = async (username: string) => {
    const ENDPOINT = `/user/${username}`;
    const res = await API.delete(ENDPOINT);
    return res.data;
}

// COMPANIES

export const addCompany = async (company: AddCompanyArgs) => {
    const ENDPOINT = '/company/addCompany';
    const res = await API.post(ENDPOINT, company);
    return res.data;
}

export const editCompany = async (company: Company) => {
    const ENDPOINT = '/company';
    const res = await API.put(ENDPOINT, company);
    return res.data;
}

export const getAllCompanies = async () => {
    const ENDPOINT = '/company';
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const deleteCompany = async (companyId: string) => {
    const ENDPOINT = `/company/${companyId}`;
    const res = await API.delete(ENDPOINT);
    return res.data;
}

export const getCompany = async (name: string) => {
    const ENDPOINT = `/company/${name}`;
    const res = await API.get(ENDPOINT);
    return res.data;
}

// STOPS

export const getStops = async () => {
    const ENDPOINT = '/stops';
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const getStop = async (id: string) => {
    const ENDPOINT = `/stops/${id}`;
    const res = await API.get(ENDPOINT);
    return res.data;
}

// REQUESTS

export const createRequest = async (args: AddRequestArgs) => {
    const ENDPOINT = '/requests';
    const res = await API.post(ENDPOINT, args);
    return res.data;
}

export const searchRequests = async (status: string): Promise<Request[]> => {
    const ENDPOINT = `/requests/${status}`;
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const solveRequest = async (args: SolveRequestArgs) => {
    const ENDPOINT = '/requests/solve';
    const res = await API.put(ENDPOINT, args);
    return res.data;
}

// STATISTICS

export const getAdminStatistics = async () => {
    const ENDPOINT = '/statistics/admin';
    const res = await API.get(ENDPOINT);
    return res.data;
}

export const getCompanyStatistics = async (company: string) => {
    const ENDPOINT = '/statistics/company';
    const res = await API.get(`${ENDPOINT}?company=${company}`);
    return res.data;
}