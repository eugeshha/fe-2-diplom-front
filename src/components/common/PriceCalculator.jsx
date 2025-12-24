import {PassengerType} from "./PassengerType";
import {CoachInfo, CoachTypes} from "./CoachConsts";
import {ExtraServices} from "./ExtraServices";

export function GetSeatPrice(seat) {
    if (!seat || !seat.coach) return 0;
    const {coach, seat_number, passenger_type, extra_services } = seat;
    const childrenDiscount = 0.6;
    var price = 0;

    const isLux = coach.class_type === CoachTypes.Lux;
    const isKupe = coach.class_type === CoachTypes.Kupe;
    const isPlatz = coach.class_type === CoachTypes.Platzkart;
    const isSeat = coach.class_type === CoachTypes.Seat;

    if (isLux) {
        price = coach.price;
    } else if (isKupe) {
        price = seat_number % 2 === 0 ? coach.top_price : coach.bottom_price;
    } else if (isPlatz) {
        price = seat_number <= CoachInfo.RegularSeatsInPlatzkart ?
            seat_number % 2 === 0 ? coach.top_price : coach.bottom_price:
            coach.side_price;
    } else if (isSeat) {
        price = coach.top_price; // This is a bug on the backend. For the 'fourth' class only top_price and bottom_price are non-zero.
    } else {
        throw new Error("Unknown coach type: " + coach.class_type);
    }

    if (passenger_type === PassengerType.Child)
        price *= childrenDiscount;

    if (!coach.is_linens_included && extra_services.includes(ExtraServices.Linens))
        price += coach.linens_price;

    if (coach.have_wifi && extra_services.includes(ExtraServices.Wifi))
        price += coach.wifi_price;

    return price;
}
