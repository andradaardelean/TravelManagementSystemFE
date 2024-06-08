/*
public class SearchResultDTO {
    List<LinkDTO> links;
    String totalDistance;
    String totalTime;
    Double totalPrice;
}
 */

import {Link} from "./Link";

export interface SearchResult {
    links: Link[];
    totalDistance: string;
    totalTime: string;
    totalPrice: number;
}