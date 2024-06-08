/*
public class BookingLinkDTO {
    private int id;
    private BookingDTO booking;
    private StopsDTO fromStop;
    private StopsDTO toStop;
    private String distanceText;
    private String durationText;
    private Double price;
    private String startTime;
    private String endTime;
}

 */

import {Booking} from "./Booking";
import {Stop} from "./Stop";

export interface BookingLink {
    id: number;
    booking: Booking;
    fromStop: Stop;
    toStop: Stop;
    distanceText: string;
    durationText: string;
    price: number;
    startTime: string;
    endTime: string;
}