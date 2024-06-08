export interface Route {
    id: number;
    startDateTime: string;
    endDateTime: string;

    startLocation: string;

    endLocation: string;

    pricePerSeat: number;

    availableSeats: number;

    totalSeats: number;
}