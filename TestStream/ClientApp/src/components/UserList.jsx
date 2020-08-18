import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
//import Cookies from 'universal-cookie'
import CustomizedSnackbars, { } from './CustomizedSnackbars'
const getUrl = '/api/customer';




export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userId: 0,
            showPopup: false,
            setOpen: false,
            open: false,
            setOpenSnack: false,
            openSnack: false,
            isSuccess: false,
            mode: '',
            message: '',
            fields: {
                name: '',
                image: '',
                url: '',
            }
        }
    }
    componentDidMount(e) {
        this.getUserList();
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    getUserList() {
        axios.get(getUrl)
            .then(response => {
                const { data } = response.data;
                this.setState({ users: data });
                console.log("users", this.state.users)
            })
            .catch(error => console.log(error))
    }
    handleClickOpen(id) {
        this.setState({ mode: 'delete' })
        //console.log("mode:",this.state.mode)
        this.setState({ setOpen: true, open: true, userId: id })
        this.setState({ message: "آیا مایل به حذف کاربر هستید؟" })
        //this.handleDelete(id)
    }
    handleClose() {
        this.setState({ setOpen: false, open: false })
    }
    handleDelete(id) {
        const { userId } = this.state;
        this.setState({ mode: 'submit' })
        // if (window.confirm("Do you want delete this User?")) {
        axios.delete(`/api/customer/${userId}`)
            .then(response => {
                this.setState({ open: true, message: "کاربر مورد نظر باموفقیت حذف شد" });
                this.getUserList();
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
            <div className="table-responsive box-body">
                <Link className="btn btn-success" to={{ pathname: '/user-profile', state: { mode: 'add' } }}  >افزودن+</Link>
                <br />
                <table style={{
                    fontFamily: 'arial',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>شماره</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نام</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>URL</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>عکس</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>ویرایش</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>حذف</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>برنامه پخش</th>
                        </tr>
                    </thead>
                {this.state.users.map((customer, index) => 
                    <tbody >
                        <tr>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{customer.id}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{customer.name}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{customer.url}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{customer.name}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <Link className="btn btn-primary" to={{ pathname: '/user-profile', state: { userId: customer.id, mode: 'edit' } }} >ویرایش </Link></td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <button className="btn btn-danger" color="red" onClick={() => { this.handleClickOpen(customer.id) }}> حذف</button></td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <Link className="btn btn-warning" to={{ pathname: '/user-program', state: { userId: customer.id, mode: 'add' } }} >افزودن برنامه </Link></td>
                        </tr>
                    </tbody>
                    )}
                </table>

 
                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} handleRequest={this.handleDelete.bind(this)} />
            </div>
        )
    }
}