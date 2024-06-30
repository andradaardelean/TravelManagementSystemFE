import { Company } from "../Company";

export interface AddRequestArgs {
    type: string;
    company: Company,
    status: string;
    requestDetails: string;
}