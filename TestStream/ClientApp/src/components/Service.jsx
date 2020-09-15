import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
import { Container } from 'reactstrap';
const apiPost = '/api/requester';



export default class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            Id: 0,
            mode: 'add',
            reqId: 0,
            isSuccess: false,
            message: '',
            name: '',
            image: '',
            description: '',
            file: '', 
            code:''

        }
    }


    //componentDidMount() {
    //    const { mode } = this.props.location.state
    //    if (mode === 'edit') {
    //        this.state.mode = 'edit'
    //        const { reqId } = this.props.location.state
    //        this.state.Id = reqId
    //        this.handleEdit(reqId);
    //    }
    //    else if (mode === 'add') {
    //        this.state.mode = 'add'
    //    }
    //}
    handleEdit(reqId) {
        axios.get(`/api/requester/${reqId}`)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState.fields,
                        boardName: response.data.boardName,
                        trusteeName: response.data.trusteeName,
                        agentName: response.data.agentName,
                        phoneNumber: response.data.phoneNumber,
                        email: response.data.email,
                        dailySchedule: response.data.dailySchedule,
                        startTime: response.data.startTime,
                        description: response.data.description,
                        eventCity: response.data.eventCity,
                        processed: response.data.processed,
                        reviewerOpinion: response.data.reviewerOpinion
                    })
                    )
                }
            )
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'ثبت با خطا مواجه شد' })
            })
    }
    handleSubmitEdit() {
        //this.state.mode = 'edit';
        const { Id, boardName, trusteeName, agentName, phoneNumber, email, dailySchedule, startTime, endTime, reviewerOpinion, description, processed, eventCity, options } = this.state;
        axios.put(`/api/requester/`, { Id, boardName, trusteeName, agentName, phoneNumber, email, dailySchedule, startTime, endTime, reviewerOpinion, description, processed, eventCity, options })
            .then(response => {
                this.setState({ isSuccess: true, message: "بررسی اطلاعات با موفقیت انجام شد" });
            })
            // .then(this.props.history.push('/user'))
            .catch(error => {
                console.log(error);
                this.setState({ isSuccess: true, mode: 'error', message: 'ثبت با خطا مواجه شد' })

            })
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
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
        const { name, description, file } = this.state;
        const formData = { name: name, description: description, file: file };
        const url = '/api/requester/uploadFile';
        axios.post(url, formData)
            .then(response => {
                console.warn("result", response);
                this.setState({ isSuccess: true, message: "ثبت اطلاعات با موفقیت انجام شد، کارشناسان در اسرع وقت با شما تماس می گیرند", code: response.data.data.code });
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
    onChange(event) {
        let files = event.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.warn("img data:", e.target.result);
            this.setState({ file: e.target.result });
        }
    }

    render() {
        const { name, trusteeName, agentName, phoneNumber, email, dailySchedule, startTime, endTime, reviewerOpinion, description, processed, eventCity, options } = this.state;
        const { errors } = this.state;
        if (this.state.isSuccess && this.state.mode === 'add') {
            return (
                <Container>
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading"></h4>
                        <p> ثبت اطلاعات با موفقیت انجام شد، کارشناسان ما در اسرع وقت با شما تماس می گیرند</p>
                        <p>کد رهگیری شما : {this.state.code}</p>
                        <hr />
                        <button className="btn btn-info add-button" onClick={this.backToList.bind(this)} > بازگشت </button>
                    </div>
                </Container>
            );
        }
        else {
            return (
                <Container>
                    <div className="form-group rtl requester">
                        <h5 style={{ color: 'green' }} className="font-weight-bolder pt-3 text-center" >ثبت فایل درخواست دهنده </h5>
                        <form className="" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 30 }}>

                                <div className="col-lg-6 form-group rtl">
                                    <label> نام  </label>
                                    <input type="text"
                                        className={["form-control rtl", errors["name"] ? 'is-invalid' : ''].join(' ')}
                                        name="name"
                                        value={name}
                                        onChange={(event) => { this.setState({ name: event.target.value }); }}
                                    />
                                    <span className="invalid-feedback rtl" style={{ display: errors["name"] ? 'block' : 'none' }}>{errors["name"]} </span>
                                </div>
                            <div className="col-lg-6 form-group rtl">
                                <label>توضیحات </label>
                                <textarea type="text"
                                    className="form-control rtl"
                                    name="description"
                                    value={description}
                                    onChange={(event) => { this.setState({ description: event.target.value }); }}
                                />
                                </div>
                            <div className="col-lg-6 form-group rtl">
                                    <label>فایل </label>
                                    <input type="file"
                                        className="form-control rtl"
                                        name="file"
                                        //value={description}
                                        onChange={(event) => { this.onChange(event) }}
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
                </Container>)
        }

    }
}


