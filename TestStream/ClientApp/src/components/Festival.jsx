import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
import Alert from './Alert';
import { Container } from 'reactstrap';
const apiPost = '/api/festival';


export default class Festival extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            Id: 0,
            mode: 'add',
            festivalId: 0,
            isSuccess: false,
            message: '',
            firstName: '',
            lastName: '',
            mobile: '',
            phone: '',
            description: '',
            trackingCode: '',
            result: '',
            processed: false, 
            festivalFiles: {}, 
            files: {}, 
            file: [], 
            formFile: '',
            fileName:''

        }
    }


    componentDidMount() {
        const { mode } = this.props.location.state
        if (mode === 'edit') {
            this.state.mode = 'edit'
            const { festivalId } = this.props.location.state
            this.setState({ Id: festivalId });
            this.handleEdit(festivalId);
        }
        else if (mode === 'add') {
            this.state.mode = 'add'
        }
    }
    handleEdit(festivalId) {
        axios.get(`/api/festival/${festivalId}`)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState.fields,
                        processed: response.data.processed,
                        result: response.data.result,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        mobile: response.data.mobile,
                        phone: response.data.phone,
                        description: response.data.description,
                        trackingCode: response.data.trackingCode,
                        festivalFiles: response.data.festivalFiles,
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
        const { Id, processed, result} = this.state;
        axios.put(`/api/festival/`, { Id, processed, result })
            .then(response => {
                this.setState({ isSuccess: true, message: "بررسی اطلاعات با موفقیت انجام شد" });
            })
            // .then(this.props.history.push('/user'))
            .catch(error => {
                console.log(error);
                this.setState({ isSuccess: true, mode: 'error', message: 'بررسی با خطا مواجه شد' })

            })
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    handleValidation(callback) {
        let mobile = this.state.mobile;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;

        let errors = {};
        let formIsValid = true;

        //Name
        if (validator.isEmpty(firstName)) {
            formIsValid = false;
            errors["name"] = "نام نمیتواند خالی باشد";
        }
        //lastName
        if (validator.isEmpty(lastName)) {
            formIsValid = false;
            errors["lastName"] = "نام خانوادگی نمیتواند خالی باشد";
        }

        //mobile
        if (validator.isEmpty(mobile)) {
            formIsValid = false;
            errors["mobile"] = "شماره موبایل نمیتواند خالی باشد";
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
                }
                else if (mode === 'edit') {
                    this.handleSubmitEdit();
                }
            }
        })
    }
    handleRequest() {
        const { firstName, lastName, mobile, phone, festivalFiles, description } = this.state;
        
        var formData = new FormData();

        for (let i = 0; i < this.state.file.length; i++) {
            formData.append(`formFile`, this.state.file[i])
        }
        //formData.append('fileName', this.state.fileName);
        //formData.append('formFile', this.state.formFile);

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('mobile', mobile);
        formData.append('phone', phone);
        formData.append('description', description);

        console.log("formData:", formData);
        console.log(" this.state.file:", this.state.file);

        axios.post(apiPost, formData)
            .then(response => {
                this.setState({ isSuccess: true, message: "ثبت اطلاعات با موفقیت انجام شد، کارشناسان در اسرع وقت با شما تماس می گیرند", trackingCode: response.data.data.trackingCode });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'خطا رخ داد' })
            })
    }
    backToList() {
        return this.props.history.push('/')
        // return <Redirect to="/user" />
    }
    onChange(event) {
        const file = [...this.state.file]; // Spread syntax creates a shallow copy
        file.push(...event.target.files); // Spread again to push each selected file individually
        this.setState({ file });
        //let files = event.target.files;
        this.setState({ formFile: event.target.files[0], fileName: event.target.files[0].name })

        //this.setState({ festivalFiles: files });
        //var formData = new FormData();
        //for (let i = 0; i < files.length; i++) {
            
        //    formData.append(`file[${i}]`, files[i])
        //    this.setState({ files: formData });

        //    //let reader = new FileReader();
        //    //reader.readAsDataURL(files[i]);
        //    //reader.onload = (e) => {
        //    //    this.setState({ files: formData });
               
        //    //}
        //}
        
    }

    render() {
        const { firstName, lastName, mobile, phone, festivalFiles, description, processed, result } = this.state;
        const { errors } = this.state;
        if (this.state.isSuccess && this.state.mode === 'add') {
            return (
                <Container>
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading"></h4>
                        <p> ثبت اطلاعات با موفقیت انجام شد، کارشناسان ما در اسرع وقت با شما تماس می گیرند</p>
                        <p>کد رهگیری شما : {this.state.trackingCode}</p>
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
                        <h5 style={{ color: 'green' }} className="font-weight-bolder pt-3 text-center" >ثبت اطلاعات شرکت کنندگان در جشنواره </h5>
                        <form className="" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 30 }} enctype="multipart/form-data">
                            <div className="row">
                                <div className=" col-lg-6 form-group rtl">
                                    <label> نام </label>
                                    <input type="text"
                                        className={["form-control rtl", errors["name"] ? 'is-invalid' : ''].join(' ')}
                                        name="firstName"
                                        value={firstName}
                                        onChange={(event) => { this.setState({ firstName: event.target.value }); }}
                                    />
                                    <span className="invalid-feedback rtl" style={{ display: errors["name"] ? 'block' : 'none' }}>{errors["name"]} </span>
                                </div>
                                <div className="col-lg-6 form-group rtl">
                                    <label>نام خانوادگی </label>
                                    <input type="text"
                                        className={["form-control rtl", errors["lastName"] ? 'is-invalid' : ''].join(' ')}
                                        name="lastName"
                                        value={lastName}
                                        onChange={(event) => { this.setState({ lastName: event.target.value }); }}
                                    />
                                    <span className="invalid-feedback rtl" style={{ display: errors["lastName"] ? 'block' : 'none' }}>{errors["lastName"]} </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 form-group rtl">
                                    <label>شماره موبایل </label>
                                    <input type="text"
                                        className={["form-control rtl", errors["mobile"] ? 'is-invalid' : ''].join(' ')}
                                        name="mobile"
                                        value={mobile}
                                        onChange={(event) => { this.setState({ mobile: event.target.value }); }}
                                    />
                                    <span className="invalid-feedback rtl" style={{ display: errors["mobile"] ? 'block' : 'none' }}>{errors["mobile"]} </span>
                                </div>
                                <div className="col-lg-6 form-group rtl">
                                    <label>شماره ثابت </label>
                                    <input type="text"
                                        className="form-control rtl"
                                        name="phone"
                                        value={phone}
                                        onChange={(event) => { this.setState({ phone: event.target.value }); }}
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
                            <div className="form-group rtl">
                                <label>فایل </label>
                                <input type="file"
                                    multiple 
                                    className="form-control rtl"
                                    name="file"
                                    //value={description}
                                    onChange={(event) => { this.onChange(event) }}
                                />
                            </div>
                            {this.state.mode === 'edit' ?
                                <div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="processed" checked={processed}
                                            onChange={(event) => { this.setState({ processed: event.target.checked }); }}
                                        />
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            بررسی شده
                            </label>
                                    </div>
                                    <div className="form-group rtl">
                                        <label>نتیجه </label>
                                        <textarea type="text"
                                            className="form-control rtl"
                                            name="result"
                                            value={result}
                                            onChange={(event) => { this.setState({ result: event.target.value }); }}
                                        />
                                    </div>
                                </div>
                                : null}
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


