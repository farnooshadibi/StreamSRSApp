﻿import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class GalleryVideo extends Component{
    
    render(){

            return (
                <div className="col-md-4 col-sm-12" style={{marginBottom:'25px'}}>
                    
                <div className="d-flex justify-content-around">
                        <div className="card text-center" style={{width:'100%', height: "50", backgroundColor: "transparent" }}>
                            <Link style={{ textDecoration: 'none' }} to={`/gallerydetail/${this.props.customer.id}`}>
                                <div className="card cardBg">
                                    <i className="fa fa-volume-up" style={{ fontSize: '900%', color: 'white' }}></i>

                                    <audio controls src={`${this.props.customer.festivalFile.fileURL}` } style={{ height: "70px", width: "auto",margin:'10px', borderRadius:"26px 26px 0 0"}} className="card-img-top"/>
                                    <h3 className="card-title">{`${this.props.customer.firstName} ${this.props.customer.lastName}`}</h3>
                                    <div className="row" style={{ padding: "5px", textAlign: 'right', direction: 'rtl' }}>
                                        <div className="col-md-12" style={{display:"inline-flex"}}>
                                            <i className="fa fa-heart" style={{ fontSize: '15px', color: 'white', padding:"11px 0px 3px 10px" }}></i>
                                            <p className="card-name" style={{ fontSize: "80%", marginBottom: "10px" }}>{`${this.props.customer.like}`}</p>
                                            <p>        </p>
                                            <i className="fa fa-comment" style={{ fontSize: '15px', color: 'white', padding: "11px 0px 3px 10px" }}></i>
                                            <p className="card-name" style={{ fontSize: "80%", marginBottom: "10px" }}>{`${this.props.customer.comment}`}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                                </Link>
                </div>
                    </div>
                    </div>
            )
        }
}