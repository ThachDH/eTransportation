import { Grid } from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";

const img = [
    { id: '1', src: '//static.vexere.com/production/images/1668592080683.jpeg' },
    { id: '2', src: '//static.vexere.com/production/images/1668592081646.jpeg' },
    { id: '3', src: '//static.vexere.com/production/images/1668592083763.jpeg' },
    { id: '4', src: '//static.vexere.com/production/images/1668592084685.jpeg' },
    { id: '5', src: '//static.vexere.com/production/images/1668592085592.jpeg' },
    { id: '6', src: '//static.vexere.com/production/images/1668592086110.jpeg' },
];

export default class AsNavFor extends Component {
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
            <>
                <Slider
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                >
                    {img.map((img) => {
                        return (
                            <>
                                <img style={{ width: '100%', height: '380px' }} src={img.src} alt='' />

                            </>
                        )

                    })}

                </Slider>
                <p></p>
                <Slider
                    asNavFor={this.state.nav1}
                    ref={slider => (this.slider2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                >
                    {img.map((img) => {
                        return (
                            <>
                                <img style={{ height: '80px', width: '90%', margin: 'auto' }} src={img.src} alt='' />
                            </>
                        )

                    })}
                </Slider>
            </>
        );
    }
}