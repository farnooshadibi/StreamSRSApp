import React, { Component } from 'react';
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
            like: 0,
            comment:0,
            processed: false,
            approve: false,
            approvefile: false,
            FestivalFileTypeId:0,
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
                        //phone: response.data.phone,
                        description: response.data.description,
                        trackingCode: response.data.trackingCode,
                        festivalFile: response.data.festivalFile,
                        workName: response.data.workName,
                        festivalFileTypeId: response.data.festivalFileTypeId,
                        like: response.data.like,
                        comment: response.data.comment,
                        FestivalFileTypeId: response.data.festivalFileTypeId
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
        const { firstName, lastName, mobile, festivalFiles, description, processed, approve, workName, approvefile, comment, like, FestivalFileTypeId } = this.state;
        return (<Container>
            <div className="form-group requester">
                <h5 style={{ color: 'green' }} className="font-weight-bolder pt-3 text-center" >بررسی اطلاعات شرکت کنندگان در جشنواره </h5>
                <form className="" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: 30 }} encType="multipart/form-data">
                    <div className="row">
                        <div className=" col-lg-4 form-group rtl">
                            <label> نام </label>
                            <input type="text"
                                disabled
                                className="form-control rtl"
                                name="firstName"
                                value={firstName}
                            onChange={(event) => { this.setState({ firstName: event.target.value }); }}
                            />
                        </div>
                        <div className="col-lg-4 form-group rtl">
                            <label>نام خانوادگی </label>
                            <input type="text"
                                disabled
                                className="form-control rtl"
                                name="lastName"
                                value={lastName}
                            onChange={(event) => { this.setState({ lastName: event.target.value }); }}
                            />
                        </div>
                        <div className="col-lg-4 form-group rtl">
                            <label>شماره موبایل </label>
                            <input type="text"
                                disabled
                                className="form-control rtl"
                                name="mobile"
                                value={mobile}
                            onChange={(event) => { this.setState({ mobile: event.target.value }); }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 form-group rtl">
                            <label>نوع اثر </label>
                            {this.state.festivalFileTypeId == 1 ? <input type="text"
                                className="form-control rtl"
                                disabled
                                name="fileTypeId"
                                value="عکس"
                                onChange={(event) => { this.setState({ fileTypeId: event.target.value }); }}
                            /> : null}
                            {this.state.festivalFileTypeId == 2 ? <input type="text"
                                className="form-control rtl"
                                disabled
                                name="fileTypeId"
                                value="فیلم"
                                onChange={(event) => { this.setState({ fileTypeId: event.target.value }); }}
                            /> : null}
                            {this.state.festivalFileTypeId == 3 ? <input type="text"
                                className="form-control rtl"
                                disabled
                                name="fileTypeId"
                                value="صدا"
                                onChange={(event) => { this.setState({ fileTypeId: event.target.value }); }}
                            /> : null}
                           
                        </div>
                        <div className="col-lg-6 form-group rtl">
                            <label>نام اثر </label>
                            <input type="text"
                                disabled
                                className="form-control rtl"
                                name="workName"
                                value={workName}
                            onChange={(event) => { this.setState({ workName: event.target.value }); }}
                            />
                        </div>
                    </div>
                    <div className="form-group rtl">
                        <label> توضیحات در مورد اثر </label>
                        <textarea type="text"
                            disabled
                            className="form-control rtl"
                            name="description"
                            value={description}
                            onChange={(event) => { this.setState({ description: event.target.value }); }}
                        />
                    </div>
                    <div className="row">
                    {this.state.festivalFile.map((value, index) => <div className="col-md-4 col-sm-12" style={{ marginBottom: '25px' }} key={value.id} >
                            <div className="d-flex justify-content-around">
                                <div className="card text-center" style={{ width: '100%', height: "50", backgroundColor: "transparent" }}>
                                <div className="card cardBg">
                                    {FestivalFileTypeId == 1 ? <img src={value.fileURL} style={{ height: "270px", width: "auto", borderRadius: "26px 26px 0 0" }} className="card-img-top" alt='عکس مربوطه' /> : null}
                                    {FestivalFileTypeId == 2 ? <video controls src={value.fileURL} style={{ height: "270px", width: "auto", borderRadius: "26px 26px 0 0" }} className="card-img-top" alt='عکس مربوطه' /> : null}
                                    {FestivalFileTypeId == 3 ? <audio controls src={value.fileURL} style={{ height: "70px", width: "auto", margin: '10px', borderRadius: "26px 26px 0 0" }} className="card-img-top" alt='عکس مربوطه'  /> : null}
                                    <div className="row" style={{ padding: "5px", textAlign: 'right', direction: 'rtl' }}>
                                                <div className="col-md-12" style={{ display: "inline-flex" }}>
                                                    <i className="fa fa-heart" style={{ fontSize: '15px', color: 'white', padding: "11px 0px 3px 5px" }}></i>
                                                    <p className="card-name" style={{ fontSize: "80%", marginBottom: "10px" }}>{like}</p>
                                                    <p>        </p>
                                                    <i className="fa fa-comment" style={{ fontSize: '15px', color: 'white', padding: "11px 0px 3px 5px" }}></i>
                                            <p className="card-name" style={{ fontSize: "80%", marginBottom: "10px" }}>{comment}</p>
                                            <p className="card-name form-check" style={{ marginRight:'60px' }}>
                                                <input className="form-check-input" type="checkbox" id={value.id} checked={value.approve}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                    تایید
                            </label>
                                            </p>
                                                </div>

                                            </div>
                                        </div>
                                </div>
                            </div>
                    </div>)}
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
