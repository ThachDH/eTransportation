import React, { Component } from 'react'
import './PopolarRoutes.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import popularRoute1 from "../../assets/news1.jpg";
import popularRoute2 from "../../assets/news2.jpg";
import popularRoute3 from "../../assets/news3.jpg";
import popularRoute4 from "../../assets/news4.jpg";
import popularRoute5 from "../../assets/xe5.jpg";
import popularRoute6 from "../../assets/xe6.jpg";
class News extends Component {
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
                            Tin tức
                        </h2>

                    </div>
                    <div className='routes-body'>

                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={popularRoute1} alt='' />
                                <div style={{ color: 'black' }}><a style={{ color: 'black', textDecorationLine: 'none' }} href='https://www.youtube.com/watch?v=rNpBzrs5xv0' target="blank">[Phóng sự HTV9] Công cuộc cách mạng hoá ngành vận tải hành khách</a></div>
                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute2} alt='' />
                                <div style={{ color: 'black' }}><a style={{ color: 'black', textDecorationLine: 'none' }} href='https://www.youtube.com/watch?v=hMP3xv_w7ns&t=3s&ab_channel=VeXeReOfficial' target="blank">[PHÓNG SỰ VTV9] Mua vé trực tuyến thời 4.0</a></div>

                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute3} alt='' />
                                <div style={{ color: 'black' }}><a style={{ color: 'black', textDecorationLine: 'none' }} href='https://thanhnien.vn/hang-hang-khong-5-sao-mat-dat-dau-tien-tai-tay-ninh-1851268980.htm' target="blank">Hãng ‘Hàng không 5 sao mặt đất’ đầu tiên</a></div>

                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute4} alt='' />
                                <div style={{ color: 'black' }}><a style={{ color: 'black', textDecorationLine: 'none' }} href='https://tuoitre.vn/ve-que-don-tet-tren-chuyen-xe-hanh-phuc-20221215230433438.htm' target="blank">Về quê đón Tết trên 'Chuyến xe hạnh phúc'</a></div>

                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute5} alt='' />
                                <div style={{ color: 'black' }}><a style={{ color: 'black', textDecorationLine: 'none' }} href='https://www.youtube.com/watch?v=rNpBzrs5xv0' target="blank">[Phóng sự HTV9] Công cuộc cách mạng hoá ngành vận tải hành khách</a></div>

                            </div>
                            <div className='img-customize'>
                                <img src={popularRoute6} alt='' />
                                <div style={{ color: 'black' }}><a style={{ color: 'black', textDecorationLine: 'none' }} href='https://www.youtube.com/watch?v=rNpBzrs5xv0' target="blank">[Phóng sự HTV9] Công cuộc cách mạng hoá ngành vận tải hành khách</a></div>

                            </div>

                        </Slider>
                    </div>

                </div >

            </div >
        )
    }
}
export default News;