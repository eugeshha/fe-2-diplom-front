// import React from 'react';
// import SchemeKupe from './SchemeKupe';
// import SchemePlatzkart from './SchemePlatzkart';
// import SchemeSitting from './SchemeSitting';
// import SchemeLux from './SchemeLux';
//
// const schemeComponents = {
//     second: SchemeKupe,
//     third: SchemePlatzkart,
//     fourth: SchemeSitting,
//     first: SchemeLux,
// };
//
// export default function WagonScheme({
//                                         type,
//                                         item,
//                                         selectedSeats,
//                                         onSeatClick,
//                                         passengerType,
//                                     }) {
//     if (!item?.coach || !item?.seats) {
//         return <p>Нет данных для отображения схемы</p>;
//     }
//
//     const SchemeComponent = schemeComponents[type];
//
//     if (!SchemeComponent) {
//         return <p>Схема не найдена для типа вагона: {type}</p>;
//     }
//
//     const activeSeats = selectedSeats
//         .filter((seat) => seat.passengerType === passengerType)
//         .map((seat) => seat.seatNumber);
//
//     return (
//         <SchemeComponent
//             coach={item.coach}
//             seats={item.seats}
//             selectedSeats={activeSeats}
//             onSeatClick={(seat) =>
//                 onSeatClick({
//                     seat,
//                     coachId: item.coach._id,
//                     price: seat.top || seat.bottom || seat.price, // гибкий выбор цены
//                     passengerType,
//                 })
//             }
//         />
//     );
// }
