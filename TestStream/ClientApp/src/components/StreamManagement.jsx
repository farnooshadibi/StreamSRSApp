import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomizedSnackbars, { } from './CustomizedSnackbars';
const getUrl = 'http://185.194.76.58:1985/api/v1/clients';




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
        axios.get('https://185.194.76.58:1985/api/v1/clients')
            .then(response => {
                const { data } = response.data;
                console.log("r", response);
                this.setState({ users: data });
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
                <br />
                <table style={{
                    fontFamily: 'arial',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>id</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>stream</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>ip</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>swfUrl</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>Url</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>publish</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>قطع ارتباط</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نمایش </th>
                        </tr>
                    </thead>
                    {this.state.users.map((client, index) =>
                        <tbody >
                            <tr>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.id}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.stream}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.ip}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.swfUrl}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.Url}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.publish}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <button className="btn btn-danger" color="red" onClick={() => { this.handleClickOpen(client.id) }}> قطع ارتباط</button></td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <Link className="btn btn-warning" to={{ pathname: '/user-program', state: { userId: client.id, mode: 'add' } }} >نمایش </Link></td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} handleRequest={this.handleDelete.bind(this)} />
            </div>
        )
    }
}
