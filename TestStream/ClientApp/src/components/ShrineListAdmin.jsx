import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
//import Cookies from 'universal-cookie'
import CustomizedSnackbars, { } from './CustomizedSnackbars'
const getUrl = '/api/shrine/getShrines';




export default class ShrineListAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shrines: [],
            shrineId: 0,
            id: 0,
            showPopup: false,
            setOpen: false,
            open: false,
            setOpenSnack: false,
            openSnack: false,
            isSuccess: false,
            mode: '',
            message: '',
            name: '',
            url: '',
            image: '',
            isActive: false,
            description: ''
        }
    }
    componentDidMount(e) {
        this.getShrineList();
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    getShrineList() {
        axios.get(getUrl)
            .then(response => {
                const { data } = response.data;
                this.setState({ shrines: data });
            })
            .catch(error => console.log(error))
    }
    handleClickOpen(id) {
        this.setState({ mode: 'delete', setOpen: true, open: true, shrineId: id, message: "آیا مایل به حذف حرم مطهر هستید؟" });
    }

    handleClose() {
        this.setState({ setOpen: false, open: false })
    }
    handleDelete(id) {
        const { shrineId } = this.state;
        this.setState({ mode: 'submit' })
        // if (window.confirm("Do you want delete this User?")) {
        axios.delete(`/api/customer/${shrineId}`)
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
            <div className="box-body user-listp">
                <Link className="btn btn-success add-button" to={{ pathname: '/shrine', state: { mode: 'add' } }}  >افزودن+</Link>
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
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>توضیحات</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>فعال</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>ویرایش</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>حذف</th>

                        </tr>
                    </thead>
                    {this.state.shrines.map((shrine, index) =>
                        <tbody >
                            <tr>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{shrine.id}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{shrine.name}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{shrine.url}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{shrine.description}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{shrine.isActive ? <p> فعال</p> : <p> غیر فعال </p>}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <Link className="btn btn-primary" to={{ pathname: '/shrine', state: { shrineId: shrine.id, mode: 'edit' } }} >ویرایش </Link></td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <button className="btn btn-danger" color="red" onClick={() => { this.handleClickOpen(shrine.id) }}> حذف</button></td>

                            </tr>
                        </tbody>
                    )}
                </table>


                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} handleRequest={this.handleDelete.bind(this)} />
            </div>
        )
    }
}
