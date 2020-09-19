import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
const apiPost = '/api/user';



export default class Login extends Component {

    state = {
        userName: '',
        password: '',
        reenter: '',
        isSuccess: false,
        message: '',
        mode: '',
        errors: {}
    }
    handleValidation(callback) {
        let userName = this.state.userName;
        let password = this.state.password;
        let reenter = this.state.reenter;
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
        //reenter
        else if (validator.isEmpty(reenter)) {
            formIsValid = false;
            errors["reenter"] = "تکرار رمز عبور نمیتواند خالی باشد";
        }
        else if (password !== reenter) {
            formIsValid = false;
            errors["reenter"] = "تکرار رمز عبور با رمز عبور وارد شده، مطابقت ندارد";
        }

        this.setState({ errors }, () => {
            return callback(formIsValid);
        });
    }
    handleEmail = (e) => {
        this.setState({ userName: e.target.value })
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    handleReenter = (e) => {
        this.setState({ reenter: e.target.value })
    }
    handleSubmit(event) {
        event.preventDefault();
        this.handleValidation((valid) => {
            if (valid) {
                this.handleRequest();
                //this.props.history.push('/')
            }
        })
    }
    handleRequest() {
        const { userName, password, reenter } = this.state;
        axios.post(apiPost, { userName, password, reenter })
            .then(response => {
                this.setState({ isSuccess: true, mode: 'add', message: "ثبت کاربر با موفقیت انجام شد" });
                //this.props.history.push('/gallery');
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: " نام کاربری قبلا در سامانه ثبت شده است" })
            }
            )
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    render() {
        if (this.state.isSuccess && this.state.mode === 'add') {
            return (
                <Container>
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading"></h4>
                        <p> ثبت نام شما با موفقیت انجام شد، به منظور شرکت در نظر سنجی و ارسال نظر وارد حساب کاربری خود شوید</p>
                        <hr />
                        <Link className="btn btn-primary" to={{ pathname: '/login' }} >ورود </Link>
                        {/* <button className="btn btn-info add-button" onClick={this.backToList.bind(this)} > بازگشت </button>*/}
                    </div>
                </Container>
            );
        }
        else {
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
                            <input type="password"
                                className={["form-control rtl", errors["password"] ? 'is-invalid' : ''].join(' ')}
                                name="password"
                                value={this.state.password}
                                id="exampleInputPassword1"
                                placeholder="رمز عبور را وارد نمایید" onChange={this.handlePassword} />
                            <span className="invalid-feedback rtl" style={{ display: errors["password"] ? 'block' : 'none' }}>{errors["password"]} </span>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1"> تکرار کلمه عبور</label>
                            <input type="password"
                                className={["form-control rtl", errors["reenter"] ? 'is-invalid' : ''].join(' ')}
                                id="exampleInputPassword1"
                                name="reenter"
                                value={this.state.reenter}
                                placeholder="رمز عبور را مجددا وارد نمایید"
                                onChange={this.handleReenter} />
                            <span className="invalid-feedback rtl" style={{ display: errors["reenter"] ? 'block' : 'none' }}>{errors["reenter"]} </span>
                        </div>
                        <button type="submit" className="btn btn-success">ثبت نام</button>
                        <div style={{ marginTop: '25px' }}>
                            <Link className="btn btn-light" style={{ textDecoration: 'none' }} to={`/login`}> قبلاَ عضو شدید؟</Link>
                        </div>

                    </form>
                    <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.isSuccess} handleClose={this.handleCloseCustomizadSnack.bind(this)} />
                    {/* {this.state.isSuccess == true ? setTimeout(< Redirect to={{ pathname: "/gallery" }}/> , 1000) :null}*/}

                </div>
            )
        }
    }
}