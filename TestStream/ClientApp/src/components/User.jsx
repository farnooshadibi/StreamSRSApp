import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
import FileInputComponent from 'react-file-input-previews-base64';
//import Cookies from 'universal-cookie';
//import {Redirect} from 'react-router-dom';
const apiPost = '/api/customer';


export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            Id: 0,
            mode: '',
            isSuccess: false,
            message: '',
            name: '',
            url: '',
            image: '',
            isActive: false,
            famous: false,
            description: '',
            latinName: '',
            streamUrl: '',
            token:''

        }
    }
    componentDidMount() {
        //with Passing props
        const { mode } = this.props.location.state
        if (mode === 'edit') {
            this.state.mode = 'edit'
            const { userId } = this.props.location.state
            this.setState({ Id: userId });
            //this.state.Id = userId
            this.handleEdit(userId);
        }
        else if (mode === 'add') {
            this.state.mode = 'add'
        }
        //with url
        //const {id} = this.props.match.params
        //console.log("id:", id) // "foo"
        //with cookie
        //const cookies = new Cookies();
        //console.log("cookie",cookies.get('userId'))
    }
    handleEdit(userId) {
        axios.get(`/api/customer/getCustomer/${userId}`)
            .then(
                response => {
                    console.log("response", response);
                    console.log("userId", userId);
                    this.setState(prevState => ({
                        ...prevState.fields,
                        name: response.data.name,
                        url: response.data.url,
                        image: response.data.image,
                        latinName: response.data.latinName,
                        description: response.data.description,
                        isActive: response.data.isActive,
                        famous: response.data.famous,
                        streamUrl: response.data.streamUrl,
                        token: response.data.token
                    })
                    )
                }
            )
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'ثبت با خطا مواجه شد' })
            })
    }
    handleValidation(callback) {
        let name = this.state.name;
        let errors = {};
        let formIsValid = true;

        //Name
        if (validator.isEmpty(name)) {
            formIsValid = false;
            errors["name"] = "نام نمیتواند خالی باشد";
        }
        this.setState({ errors }, () => {
            return callback(formIsValid);
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const mode = this.state.mode
        this.handleValidation((valid) => {
            if (valid) {
                if (mode === 'add') {
                    this.handleRequest();
                    //this.props.history.push('/user')
                }
                else if (mode === 'edit') {
                    this.handleSubmitEdit();
                }
            }
        })
    }
    handleRequest() {
        const { name, image, description, latinName, isActive, famous } = this.state;
        axios.post(apiPost, { name, image, description, latinName, isActive, famous,  })
            .then(response => {
                this.setState({ isSuccess: true, message: "ثبت کاربر با موفقیت انجام شد" });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'Error has occurred' })
            }
            )
    }
    handleSubmitEdit() {
        const { Id, name, url, image, latinName, isActive, famous, streamUrl } = this.state;
        axios.put(`/api/customer/`, { Id, name, url, image, latinName, isActive, famous, streamUrl })
            .then(response => {
                this.setState({ isSuccess: true, message: "ویرایش اطلاعات با موفقیت انجام شد" });
            })
            // .then(this.props.history.push('/user'))
            .catch(error => {
                console.log(error);
                this.setState({ isSuccess: true, mode: 'error', message: 'ثبت با خطا مواجه شد' })

            })
    }
    backToList() {
        return this.props.history.push('/user-list')
        // return <Redirect to="/user" />
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    render() {
        const { name, image, latinName, description, url, famous, isActive, streamUrl, token } = this.state;
        const { errors } = this.state;
        return (
            <div className="form-group rtl useriformation">
                <h5 style={{ color: 'green' }}>اطلاعات مشتری </h5>
                <form className="col-lg-5" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 30 }}>
                    <div className="form-group rtl">
                        <label> نام: </label>
                        <input type="text"
                            className={["form-control rtl", errors["name"] ? 'is-invalid' : ''].join(' ')}
                            name="name"
                            value={name}
                            onChange={(event) => { this.setState({ name: event.target.value }); }}
                            placeholder="لطفا نام خود را وارد نمائید"
                        />
                        <span className="invalid-feedback rtl" style={{ display: errors["name"] ? 'block' : 'none' }}>{errors["name"]} </span>
                    </div>
                    <div className="form-group rtl">
                        <label>نام لاتین </label>
                        <input type="text"
                            className="form-control rtl"
                            name="latinName"
                            value={latinName}
                            onChange={(event) => { this.setState({ latinName: event.target.value }); }}
                        />
                    </div>
                    <div className="form-group rtl">
                        <label>توضیحات </label>
                        <input type="text"
                            className="form-control rtl"
                            name="description"
                            value={description}
                            onChange={(event) => { this.setState({ description: event.target.value }); }}
                        />
                    </div>
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="famous" checked={famous}
                            onChange={(event) => { this.setState({ famous: event.target.checked }); }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                                معروف
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="isActive" checked={isActive}
                            onChange={(event) => { this.setState({ isActive: event.target.checked }); }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            فعال
                            </label>
                    </div>

                    {this.state.mode === 'edit' ?
                        <div>
                            <div className="form-group rtl">
                                <label>url </label>
                                <input type="text"
                                    className="form-control rtl"
                                    name="url"
                                    value={url}
                                    onChange={(event) => { this.setState({ url: event.target.value }); }}
                                />
                        </div>
                        <div className="form-group rtl">
                            <label>StreamUrl </label>
                            <input type="text"
                                className="form-control rtl"
                                name="url"
                                value={streamUrl}
                                onChange={(event) => { this.setState({ streamUrl: event.target.value }); }}
                            />
                            </div>
                            <div className="form-group rtl">
                                <label>توکن </label>
                                <input type="text"
                                    className="form-control rtl"
                                    name="token"
                                    value={token}
                                    disabled
                                    onChange={(event) => { this.setState({ token: event.target.value }); }}
                                />
                            </div>
                        </div>
                        : null}
                    <br />
                        <div className="form-group rtl">
                            <label> عکس: </label>
                            {this.state.mode === 'edit' ?
                                <img src={image} style={{ width: "100%", height: '15rem' }} />
                                : null
                            }
                            <FileInputComponent
                                labelText="انتخاب عکس"
                                labelStyle={{ fontSize: 14 }}
                                multiple={false}
                                value={image}
                                callbackFunction={(file_arr) => { this.setState({ image: file_arr.base64 }); }}
                                accept="image/*"
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 220 }}>
                            <br />
                            <button type="submit" className="btn btn-success" style={{ marginLeft: 10 }}>ثبت </button>
                            <button className="btn btn-info" onClick={this.backToList.bind(this)} > بازگشت به لیست مشتریان</button>
                        </div>
                </form>

                    <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.isSuccess} handleClose={this.handleCloseCustomizadSnack.bind(this)} />


            </div>
        )
    }
}
