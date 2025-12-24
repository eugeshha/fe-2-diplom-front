import React from "react";
import Review from "./Review";
import "./Reviews.css";

const reviews = [
    {
        id: 1,
        name: "Екатерина Вальнова",
        text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.",
        image: "photo1.png"
    },
    {
        id: 2,
        name: "Евгений Стрыкало",
        text: "СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.",
        image: "photo2.png"
    }
];

const Reviews = () => {
    return (
        <section className="section-feedback" id="reviews">
            <div className="feedback-container">
                <h2 className="feedback-title">Отзывы</h2>
                <div className="feedback-content">
                    {reviews.map((review) => (
                        <Review
                            key={review.id}
                            image={review.image}
                            name={review.name}
                            text={review.text}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
