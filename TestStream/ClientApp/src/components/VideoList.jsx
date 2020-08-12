import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class VideoList extends Component{
    
    render(){
        const {customer} = this.props;

        return(
            <div className="col-lg-4 col-md-6 d-flex justify-content-around" style={{marginBottom:10}}>
                <div className="card text-center" style={{width: '18rem' , height:"50" }}>
                <div className="card" style={{width: '18rem' , height:"50" }}>
                {/* <svg class="bd-placeholder-img" width="100%" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg> */}

                <img src={customer.image} className="card-img-top" alt={customer.name} style={{width:"100%" , height:'15rem' }}/>
                    <div className="card-body">
                        <h5 className="card-title">{customer.name}</h5>
                        {/* <p className="card-text">{customer.name.substr(0 , 100)} ...</p> */}
                        
                        <Link className="btn btn-danger" style={{ textAlign:'center' }} to={`video-detail/${customer.id}`}> مشاهده</Link>
                    </div>
                </div>
            </div>
            </div>
        )
        }
}