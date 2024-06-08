/*
public class AddBookingDTO {
    BookingDTO booking;
    List<LinkDTO> links;
}

 */
import {Booking} from "../Booking";
import {Link} from "../Link";

export interface AddBookingArgs {
    booking: Booking;
    links: Link[];
}