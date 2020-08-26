import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali'
import FileInputComponent from 'react-file-input-previews-base64';
const apiPost = '/api/PlayList';


export default class UserProgram extends Component {
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
            startTime: new Date(),
            endTime: new Date(),
            description: '',
            value: moment('1399/1/1', 'jYYYY/jM/jD'),
            performerName: '',
            lamenter: '',
            eventPlace: '',
            customerId:0
        }
    }
    componentDidMount() {
        //with Passing props
        const { mode } = this.props.location.state
        if (mode === 'edit') {
            this.state.mode = 'edit'
            const { userId } = this.props.location.state;
            this.state.Id = userId;
            this.handleEdit(userId);
        }
        else if (mode === 'add') {
            this.state.mode = 'add';
            const { userId } = this.props.location.state
            this.state.customerId = userId;
        }
        //with url
        //const {id} = this.props.match.params
        //console.log("id:", id) // "foo"
        //with cookie
        //const cookies = new Cookies();
        //console.log("cookie",cookies.get('userId'))
    }
    handleEdit(userId) {
        axios.get(`/api/customer/${userId}`)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState.fields,
                        name: response.data.name,
                        url: response.data.url,
                        image: response.data.image
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
       //const { userId } = this.props.location.state;
        //this.setState({ customerId: userId });
        console.log("customerId:", this.state.customerId);
        const { name, image, startTime, endTime, description, performerName, lamenter, eventPlace, customerId } = this.state;
        axios.post(apiPost, { name, image, startTime, endTime, description, performerName, lamenter, eventPlace, customerId })
            .then(response => {
                this.setState({ isSuccess: true, message: "ثبت برنامه با موفقیت انجام شد" });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'Error has occurred' })
            }
            )
    }
    handleSubmitEdit() {
        const { Id, name, url, image } = this.state;
        axios.put(`/api/customer/`, { Id, name, url, image })
            .then(response => {
                //alert(response.data.message);

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
        const { name, image, startTime, endTime, description, performerName, lamenter, eventPlace } = this.state;
        const { errors } = this.state;
        return (
            <div className="form-group rtl">
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
                        <label>زمان شروع </label>
                        <DatePicker
                            isGregorian={false}
                            value={this.state.value}
                            onChange={value => {
                                var strDateTime = value.format("YYYY-MM-DD HH:mm:ss");
                                
                                this.setState({ startTime: strDateTime });
                            }
                            }
                        />
                    </div>
                    <div className="form-group rtl">
                        <label>زمان پایان </label>
                        <DatePicker
                            isGregorian={false}
                            value={this.state.value}
                            onChange={value => this.setState({ endTime: value.format("YYYY-MM-DD HH:mm:ss") })}
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
                    <div className="form-group rtl">
                        <label>نام مجری </label>
                        <input type="text"
                            className="form-control rtl"
                            name="performerName"
                            value={performerName}
                            onChange={(event) => { this.setState({ performerName: event.target.value }); }}
                        />
                    </div>
                    <div className="form-group rtl">
                        <label>مداح </label>
                        <input type="text"
                            className="form-control rtl"
                            name="lamenter"
                            value={lamenter}
                            onChange={(event) => { this.setState({ lamenter: event.target.value }); }}
                        />
                    </div>
                    <div className="form-group rtl">
                        <label>محل برگزاری </label>
                        <input type="text"
                            className="form-control rtl"
                            name="eventPlace"
                            value={eventPlace}
                            onChange={(event) => { this.setState({ eventPlace: event.target.value }); }}
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
