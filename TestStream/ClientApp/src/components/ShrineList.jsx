import React, { Component } from 'react';
import { Telegram, Whatsapp } from 'react-social-sharing';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ShrineList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shrines: [],
            searchField: ''
        }
    }
    componentDidMount() {
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
    render() {
        const { shrines } = this.state;
        return (

            <div className="row rtl">
                {shrines.map((shrines, index) => 
                    <div className="col-lg-4 col-md-6 d-flex justify-content-around" style={{ marginBottom: 10 }}>
                        <div className="card text-center" style={{ width: '18rem'}}>
                            <div className="card" style={{ height: "50" }}>
                                <img src={shrines.image} className="card-img-top" alt={shrines.name} style={{ width: "auto", height: '17rem' }} />
                                <div style={{ borderBottom: "2px solid #888888", padding: 0, marginTop: "12px", marginBottom: "5px" }} className="card-body">
                                    <h3 className="card-title">{shrines.name}</h3>
                                    {/* <p className="card-text">{customer.name.substr(0 , 100)} ...</p> */}
                                </div>
                                <div className="row" style={{ padding: "5px" }}>
                                    <div className="col-md-12">
                                        <p className="" style={{ fontSize: "80%", marginBottom: "10px" }}>{shrines.description}</p>
                                    </div>
                                    <div className="col-md-12">
                                        <Link className="d-block btn btn-outline-success" to={`shrine-detail/${shrines.id}`}>مشاهده</Link>
                                        <Telegram simple link="http://sharingbuttons.io" />
                                        <Whatsapp simple link="http://sharingbuttons.io" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}

            </div>
 
        )
        }
}