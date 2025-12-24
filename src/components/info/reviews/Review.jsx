import React from "react";
import "./Reviews.css";

const Review = ({ image, name, text }) => {
    return (
        <div className="review-item">
            <img src={`${process.env.PUBLIC_URL}/img/${image}`} alt={name} className="review-item-img" />
            <div className="review-item-content">
                <h3 className="review-item-title">{name}</h3>
                <p className="review-item-text">{text}</p>
            </div>
        </div>
    );
};

export default Review;
