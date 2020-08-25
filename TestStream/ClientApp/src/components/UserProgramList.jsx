import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomizedSnackbars, { } from './CustomizedSnackbars';
const getUrl = '/api/playList';




export default class UserProgramList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            programs: [],
            ProgramId: 0,
            id:0,
            setOpen: false,
            open: false,
            isSuccess: false,
            mode: '',
            message: '',
            name: '',
            url: '',
            image: '',
            startTime: new Date(),
            endTime: new Date(),
            description: '',
            performerName: '',
            lamenter: '',
            eventPlace: '',
            customerId: 0,


        }
    }
    componentDidMount(e) {
        this.getUserProgramList();
    }
    getUserProgramList() {
        axios.get(getUrl)
            .then(response => {
                const { data } = response.data;
                this.setState({ programs: data });
            })
            .catch(error => console.log(error))
    }
    handleClickOpen(id) {
        this.setState({ mode: 'delete', setOpen: true, open: true, ProgramId: id, message: "آیا مایل به حذف برنامه کاربر هستید؟" });
    }
    handleClose() {
        this.setState({ setOpen: false, open: false })
    }
    handleDelete(id) {
        const { ProgramId } = this.state;
        this.setState({ mode: 'submit' })
        axios.delete(`/api/playList/${ProgramId}`)
            .then(response => {
                this.setState({ open: true, message: "برنامه مورد نظر باموفقیت حذف شد" });
                this.getUserProgramList();
            })
            .catch((error) => {
                console.log(error);
                this.setState({ open: true, mode: 'error', message: 'حذف با خطا مواجه شد' })

            })
        this.setState({ open: false })
    }
    handleCloseCustomizadSnack() {
        this.setState({ open: false })
    }
    render() {
        return (
            <div className="box-body user-listp">
                <br />
                <table style={{
                    fontFamily: 'arial',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>شماره</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نام</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>زمان شروع</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>زمان پایان</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>توضیحات</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نام مداح</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>سخنران</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>محل برگزاری</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>ویرایش</th>
                            <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>حذف</th>
                        </tr>
                    </thead>
                    {this.state.programs.map((program, index) => 
                    <tbody >
                        <tr>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.id}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.name}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.startTime}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.endTime}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.description}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.lamenter}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.performerName}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{program.eventPlace}</td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <Link className="btn btn-primary" to={{ pathname: '/user-program', state: { programId: program.id, mode: 'edit' } }} >ویرایش </Link></td>
                                <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <button className="btn btn-danger" color="red" onClick={() => { this.handleClickOpen(program.id) }}> حذف</button></td>
                        </tr>
                    </tbody>
                    )}
                </table>

 
                <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} handleRequest={this.handleDelete.bind(this)} />
            </div>
        )
    }
}