/*
public class LinkDTO {
    RouteDTO routeDTO;
    StopsDTO fromStop;
    StopsDTO toStop;
    String distance;
    String duration;
    Double price;
    int order;

}

 */

import {Route} from "./Route";
import {Stop} from "./Stop";

export interface Link {
    routeDTO: Route;
    fromStop: Stop;
    toStop: Stop;
    distance: string;
    duration: string;
    price: number;
    order: number;
}