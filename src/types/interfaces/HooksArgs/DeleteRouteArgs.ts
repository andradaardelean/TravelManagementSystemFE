import {Route} from "../Route";

export interface DeleteRouteArgs {
    routesDTO: Route,
    removeAllRecursive: boolean;
}