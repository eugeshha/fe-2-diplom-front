// import React from "react";
// import "./Footer.css";
//
// const SubscriptionSection = () => {
//     return (
//         <div className="footer__subscription">
//             <h3 className="footer__section-title">Подписка</h3>
//             <p className="footer__subscription__description">Будьте в курсе событий</p>
//             <div className="footer__subscription__form">
//                 <input type="email" placeholder="email" />
//                 <button>Отправить</button>
//             </div>
//
//             <h3 className="footer__section-title">Подписывайтесь на нас</h3>
//             <div className="socials">
//                 <img src="/img/youtube.png" alt="YouTube" className="social" />
//                 <img src="/img/linkedin.png" alt="LinkedIn" className="social" />
//                 <img src="/img/google.png" alt="Google" className="social" />
//                 <img src="/img/facebook.png" alt="Facebook" className="social" />
//                 <img src="/img/twitter.png" alt="Twitter" className="social" />
//             </div>
//         </div>
//     );
// };
//
// export default SubscriptionSection;
import React, { useState } from "react";
import { fetchSubscribe } from "../../../api/fetchSubscribe"; // путь подправь, если отличается
import "./Footer.css";

const SubscriptionSection = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null); // null | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await fetchSubscribe(email);

        if (result?.status === true) {
            setStatus("success");
        } else {
            setStatus("error");
        }

        setEmail("");
        setTimeout(() => setStatus(null), 3000);
    };

    return (
        <div className="footer__subscription">
            <h3 className="footer__section-title">Подписка</h3>
            <p className="footer__subscription__description">Будьте в курсе событий</p>
            <form className="footer__subscription__form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder={status === "success" ? "Спасибо! Вы подписаны." : "email"}
                    value={status === "success" ? "" : email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={status === "success"}
                    className={`footer__subscription__input ${status === "success" ? "success" : ""}`}
                    required
                />
                <button type="submit">Отправить</button>
            </form>

            {status === "error" && (
                <p className="footer__subscription__error">Ошибка при отправке. Попробуйте позже.</p>
            )}

            <h3 className="footer__section-title">Подписывайтесь на нас</h3>
            <div className="socials">
                <img src={`${process.env.PUBLIC_URL}/img/youtube.png`} alt="YouTube" className="social" />
                <img src={`${process.env.PUBLIC_URL}/img/linkedin.png`} alt="LinkedIn" className="social" />
                <img src={`${process.env.PUBLIC_URL}/img/google.png`} alt="Google" className="social" />
                <img src={`${process.env.PUBLIC_URL}/img/facebook.png`} alt="Facebook" className="social" />
                <img src={`${process.env.PUBLIC_URL}/img/twitter.png`} alt="Twitter" className="social" />
            </div>
        </div>
    );

};

export default SubscriptionSection;
