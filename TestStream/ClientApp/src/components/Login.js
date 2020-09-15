import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
const apiPost = '/api/user/login';


export default class Login extends Component {

    state = {
        userName: '',
        password: '',
        isSuccess: false,
        message: '',
        mode: '',
        errors: {},
        isAuthenticate:false
    }
    handleEmail = (e) => {
        this.setState({ userName: e.target.value })
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    handleValidation(callback) {
        let userName = this.state.userName;
        let password = this.state.password;
        let errors = {};
        let formIsValid = true;

        //email
        if (validator.isEmpty(userName)) {
            formIsValid = false;
            errors["name"] = "نام کاربری نمیتواند خالی باشد";
        }
        else if (!validator.isEmail(userName)) {
            formIsValid = false;
            errors["name"] = "فرمت ایمیل نادرست است";
        }

        //password
        else if (validator.isEmpty(password)) {
            formIsValid = false;
            errors["password"] = "رمز عبور نمیتواند خالی باشد";
        }

        this.setState({ errors }, () => {
            return callback(formIsValid);
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.handleValidation((valid) => {
            if (valid) {
                this.handleRequest();
                
            }
        })
    }
    handleRequest() {
        const { userName, password } = this.state;
        axios.post(apiPost, { userName, password })
            .then(response => {
                this.setState({ isSuccess: true, mode: 'add', message: "ورود کاربر با موفقیت انجام شد", isAuthenticate: true });
                localStorage.setItem('api-token', response.data.data.token);
                this.props.login();
                this.props.history.push('/gallery');
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: "نام کاربری و با رمز عبور نادرست است" })
            }
            )
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }

    render() {
        const { errors } = this.state;
        return (
        <div className="container ">
                <form className="col col-md-6 " onSubmit={this.handleSubmit.bind(this)}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">آدرس ایمیل</label>
                        <input type="email"
                            className={["form-control rtl", errors["name"] ? 'is-invalid' : ''].join(' ')}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="ایمیل خود را وارد نمایید"
                            name="userName"
                            value={this.state.userName}
                            onChange={this.handleEmail} />
                        <span className="invalid-feedback rtl" style={{ display: errors["name"] ? 'block' : 'none' }}>{errors["name"]} </span>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">کلمه عبور</label>
                        <input type="password" className={["form-control rtl", errors["password"] ? 'is-invalid' : ''].join(' ')} name="password"
                            value={this.state.password} id="exampleInputPassword1" placeholder="رمز عبور خود را وارد نمایید" onChange={this.handlePassword} />
                        <span className="invalid-feedback rtl" style={{ display: errors["password"] ? 'block' : 'none' }}>{errors["password"]} </span>
                    </div>
                   
                    <br/>
                    <button type="submit" className="btn btn-success">ورود</button>
                    <div style={{ marginTop: '25px' }}>
                        <Link className="btn btn-light" style={{ textDecoration: 'none' }} to={`/signup`}> هنوز عضو نیستید؟</Link>
                    </div>                                                                                                                                                                                

                </form>
                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.isSuccess} handleClose={this.handleCloseCustomizadSnack.bind(this)} />
        </div>
        )
    }
}