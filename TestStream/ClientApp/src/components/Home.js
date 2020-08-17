import React, { Component } from 'react'
import axios from 'axios';
import VideoList from './VideoList';

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
                console.log("response", response);
                const { data } = response.data;
                this.setState({
                    customers: data
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

    handleSearch = (e) => {
        this.setState({ searchField: e.target.value });
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
        console.log(this.state.customers)
        return (
            <div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>هیئت های معروف</h3>
                    <div className="underline"></div>
                <Slider {...settings}>
                    {filteredCustomers.map((customer, index) =><VideoList key={index} customer={customer} />)}
                    </Slider>
                </div>
                <div className="upstar">
                    <img src='./starTop.png' />
                </div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>حرم های مطهر</h3>
                    <div className="underline"></div>
                    <Slider {...settings}>
                        {shrines.map((shrine, index) => <VideoList key={index} customer={shrine} />)}
                    </Slider>
                </div>
                <div className="downStar">
                    <img src='./starTop.png' />
                </div>
            </div>

        )
    }
} 