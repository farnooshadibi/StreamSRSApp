import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
//import Cookies from 'universal-cookie'
import CustomizedSnackbars, { } from './CustomizedSnackbars'
import { Table, Button } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;
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

            <div className="box-body rtl" style={{ marginBottom: 100, marginLeft: 100, marginRight: 100 }}>
                <Link className="btn btn-success rtl" to={{ pathname: '/user-profile', state: { mode: 'add' } }}  >افزودن+</Link>
                <div>
                    <Table
                        height={500}
                        data={this.state.users}
                        onRowClick={data => {
                            console.log("data", data);
                        }}
                    >
                        <Column width={70} align="center" fixed>
                            <HeaderCell>شماره</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={200} fixed>
                            <HeaderCell>نام</HeaderCell>
                            <Cell dataKey="name" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>Url</HeaderCell>
                            <Cell dataKey="url" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell> عکس</HeaderCell>
                            <Cell dataKey="image" style={{ width: "100%", height: '78rem' }} />
                        </Column>

                        <Column width={120} fixed="right">
                            <HeaderCell>ویرایش</HeaderCell>

                            <Cell>
                                {rowData => {
                                    function handleAction() {
                                        alert(`id:${rowData.id}`);
                                    }
                                    return (
                                        <span>
                                            <Link to={{ pathname: '/user-profile', state: { userId: rowData.id, mode: 'edit' } }} >ویرایش </Link>
                                        </span>
                                    );
                                }}
                            </Cell>
                        </Column>
                        <Column width={120} fixed="right">
                            <HeaderCell>حذف</HeaderCell>

                            <Cell style={{ height: 100 }}>
                                {rowData => {
                                    return (
                                        <span>
                                            <Button appearance="subtle" color="red" onClick={() => { this.handleClickOpen(rowData.id) }}> حذف</Button>
                                        </span>
                                    );
                                }}
                            </Cell>
                        </Column>
                        <Column width={120} fixed="right">
                            <HeaderCell>افزودن برنامه</HeaderCell>

                            <Cell>
                                {rowData => {
                                    function handleAction() {
                                        alert(`id:${rowData.id}`);
                                    }
                                    return (
                                        <span>
                                            <Link to={{ pathname: '/user-program', state: { userId: rowData.id, mode: 'add' } }} >افزودن برنامه </Link>
                                        </span>
                                    );
                                }}
                            </Cell>
                        </Column>
                    </Table>
                </div>
                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} handleRequest={this.handleDelete.bind(this)} />
            </div>
        )
    }
}