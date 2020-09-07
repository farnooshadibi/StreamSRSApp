﻿import React, { Component } from 'react';
import axios from 'axios';
import CustomizedSnackbars from './CustomizedSnackbars';
import { Container } from 'reactstrap';




export default class FestivalDetail extends Component {
    constructor(props) {
        super(props);
        var ff = {
            fileURL: '',
            festivalId: 0,
            approve: false
        };

        this.state = {
            errors: {},
            Id: 0,
            mode: 'edit',
            festivalId: 0,
            open: false,
            setOpen: false,
            isSuccess: false,
            message: '',
            firstName: '',
            lastName: '',
            mobile: '',
            phone: '',
            description: '',
            trackingCode: '',
            workName: '',
            result: '',
            processed: false,
            approve: false,
            approvefile: false,


            festivalFile:[],
            festivalFile: [],
            festivalFiles: {},
            files: {},
            file: [],
            formFile: '',
            fileName: '',
            festivalFileTypeId: 1,
            fileTypeName: '',
            fileType: []
        }
    }
    backToList() {
        return this.props.history.push('/festival-list')
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    componentDidMount() {
        const { festivalId } = this.props.location.state
        this.setState({ Id: festivalId });
        this.handleEdit(festivalId);
    }
    handleEdit(festivalId) {
        axios.get(`/api/festival/${festivalId}`)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState.fields,
                        processed: response.data.processed,
                        approve: response.data.approve,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        mobile: response.data.mobile,
                        phone: response.data.phone,
                        description: response.data.description,
                        trackingCode: response.data.trackingCode,
                        festivalFile: response.data.festivalFile,
                        workName: response.data.workName,
                        festivalFileTypeId: response.data.festivalFileTypeId
                    })                 
                    )
                }
            )
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'ثبت با خطا مواجه شد' })
            })
    }
    handleSubmit(event) {
        event.preventDefault();
        //this.state.mode = 'edit';
        const { Id, processed, approve, festivalFile } = this.state;
        axios.put(`/api/festival/`, { Id, processed, approve, festivalFile })
            .then(response => {
                this.setState({ isSuccess: true, message: "بررسی اطلاعات با موفقیت انجام شد" });
            })
            // .then(this.props.history.push('/user'))
            .catch(error => {
                console.log(error);
                this.setState({ isSuccess: true, mode: 'error', message: 'بررسی با خطا مواجه شد' })

            })
    }

    handleChange(event) {
//        console.log('handleCHeckbox', event.target.id, this.state)
        var index = this.state.festivalFile.findIndex(p => p.id == event.target.id)
        console.log('handleCHeckbox', index)
        //this.setState({
        this.state.festivalFile[index].approve = event.target.checked
        this.forceUpdate()
        //});
    }
    render() {
        console.log("festivalFile", this.state.festivalFile)
        const { firstName, lastName, mobile, phone, festivalFiles, description, processed, approve, workName, approvefile } = this.state;
        return (<Container>
            <div className="form-group requester">
                <h5 style={{ color: 'green' }} className="font-weight-bolder pt-3 text-center" >بررسی اطلاعات شرکت کنندگان در جشنواره </h5>
                <form className="" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 30 }} encType="multipart/form-data">
                    <div className="row">
                        <div className=" col-lg-3 form-group rtl">
                            <label> نام </label>
                            <input type="text"
                                disabled
                                className="form-control rtl"
                                name="firstName"
                                value={firstName}
                            onChange={(event) => { this.setState({ firstName: event.target.value }); }}
                            />
                        </div>
                        <div className="col-lg-3 form-group rtl">
                            <label>نام خانوادگی </label>
                            <input type="text"
                                className="form-control rtl"
                                name="lastName"
                                value={lastName}
                            onChange={(event) => { this.setState({ lastName: event.target.value }); }}
                            />
                        </div>
                        <div className="col-lg-3 form-group rtl">
                            <label>شماره موبایل </label>
                            <input type="text"
                                className="form-control rtl"
                                name="mobile"
                                value={mobile}
                            onChange={(event) => { this.setState({ mobile: event.target.value }); }}
                            />
                        </div>
                        <div className="col-lg-3 form-group rtl">
                            <label>شماره ثابت </label>
                            <input type="text"
                                className="form-control rtl"
                                name="phone"
                                value={phone}
                            onChange={(event) => { this.setState({ phone: event.target.value }); }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 form-group rtl">
                            <label>نوع اثر </label>
                            {this.state.festivalFileTypeId == 1 ? <input type="text"
                                className="form-control rtl"
                                name="fileTypeId"
                                value="عکس"
                                onChange={(event) => { this.setState({ fileTypeId: event.target.value }); }}
                            /> : null}
                            {this.state.festivalFileTypeId == 2 ? <input type="text"
                                className="form-control rtl"
                                name="fileTypeId"
                                value="فیلم"
                                onChange={(event) => { this.setState({ fileTypeId: event.target.value }); }}
                            /> : null}
                            {this.state.festivalFileTypeId == 3 ? <input type="text"
                                className="form-control rtl"
                                name="fileTypeId"
                                value="صدا"
                                onChange={(event) => { this.setState({ fileTypeId: event.target.value }); }}
                            /> : null}
                           
                        </div>
                        <div className="col-lg-6 form-group rtl">
                            <label>نام اثر </label>
                            <input type="text"
                                className="form-control rtl"
                                name="workName"
                                value={workName}
                            onChange={(event) => { this.setState({ workName: event.target.value }); }}
                            />
                        </div>
                    </div>
                  
                    {this.state.festivalFile.map((value, index) => <div className="form-control" key={value.id} >
                        <div className="form-group rtl row">
                        {value.fileURL} 
                        
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id={value.id} checked={value.approve}
                                    onChange={ this.handleChange.bind(this) }
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                تایید
                            </label>
                        </div>
                        </div>
                    </div>)}
                    <div className="form-group rtl">
                        <label> توضیحات در مورد اثر </label>
                        <textarea type="text"
                            className="form-control rtl"
                            name="description"
                            value={description}
                            onChange={(event) => { this.setState({ description: event.target.value }); }}
                        />
                    </div>
                    <div className="row">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="processed" checked={processed}
                                onChange={(event) => { this.setState({ processed: event.target.checked }); }}
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                بررسی شده
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="approve" checked={approve}
                                onChange={(event) => { this.setState({ approve: event.target.checked }); }}
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                تایید و نمایش
                            </label>
                        </div>
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