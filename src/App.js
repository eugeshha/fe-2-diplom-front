import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import WagonSelection from './pages/WagonSelection';
import PassengerDetails from './pages/PassengerDetails';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import SuccessOrder from './pages/SuccessOrder';
import Header from './components/common/Header';
import Footer from './components/common/Footer/Footer';
import ProgressBar from './components/common/ProgressBar';
import LoadingBar from "./components/common/LoadingBar/LoadingBar";
import {useSelector} from "react-redux";


const AppContent = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const isMainPage = pathname === '/';
    const isSuccessPage = pathname === '/success';
    const isLoading = useSelector((state) => state.loading.isLoading)


    const getStep = () => {
        if (pathname.startsWith('/confirmation')) return 4;
        if (pathname.startsWith('/payment')) return 3;
        if (pathname.startsWith('/passenger-details')) return 2;
        if (pathname.startsWith('/wagon-selection') || pathname.startsWith('/search')) return 1;
        return null;
    };

    const currentStep = getStep();

    return (
        <div className="flex flex-col min-h-screen">
            <Header isMainPage={isMainPage} isSuccessPage={isSuccessPage} />
            {isLoading &&(
            <LoadingBar></LoadingBar>)}

            {!isMainPage && !isSuccessPage && currentStep && (
                <ProgressBar step={currentStep} />
            )}

            {/*{showNavigationSteps && <NavigationSteps />}*/}

            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/wagon-selection" element={<WagonSelection />} />
                    <Route path="/passenger-details" element={<PassengerDetails />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/success" element={<SuccessOrder />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
};

const App = () => (
    <Router basename="/fe-2-diplom">
      <AppContent />
    </Router>
);

export default App;
