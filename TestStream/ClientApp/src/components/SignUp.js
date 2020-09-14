import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiPost = '/api/festival';


export default class Login extends Component {

    state = {
        email: '',
        password: '',
        reenter:''
    }
    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    handleReenter = (e) => {
        this.setState({ reentr: e.target.value })
    }
    render() {
        
        console.log("dattaaaaa", this.state)
        return (
            
        <div className="container ">
                <form className="col col-md-6 ">
                    <div class="form-group">
                        <label for="exampleInputEmail1">آدرس ایمیل</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={ this.handleEmail } />
                    </div>
                    <div class="form-group">
                            <label for="exampleInputPassword1">کلمه عبور</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePassword} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1"> تکرار کلمه عبور</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleReenter} />
                    </div>
                    <div style={{marginTop:'25px'}}>
                        <Link className="btn btn-light" style={{ textDecoration: 'none'}} to={`/login`}> قبلاَ عضو شدید؟</Link>       
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-success">ورود</button>

                </form>
        </div>
        )
    }
}