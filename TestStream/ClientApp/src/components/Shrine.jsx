import React, { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import CustomizedSnackbars from './CustomizedSnackbars';
import FileInputComponent from 'react-file-input-previews-base64';
const apiPost = '/api/shrine';


export default class Shrine extends Component {
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
            description: ''
        }
    }
    componentDidMount() {
        const { mode } = this.props.location.state
        if (mode === 'edit') {
            this.state.mode = 'edit'
            const { shrineId } = this.props.location.state
            this.state.Id = shrineId
            this.handleEdit(shrineId);
        }
        else if (mode === 'add') {
            this.state.mode = 'add'
        }
    }
    handleEdit(shrineId) {
        axios.get(`/api/shrine/${shrineId}`)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState.fields,
                        name: response.data.name,
                        url: response.data.url,
                        image: response.data.image,
                        description: response.data.description,
                        isActive: response.data.isActive
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
        const { name, image, description, url, isActive } = this.state;
        axios.post(apiPost, { name, image, description, url, isActive })
            .then(response => {
                this.setState({ isSuccess: true, message: "ثبت با موفقیت انجام شد" });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'خطا رخ داد' })
            }
            )
    }
    handleSubmitEdit() {
        const { Id, name, url, image, isActive, description } = this.state;

        axios.put(`/api/shrine/`, { Id, name, url, image, isActive, description })
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
        return this.props.history.push('/shrine-list-admin')
        // return <Redirect to="/user" />
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    render() {
        const { name, image, description, url, isActive} = this.state;
        const { errors } = this.state;
        return (
            <div className="form-group rtl useriformation">
                <h5 style={{ color: 'green' }}>اطلاعات حرم مطهر </h5>
                <form className="col-lg-5" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 30 }}>
                    <div className="form-group rtl">
                        <label> نام </label>
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
                        <label>توضیحات </label>
                        <input type="text"
                            className="form-control rtl"
                            name="description"
                            value={description}
                            onChange={(event) => { this.setState({ description: event.target.value }); }}
                        />
                    </div>
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
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="isActive" checked={isActive}
                            onChange={(event) => { this.setState({ isActive: event.target.checked }); }}
                        />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            فعال
                            </label>
                    </div>
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
                        <button className="btn btn-info" onClick={this.backToList.bind(this)} > بازگشت به لیست حرم ها</button>
                    </div>
                </form>

                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.isSuccess} handleClose={this.handleCloseCustomizadSnack.bind(this)} />


            </div>
        )
    }
}
