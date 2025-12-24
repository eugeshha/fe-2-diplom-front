import React, { useEffect, useState } from 'react';
import './LastTickets.css';
import LastTicket from './LastTicket';
import { TicketApi } from '../../../api/Api';

export default function LastTickets() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        TicketApi.fetchLastTickets()
            .then(data => setItems(data))
            .catch(err => console.error('Ошибка загрузки билетов:', err));
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="last-tickets">
            <h3 className="last-tickets__title">Последние билеты</h3>
            {items.slice(0, 3).map((item) => (
                <LastTicket ticket={item} key={item.departure._id} />
            ))}
        </div>
    );
}
