import React, { Component } from 'react'
import './PopolarRoutes.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import popularRoute1 from "../../assets/xe1.jpg";
import popularRoute2 from "../../assets/xe2.jpg";
import popularRoute3 from "../../assets/xe3.jpg";
import popularRoute4 from "../../assets/xe4.jpg";
import popularRoute5 from "../../assets/xe5.jpg";
import popularRoute6 from "../../assets/xe6.jpg";
class PopularRoutes extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };
        return (
            <div className='section-routes'>
                <div className='routes-container'>
                    <div className='routes-header' >
                        <h2 style={{ color: 'black' }}>
                            Tuyến đường phổ biến
                        </h2>

                    </div>
                    <div className='routes-body'>


                        <Slider {...settings} >
                            <div className='img-customize'>
                                <img src={popularRoute1} alt='' />
                                <div style={{ color: 'black' }}>Sài Gòn - Vũng Tàu</div>
                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute2} alt='' />
                                <div style={{ color: 'black' }}>Hà Nội - Hải Phòng</div>
                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute3} alt='' />
                                <div style={{ color: 'black' }}>Sài Gòn - Nha Trang</div>
                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute4} alt='' />
                                <div style={{ color: 'black' }}>Sài Gòn - Đà Nẵng</div>
                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute5} alt='' />
                                <div style={{ color: 'black' }}>Hà Nội - Vịnh Hạ Long</div>
                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute6} alt='' />
                                <div style={{ color: 'black' }}>Sài Gòn - Phan Rang</div>
                            </div>

                        </Slider>
                    </div>

                </div>

            </div>
        )
    }
}
export default PopularRoutes;