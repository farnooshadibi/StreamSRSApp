import React, { Component } from 'react'
import axios from 'axios';
import VideoList from './VideoList';
import ProgramList from './ProgramList';
import Slider from "react-slick";
import { type } from 'jquery';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: {},
            shrines:[],
            searchField: ''
        }
    }

    componentDidMount() {
        axios.get('/api/customer/getfamouscustomer')
            .then(response => {
                console.log("responseeeeeeeee", response);
               
                this.setState({
                    customers: response.data
                })
               

            })
            .catch((error) => console.log(error))

        axios.get('/api/shrine')
            .then(response => {
                console.log("response", response);
                const { data } = response.data;
                this.setState({
                    shrines: data
                })

            })
            .catch((error) => console.log(error))

    }



    render() {
        const { customers, searchField, shrines } = this.state;
        let min = 3
        console.log("customerrrrrrrrrrrrrrr", this.state.customers.data);
        if (typeof this.state.customers === 'undefined' || typeof this.state.customers.data === 'undefined')
            return ('')
        else {
            (this.state.customers.data.length > 3) ? min = 4 : min = this.state.customers.data.length
            let min2 = 3
            shrines.length > 3 ? min2 = 4 : min2 = shrines.length
            var settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: min,
                slidesToScroll: 1,
                initialSlide: 0,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            initialSlide: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            };

            var settings2 = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: min2,
                slidesToScroll: 1,
                initialSlide: 0,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            initialSlide: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            };
        }
        console.log(this.state.customers.data)
        if (typeof this.state.customers.data === 'undefined' || this.state.customers.data === null)
            return ('')
        else
        return (
            <div>
            
            <div className="Container-fluid">
                <div className="cover">
                    <p className="heroquote"> به سایت سوگواران<br/> خوش آمدید.</p>
                </div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>هیئت های معروف</h3>
                    <div className="underline"></div>
                    <Slider {...settings}>
                        {customers.data.map((customer, index) => <VideoList key={index} customer={customer} mode="video-detail" />)}
                    </Slider>
                </div>
                <div className="upstar">
                    <img src='./starTop.png' />
                </div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>حرم های مطهر</h3>
                    <div className="underline"></div>
                    <Slider {...settings2}>
                        {shrines.map((shrine, index) => <VideoList key={index} customer={shrine} mode="shrine-detail" />)}
                    </Slider>
                </div>
                <div className="downStar">
                    <img src='./starTop.png' />
                </div>

                <div className="bgBarname">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>زمان پخش</h3>
                    <div className="underline"></div>
                    <div className="row">
                        {shrines.map((shrine, index) => <ProgramList key={index} customer={shrine} mode="shrine-detail" />)}
                    </div>
                </div>
            </div>
            
            </div>
        )
    }
} 