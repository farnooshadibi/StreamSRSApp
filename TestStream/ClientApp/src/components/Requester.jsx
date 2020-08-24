import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../../node_modules/react-dropdown/style.css';
import { Container } from 'reactstrap';
const apiPost = '/api/requester';

//const options = [
//    'هر روز', 'فقط امروز', 'روزهای زوج', 'روزهای فرد'
//];
//const defaultOption = options[0]
//const options1 = [
//    '00:00', '01:00', '02:00', '03:00'
//];
//const defaultOption1 = options[0]


export default class Requester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            Id: 0,
            mode: 'add',
            isSuccess: false,
            message: '',
            boardName: '',
            trusteeName: '',
            agentName: '',
            phoneNumber: '',
            email: '',
            dailySchedule: '',
            startTime: '',
            endTime: '',
            description: '',
            eventCity: '',
            options: [
                'هر روز', 'فقط امروز', 'روزهای زوج', 'روزهای فرد'
            ],
            optionss: [
                { name: 'هر روز', value: 'هر روز' },
                { name: 'فقط امروز', value: 'فقط امروز' },
                { name: 'روزهای زوج', value: 'روزهای زوج' }
            ],
            defaultOption: 'هر روز',
            handleSelect: (value: string) => console.log(value)

        }
    }


    componentDidMount() {

    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    handleValidation(callback) {
        let boardName = this.state.boardName;
        let trusteeName = this.state.trusteeName;
        let agentName = this.state.agentName;
        let phoneNumber = this.state.phoneNumber;
        let eventCity = this.state.eventCity;
        let errors = {};
        let formIsValid = true;

        //Name
        if (validator.isEmpty(boardName)) {
            formIsValid = false;
            errors["name"] = "نام هیئت نمیتواند خالی باشد";
        }
        //trusteeName
        if (validator.isEmpty(trusteeName)) {
            formIsValid = false;
            errors["trusteeName"] = "نام متولی نمیتواند خالی باشد";
        }
        //agentName
        if (validator.isEmpty(agentName)) {
            formIsValid = false;
            errors["agentName"] = "نام نماینده نمیتواند خالی باشد";
        }
        //phoneNumber
        if (validator.isEmpty(phoneNumber)) {
            formIsValid = false;
            errors["phoneNumber"] = "شماره موبایل نمیتواند خالی باشد";
        }
        //eventCity
        if (validator.isEmpty(eventCity)) {
            formIsValid = false;
            errors["eventCity"] = "شهر برگزاری نمیتواند خالی باشد";
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
        const { boardName, trusteeName, agentName, phoneNumber, email, dailySchedule, startTime, endTime, description, eventCity } = this.state;
        axios.post(apiPost, { boardName, trusteeName, agentName, phoneNumber, email, dailySchedule, startTime, endTime, description, eventCity })
            .then(response => {
                this.setState({ isSuccess: true, message: "ثبت اطلاعات با موفقیت انجام شد" });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'خطا رخ داد' })
            }
            )
    }
    backToList() {
        return this.props.history.push('/')
        // return <Redirect to="/user" />
    }

    render() {
        const { boardName, trusteeName, agentName, phoneNumber, email, dailySchedule, startTime, endTime, description, eventCity, options } = this.state;
        const { errors } = this.state;
        return (
            <Container>
                <div className="form-group rtl requester">
                    <h5 style={{ color: 'green' }} className="font-weight-bolder pt-3 text-center" >ثبت اطلاعات درخواست دهنده </h5>
                    <form className="" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 30 }}>
                        <div className="row">
                            <div className=" col-lg-4 form-group rtl">
                                <label> نام هیئت </label>
                                <input type="text"
                                    className={["form-control rtl", errors["name"] ? 'is-invalid' : ''].join(' ')}
                                    name="boardName"
                                    value={boardName}
                                    onChange={(event) => { this.setState({ boardName: event.target.value }); }}
                                />
                                <span className="invalid-feedback rtl" style={{ display: errors["name"] ? 'block' : 'none' }}>{errors["name"]} </span>
                            </div>
                            <div className="col-lg-4 form-group rtl">
                                <label>نام و نام خانوادگی متولی </label>
                                <input type="text"
                                    className={["form-control rtl", errors["trusteeName"] ? 'is-invalid' : ''].join(' ')}
                                    name="trusteeName"
                                    value={trusteeName}
                                    onChange={(event) => { this.setState({ trusteeName: event.target.value }); }}
                                />
                                <span className="invalid-feedback rtl" style={{ display: errors["trusteeName"] ? 'block' : 'none' }}>{errors["trusteeName"]} </span>
                            </div>
                            <div className="col-lg-4 form-group rtl">
                                <label>نام و نام خانوادگی نماینده </label>
                                <input type="text"
                                    className={["form-control rtl", errors["agentName"] ? 'is-invalid' : ''].join(' ')}
                                    name="agentName"
                                    value={agentName}
                                    onChange={(event) => { this.setState({ agentName: event.target.value }); }}
                                />
                                <span className="invalid-feedback rtl" style={{ display: errors["agentName"] ? 'block' : 'none' }}>{errors["agentName"]} </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 form-group rtl">
                                <label>شماره موبایل </label>
                                <input type="text"
                                    className={["form-control rtl", errors["phoneNumber"] ? 'is-invalid' : ''].join(' ')}
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(event) => { this.setState({ phoneNumber: event.target.value }); }}
                                />
                                <span className="invalid-feedback rtl" style={{ display: errors["phoneNumber"] ? 'block' : 'none' }}>{errors["phoneNumber"]} </span>
                            </div>
                            <div className="col-lg-4 form-group rtl">
                                <label>ایمیل </label>
                                <input type="text"
                                    className="form-control rtl"
                                    name="email"
                                    value={email}
                                    onChange={(event) => { this.setState({ email: event.target.value }); }}
                                />
                            </div>
                            <div className="col-lg-4 form-group rtl">
                                <label>شهر برگزاری </label>
                                <input type="text"
                                    className={["form-control rtl", errors["eventCity"] ? 'is-invalid' : ''].join(' ')}
                                    name="eventCity"
                                    value={eventCity}
                                    onChange={(event) => { this.setState({ eventCity: event.target.value }); }}
                                />
                                <span className="invalid-feedback rtl" style={{ display: errors["eventCity"] ? 'block' : 'none' }}>{errors["eventCity"]} </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 form-group rtl">
                                <label>برنامه زمانبندی   </label>
                                <select className="form-control rtl"
                                    value={this.state.dailySchedule}
                                    onChange={(event) => { this.setState({ dailySchedule: event.target.value }); }}
                                >
                                    <option value="هر روز">هر روز</option>
                                    <option value="فقط امروز">فقط امروز </option>
                                    <option value="روزهای زوج">روزهای زوج</option>
                                    <option value="روزهای فرد">روزهای فرد</option>
                                </select>
                                {/* <Dropdown options={options} onChange={this._onSelect} value={options[0]} placeholder="انتخاب کنید" />*/}
                                {/*    <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                Dropdown button
  </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div> */}
                            </div>
                            <div className="col-lg-4 form-group rtl">
                                <label>ساعت شروع </label>
                                <input type="text"
                                    className="form-control rtl"
                                    name="startTime"
                                    value={startTime}
                                    onChange={(event) => { this.setState({ startTime: event.target.value }); }}
                                    placeholder="مثال 10:00"
                                />
                            </div>
                            <div className="col-lg-4 form-group rtl">
                                <label>ساعت پایان </label>
                                <input type="text"
                                    className="form-control rtl"
                                    name="endTime"
                                    value={endTime}
                                    onChange={(event) => { this.setState({ endTime: event.target.value }); }}
                                    placeholder="مثال 12:00"
                                />
                            </div>
                        </div>
                        <div className="form-group rtl">
                            <label>توضیحات </label>
                            <textarea type="text"
                                className="form-control rtl"
                                name="description"
                                value={description}
                                onChange={(event) => { this.setState({ description: event.target.value }); }}
                            />
                        </div>

                        <br />
                        <div className="form-group" style={{ marginBottom: 220 }}>
                            <br />
                            <button type="submit" className="btn btn-success add-button text-center" style={{ marginLeft: 10 }}>ثبت </button>
                            <button className="btn btn-info add-button" onClick={this.backToList.bind(this)} > بازگشت </button>
                        </div>
                    </form>

                    <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.isSuccess} handleClose={this.handleCloseCustomizadSnack.bind(this)} />


                </div>
            </Container>
        )
    }
}

