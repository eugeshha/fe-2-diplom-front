const BASE_URL = 'https://students.netoservices.ru/fe-diplom';

export class CityApi {
    static async fetchCities(name) {
        const response = await fetch(`${BASE_URL}/routes/cities?name=${name}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке городов');
        }
        return await response.json();
    }
}

export class TicketApi {
    static async fetchLastTickets() {
        const response = await fetch(`${BASE_URL}/routes/last`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке билетов');
        }
        return await response.json();
    }

    static async getRoutes(params) {
        const query = new URLSearchParams(params).toString();
        const url = `https://students.netoservices.ru/fe-diplom/routes?${query}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке маршрутов');
        }

        const data = await response.json();
        return data;
    }
}