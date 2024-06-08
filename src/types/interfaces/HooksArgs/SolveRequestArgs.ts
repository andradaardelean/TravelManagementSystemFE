import {Company} from "../Company";

export interface SolveRequestArgs {
    id: number;
    type: string;
    company: Company
}