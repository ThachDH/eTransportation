import React, { Component } from "react";
import Slider from "react-slick";
import './SliderImg.scss'

export default class SliderImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        return (
            <div>
                <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                >
                    <div>
                        <img style={{ width: '450px', height: '250px' }} src='//static.vexere.com/production/images/1559637550202.jpeg'></img>
                    </div>
                    <div>
                        <img style={{ width: '450px', height: '250px' }} src='////static.vexere.com/c/i/12766/xe-hai-au-VeXeRe-dWNz2xW-1000x600.jpeg'></img>
                    </div>
                    <div>
                        <img style={{ width: '450px', height: '250px' }} src='//static.vexere.com/production/images/1660614512334.jpeg'></img>
                    </div>

                </Slider>
                <Slider
                    asNavFor={this.state.nav1}
                    ref={slider => (this.slider2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className='chitietve'
                >
                    <img src='//static.vexere.com/production/images/1559637550202.jpeg'></img>
                    <img src='////static.vexere.com/c/i/12766/xe-hai-au-VeXeRe-dWNz2xW-1000x600.jpeg'></img>
                    <img src='//static.vexere.com/production/images/1660614512334.jpeg'></img>
                </Slider >


            </div >
        );
    }
}