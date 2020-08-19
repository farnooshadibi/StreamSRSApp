import React, { Component } from 'react'
import axios from 'axios';
import VideoList from './VideoList';
import ProgramList from './ProgramList';
import Slider from "react-slick";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            shrines:[],
            searchField: ''
        }
    }

    componentDidMount() {
        axios.get('/api/customer')
            .then(response => {
                const { data } = response.data;
                this.setState({
                    customers: data
                })

            })
            .catch((error) => console.log(error))

        axios.get('/api/shrine')
            .then(response => {
                const { data } = response.data;
                this.setState({
                    shrines: data
                })

            })
            .catch((error) => console.log(error))

    }



    render() {
        const { customers, searchField, shrines } = this.state;
        let min = 0
        customers.length>shrines.length ? min=shrines.length : min= customers.length
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
       
        const filteredCustomers = customers.filter(customer => {
            return customer.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return (
            <div>
                <div className="cover">
                    <p className="heroquote"> به سایت سوگواران<br/> خوش آمدید</p>
                </div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>هیئت های معروف</h3>
                    <div className="underline"></div>
                <Slider {...settings}>
                        {filteredCustomers.map((customer, index) => <VideoList key={index} customer={customer} mode="video-detail" />)}
                    </Slider>
                </div>
                <div className="upstar">
                    <img src='./starTop.png' />
                </div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>حرم های مطهر</h3>
                    <div className="underline"></div>
                    <Slider {...settings}>
                        {shrines.map((shrine, index) => <VideoList key={index} customer={shrine} mode="shrine-detail" />)}
                    </Slider>
                </div>
                <div className="downStar">
                    <img src='./starTop.png' />
                </div>

                <div className="bgBarname">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>حرم های مطهر</h3>
                    <div className="underline"></div>
                    <div className="row">
                        {shrines.map((shrine, index) => <ProgramList key={index} customer={shrine} mode="shrine-detail" />)}
                    </div>
                </div>
            </div>

        )
    }
} 