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
            client: {},
            ip: '',
            type: '',
            url: '',
            tcUrl:'',
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
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        //fetch('http://185.194.76.58:1985/api/v1/clients')
        //        .then(res => res.json())
        //        .then(
        //            (result) => {
        //                const { data } = result.data;
        //                console.log("reeeee", result);
        //                this.setState({ users: data });
        //            },
        //            (error) => {
        //                this.setState({
        //                    isLoaded: true,
        //                    error
        //                });
        //            }
        //        )

        this.getUserList();
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
        getUserList() {
            //
            const https = require('https');
            const agent = new https.Agent({
                rejectUnauthorized: false
            });
            axios.get('http://185.194.76.58:1985/api/v1/clients', { httpsAgent: agent })
                .then(response => {
                    const { data } = response.data.clients;
                    console.log("r", response.data.clients);
                    console.log("data", data);
                    this.setState({ users: response.data.clients });
                    console.log("userrrrrrrr", this.state.users);
                })
                .catch(error => console.log(error))
        }
    handleClickOpen(id, client) {
        console.log("clientttttt", client);
        this.setState({ mode: 'delete', client: client });
        console.log("client", this.state.client);
      //  this.handleRequest();
        //console.log("mode:",this.state.mode)
        this.setState({ setOpen: true, open: true, userId: id })
        this.setState({ message: "آیا مایل به حذف استریم کاربر هستید؟" })
        //this.handleDelete(id)
    }
    handleRequest() {
        //const { name, image } = this.state;
        axios.post('/api/customer/PostBlockedIp', this.state.client )
            .then(response => {
                this.setState({ isSuccess: true, message: "ثبت  با موفقیت انجام شد" });
            })
            .catch((error) => {
                console.log(error)
                this.setState({ isSuccess: true, mode: 'error', message: 'Error has occurred' })
            }
            )
    }
    handleClose() {
        this.setState({ setOpen: false, open: false })
    }
    handleDelete(id) {
        const { userId } = this.state;
        console.log("id", userId);
        this.setState({ mode: 'submit' });
        // if (window.confirm("Do you want delete this User?")) {
        this.handleRequest();
        axios.delete(`http://185.194.76.58:1985/api/v1/clients/${userId}`)
            .then(response => {
                this.setState({ open: true, message: "استریم مورد نظر باموفقیت حذف شد" });
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
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>type</th>
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
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.type}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.url}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{client.publish}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <button className="btn btn-danger" color="red" onClick={() => { this.handleClickOpen(client.id, client) }}> قطع ارتباط</button></td>
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
