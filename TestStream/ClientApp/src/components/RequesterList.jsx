import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
//import Cookies from 'universal-cookie'
import CustomizedSnackbars, { } from './CustomizedSnackbars'
const getUrl = '/api/requester';




export default class RequesterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requesters: [],
            reqId: 0,
            id: 0,
            boardName: '',
            trusteeName: '',
            agentName: '',
            phoneNumber: '',
            email: '',
            dailySchedule: '',
            startTime: '',
            endTime: '',
            description: '',
            eventCity: ''
        }
    }
    componentDidMount(e) {
        this.getRequestList();
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    getRequestList() {
        axios.get(getUrl)
            .then(response => {
                const { data } = response.data;
                this.setState({ requesters: data });
            })
            .catch(error => console.log(error))
    }
    handleClickOpen(id) {
        this.setState({ mode: 'delete', setOpen: true, open: true, reqId: id, message: "آیا مایل به حذف درخواست هستید؟" });
    }
    handleClose() {
        this.setState({ setOpen: false, open: false })
    }
    handleDelete(id) {
        const { reqId } = this.state;
        this.setState({ mode: 'submit' })
        // if (window.confirm("Do you want delete this User?")) {
        axios.delete(`/api/requester/${reqId}`)
            .then(response => {
                this.setState({ open: true, message: "درخواست مورد نظر باموفقیت حذف شد" });
                this.getRequestList();
            })
            .catch((error) => {
                console.log(error);
                this.setState({ open: true, mode: 'error', message: 'حذف با خطا مواجه شد' })

            })
        this.setState({ open: false })
        // }
    }
    handleClick() {
        this.setState({ setOpenSnack: true })
        this.setState({ openSnack: true })
    }
    handleCloseSnack(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ setOpenSnack: false })
        this.setState({ OpenSnack: false })
    }
    handleCloseCustomizadSnack() {
        this.setState({ open: false })
    }
    render() {
        return (
            <div className="box-body user-listp">
                <table style={{
                    fontFamily: 'arial',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>شماره</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نام هیئت</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نام متولی</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>شماره موبایل</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>شهر برگزاری</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>برنامه زمانبندی</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>بررسی</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>حذف</th>
                        </tr>
                    </thead>
                    {this.state.requesters.map((req, index) =>
                        <tbody >
                            <tr>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{req.id}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{req.boardName}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{req.trusteeName}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{req.phoneNumber}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{req.eventCity}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{req.dailySchedule}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <Link className="btn btn-primary" to={{ pathname: '/requester/:id', state: { reqId: req.id, mode: 'edit' } }} >بررسی </Link></td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <button className="btn btn-danger" color="red" onClick={() => { this.handleClickOpen(req.id) }}> حذف</button></td>
                            </tr>
                        </tbody>
                    )}
                </table>


                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} handleRequest={this.handleDelete.bind(this)} />
            </div>
        )
    }
}