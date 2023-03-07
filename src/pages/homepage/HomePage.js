import News from "../../components/section/News";
import Footer from "../../components/footer/Footer.js";
import PopularRoutes from "../../components/section/PopularRoutes"
import Navigation from "../../components/navigation/Nav";
import React from 'react'
import logo from "../../assets/header-background.jpg";
import SearchBar from "../../components/searchRoute/SearchBar";
import './HomePage.scss';
import { useContext } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate, NavLink } from 'react-router-dom';
import Login from "../login";

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <>
            {/* <Button
        onClick={()=>navigate(`/ticketdetails`)
    }
        >Thach</Button> */}

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