import React, {Component} from 'react'

import {Link} from 'react-router-dom'

export default class ShrineList extends Component{
    
    render(){
        const { customer, mode } = this.props;

        return (
            <div >
            <Link to={`${mode}/${customer.id}`}>
            <div className="d-flex justify-content-around" style={{ marginBottom: 10, padding: "5px" }}>
                <div className="card text-center" style={{ width: '20rem', height: "50", backgroundColor:"transparent" }}>
                    <div className="card cardBg"  >
                                <img src={customer.image} style={{ height: "270px", width: "auto", borderRadius:"26px 26px 0 0"}} className="card-img-top" alt={customer.name}/>
                                <h3 className="card-title">{customer.name}</h3>
                                <div className="row" style={{ padding: "5px", textAlign: 'right' }}>
                                    <div className="col-md-12" style={{display:"inline-flex"}}>
                                        <i className="fa fa-map-marker" style={{ fontSize: '15px', color: 'white', padding:"2px 0 0 2px" }}></i>
                                        <p className="card-name" style={{ fontSize: "80%", marginBottom: "10px" }}> {customer.name}</p>
                            </div>

                        </div>
                </div>
            </div>
                </div>
                </Link>
                </div>
        )
        }
}