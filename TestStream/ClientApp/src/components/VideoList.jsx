import React, {Component} from 'react'
import { Telegram, Whatsapp } from 'react-social-sharing'
import {Link} from 'react-router-dom'

export default class VideoList extends Component{
    
    render(){
        const {customer} = this.props;
        return(
            <div className="col-lg-4 col-md-6 d-flex justify-content-around" style={{marginBottom:10}}>
                <div className="card text-center" style={{width: '18rem' , height:"50" }}>
                {/* <svg class="bd-placeholder-img" width="100%" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg> */}
                <div className="card" style={{height:"50" }}>
                {/* <svg class="bd-placeholder-img" width="100%" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg> */}

                <img src={customer.image} className="card-img-top" alt={customer.name} style={{width:"auto" , height:'17rem' }}/>
                    <div style={{borderBottom:"2px solid #888888", padding:0, marginTop:"12px",marginBottom:"5px"}} className="card-body">
                        <h3 className="card-title">{customer.name}</h3>
                        {/* <p className="card-text">{customer.name.substr(0 , 100)} ...</p> */}
                    </div>
                    <div className="row" style={{padding:"5px"}}>
                            <div className="col-md-12">
                                <p className="" style={{fontSize:"80%",marginBottom:"10px"}}>{customer.name}</p>
                            </div>
                        <div className="col-md-12">
                            <Link className="d-block btn btn-outline-success" to={`video-detail/${customer.id}`}>مشاهده</Link>
                            <Telegram simple link="http://sharingbuttons.io"/>
                            <Whatsapp simple link="http://sharingbuttons.io"/>
                        </div>
                        </div>
                </div>
            </div>
            </div>
        )
        }
}