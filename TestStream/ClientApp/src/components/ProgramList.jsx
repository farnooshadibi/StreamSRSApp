import React, { Component } from 'react';
import './programlist.css';

export default class ProgramList extends Component{
    
    render(){
        const { customer, mode } = this.props;
        let date = (customer.playList === null || typeof customer.playList === 'undefined' || customer.playList.startTime === null) ? ' ' : new Date(customer.playList.startTime).toLocaleDateString('fa-IR');
        let time = (customer.playList === null || typeof customer.playList === 'undefined' || customer.playList.startTime === null) ? ' ' : new Date(customer.playList.startTime).toLocaleTimeString('fa-IR');
        return (
            <div className="col-md-4" style={{margin: "20px 0"}}>
                <div className="mycard">
                <div className="carddetail">
                        <h3 style={{ textAlign: "center" }}>{customer.name}</h3>
                        
                        <p><i className="fa fa-map-marker" style={{ fontSize: '15px', color: 'white', paddingRight: '15px' }}></i> {customer.playList == null || customer.playList.eventPlace === '' ? ' ثبت نشده' : customer.playList.eventPlace}</p>
                        <p><i className="fa fa-calendar" style={{ fontSize: '15px', color: 'white', paddingRight:'15px' }}></i> {customer.playList == null || customer.playList.eventPlace==='' ? ' ثبت نشده' : `${date}    ${time}`}</p>
                </div>
                <div className="cardimage">
                        <img className="myimg" src={customer.image} alt={customer.name} />
                    </div>
                </div>
            </div>
        )
        }
}