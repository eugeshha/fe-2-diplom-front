export async function fetchSubscribe(email) {
    try {
        const response = await fetch(
            `https://students.netoservices.ru/fe-diplom/subscribe?email=${encodeURIComponent(email)}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: '',
            }
        );
        return await response.json();
    } catch (error) {
        console.error("Ошибка при подписке:", error);
        return { status: false };
    }
}
