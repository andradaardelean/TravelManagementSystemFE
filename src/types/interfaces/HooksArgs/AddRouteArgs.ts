import {Stop} from "../Stop";
import {Reccurence} from "../Reccurence";
import {Route} from "../Route";

export interface AddRouteArgs {
    routesDTO: Route,
    stopsDTOList: Stop[]
    recurrenceDTO: Reccurence
}