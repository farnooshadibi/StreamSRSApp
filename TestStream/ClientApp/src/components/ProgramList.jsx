import React, {Component} from 'react'
import { Telegram, Whatsapp } from 'react-social-sharing'
import './programlist.css'
import {Link} from 'react-router-dom'

export default class ProgramList extends Component{
    
    render(){
        const { customer, mode } = this.props;

        return (
            <div className="col-md-4" style={{margin: "20px 0"}}>
                <div className="mycard">
                <div className="carddetail">
                        <h3 style={{ textAlign: "center" }}>{customer.name}</h3>
                        
                        <p><i className="fa fa-location-arrow" style={{ fontSize: '15px', color: 'white' }}></i> {customer.name}</p>
                        <p><i className="fa fa-calendar" style={{ fontSize: '15px', color: 'white' }}></i> {customer.name}</p>
                </div>
                <div className="cardimage">
                        <img class="myimg" src={customer.image} alt={customer.name} />
                    </div>
                </div>
            </div>
        )
        }
}