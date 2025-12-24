import React from "react";
import Contacts from "./Contacts";
import FooterBottom from "./FooterBottom";
import "./Footer.css";
import SubscriptionSection from "./SubscriptionSection";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__contacts">
                <div className="contacts__section">
                    <Contacts />
                </div>
                <div className="footer__subscribe">
                    <SubscriptionSection />
                </div>
            </div>
            <div className="footer__footer">
                <FooterBottom />
            </div>
        </footer>
    );
};

export default Footer;
