import News from "../../components/section/News";
import Footer from "../../components/footer/Footer.js";
import PopularRoutes from "../../components/section/PopularRoutes"
import Navigation from "../../components/navigation/Nav";
import React from 'react'
import logo from "../../assets/header-background.jpg";
import SearchBar from "../../components/searchRoute/SearchBar";
import './HomePage.scss';
const HomePage = () => {
    return (
        <>
            <Navigation />
            <div className="home-header-img">
                <div className="home-header-search-bar">
                    <SearchBar />
                </div>
            </div>
            <PopularRoutes />
            <News />
            <Footer />

        </>
    );
}
export default HomePage;