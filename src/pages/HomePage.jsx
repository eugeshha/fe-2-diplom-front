import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AboutUs from '../components/info/AboutUs';
import HowItWorks from '../components/info/HowItWorks';
import Reviews from '../components/info/reviews/Reviews';

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.anchor) {
            const element = document.getElementById(location.state.anchor);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            <AboutUs />
            <HowItWorks />
            <Reviews />
        </>
    );
};

export default HomePage;
