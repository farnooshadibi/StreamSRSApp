import React, { Component } from 'react'
import axios from 'axios';
import VideoList from './VideoList';
import ShrineList from './ShrineList';
import ProgramList from './ProgramList';
import Slider from "react-slick";
import { type } from 'jquery';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            shrines: [],
            unfamous:[]
        }
    }

    componentWillMount() {
        axios.get('/api/customer/getfamouscustomer')
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
                const { data } = response.data;
                this.setState({
                    shrines: data
                })

            })
            .catch((error) => console.log(error))

        axios.get('/api/customer/getothercustomer')
            .then(response => {
                const { data } = response.data;
                this.setState({
                    unfamous: data
                })

            })
            .catch((error) => console.log(error))

    }



    render() {
        const { customers, shrines } = this.state;
        var firstSix = []
        let min = 3
        var now = new Date();
        now.getHours();
        now.getMinutes();
        now.getSeconds();
        let i =0
        if (typeof this.state.customers === 'undefined')
            return ('')
        else {
            (this.state.customers.length > 3) ? min = 4 : min = this.state.customers.length
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
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: min>=2 ? 2 : 1,
                            slidesToScroll: 1,
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
        if (typeof this.state.customers === 'undefined' || this.state.customers === null)
            return ('')
        else
            while (i < 6) {
                firstSix.push(this.state.unfamous[i])
                i++
            }
        console.log("adasdasdasdasdasd",firstSix)
        
        return (
            <div>
            <div className="Container-fluid">

                <div className="cover">
                    <p className="heroquote"> به سایت راهیان<br/> خوش آمدید</p>
                </div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>هیئت های معروف</h3>
                    <div className="underline"></div>
                    <Slider {...settings}>
                            {
                                customers.map((customer, index) =>
                                    8<11 ?
                                        <VideoList webView={this.props.webView} key={index} customer={customer} mode="video-detail" />: null
                                )}
                    </Slider>
                </div>
                <div className="upstar">
                    <img src='/starTop.png' />
                </div>
                <div className="bgMoharam">
                    <h3 style={{ textAlign: "center", color: "#fff" }}>حرم های مطهر</h3>
                    <div className="underline"></div>
                    <Slider {...settings2}>
                            {shrines.map((shrine, index) => <ShrineList webView={this.props.webView} key={index} customer={shrine} mode="shrine-detail" />)}
                    </Slider>
                </div>
                <div className="downStar">
                    <img src='/starTop.png' />
                </div>

                <div className="bgBarname">
                    <h3 style={{ textAlign: "center", color: "#fff", marginTop:"-5%" }}>سایر برنامه ها</h3>
                        <div className="underline"></div>
                        <div className="row">
                            
                            {firstSix.map((customer, index) => customer ? <ProgramList key={index} customer={customer} webView={this.props.webView} /> : null)}
                    </div>
                </div>
            </div>
            
            </div>
        )
    }
} 