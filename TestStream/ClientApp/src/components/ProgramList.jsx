import React, { Component } from 'react';
import './programlist.css';

export default class ProgramList extends Component{
    
    render(){
        const { customer, mode } = this.props;

        return (
            <div className="col-md-4" style={{margin: "20px 0"}}>
                <div className="mycard">
                <div className="carddetail">
                        <h3 style={{ textAlign: "center" }}>{customer.name}</h3>
                        
                        <p><i className="fa fa-location-arrow" style={{ fontSize: '15px', color: 'white' }}></i> {customer.c.name}</p>
                        <p><i className="fa fa-calendar" style={{ fontSize: '15px', color: 'white' }}></i> {customer.playList == null ? ' ثبت نشده' : customer.playList.eventPlace}</p>
                </div>
                <div className="cardimage">
                        <img className="myimg" src={customer.c.image} alt={customer.name} />
                    </div>
                </div>
            </div>
        )
        }
}