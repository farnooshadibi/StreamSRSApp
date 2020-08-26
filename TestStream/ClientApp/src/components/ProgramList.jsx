import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './programlist.css';

export default class ProgramList extends Component{
    
    render(){
        const { customer, mode, webView } = this.props;
        let date = (customer.playList === null || typeof customer.playList === 'undefined' || customer.playList.startTime === null) ? ' ' : new Date(customer.playList.startTime).toLocaleDateString('fa-IR');
        let time = (customer.playList === null || typeof customer.playList === 'undefined' || customer.playList.startTime === null) ? ' ' : new Date(customer.playList.startTime).toLocaleTimeString('fa-IR');
        let router = webView === true ? '2' : ''
        let defaultImg = 'https://lh3.googleusercontent.com/proxy/v_3kVPoOFzjJTfhlTam9DayCrA3lh6FmXLiSMW2FSEuxedN1vJTt3Zc1RF7FCRp1CMg6swIvy5Mkx8Z57oJQ_T2R3elOIcuhUOHcDzfyCUW_o_rXAM2JfURu1g'
        if (customer) {
            return (

                <div className="col-md-4" style={{ margin: "20px 0" }}>
                    <Link style={{ textDecoration: 'none' }} to={`video-detail${router}/${customer.id}`}>
                        <div className="mycard">
                            <div className="carddetail">
                                <h3 style={{ textAlign: "center" }}>{customer.name}</h3>

                                <p style={{ fontSize: "210%" }}><i className="fa fa-map-marker" style={{ fontSize: '15px', color: 'white', paddingRight: '15px' }}></i> {customer.playList == null || customer.playList.eventPlace === '' ? ' ثبت نشده' : customer.playList.eventPlace}</p>
                                <p style={{ fontSize: "190%" }}><i className="fa fa-calendar" style={{ fontSize: '15px', color: 'white', paddingRight: '15px' }}></i> {customer.playList == null || customer.playList.eventPlace === '' ? ' ثبت نشده' : `${date}    ${time}`}</p>
                            </div>
                            <div className="cardimage">
                                <img className="myimg" src={customer.image ? customer.image : defaultImg} alt={customer.name} />
                            </div>
                        </div>
                    </Link>
                </div>


            )
        }
        else {
            return(null)
        }
        
        }
}