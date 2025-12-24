import React from "react";
import "./Footer.css";
import { useNavigate } from 'react-router-dom'

const FooterBottom = () => {
    const navigate = useNavigate()
    return (
        <div className="footer__bottom">
            <div className="footer__logo" onClick={() => {
                navigate('/');
                window.scrollTo({top: 0, behavior: 'smooth'});
            }}>Лого</div>
            <div className="footer__arrow"
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            ></div>
            <div className="footer__year">© 2018</div>
        </div>
    );
};

export default FooterBottom;