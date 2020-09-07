import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomizedSnackbars, { } from './CustomizedSnackbars';
const getUrl = '/api/festival/getCommentsList';



export default class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentId: 0,
            id: 0,
            approve: true,
            showPopup: false,
            setOpen: false,
            open: false,
            setOpenSnack: false,
            openSnack: false,
            isSuccess: false,
            mode: 'add',
            message: '',

        }
    }

    componentDidMount(e) {
        this.getCommentList();
    }
    getCommentList() {
        axios.get(getUrl)
            .then(response => {
                const { data } = response.data;
                this.setState({ comments: data });
            })
            .catch(error => console.log(error))
    }
    handleCloseCustomizadSnack() {
        this.setState({ open: false });
    }
    handleClickOpen(id) {
        this.setState({ mode: 'delete', setOpen: true, open: true, id: id, message: "آیا مایل به تایید کامنت هستید؟" });
    }
    handleRequest() {
        const { id, approve } = this.state;
        axios.post('/api/festival/approveComment', { id, approve })
            .then(response => {
                this.setState({ isSuccess: true, mode: 'add', message: "تایید اطلاعات با موفقیت انجام شد" });
                this.getCommentList();
            })
            // .then(this.props.history.push('/user'))
            .catch(error => {
                console.log(error);
                this.setState({ isSuccess: true, mode: 'error', message: 'تایید با خطا مواجه شد' })

            })
    }
    render() {
        return (<div className="box-body user-listp">
            <table style={{
                fontFamily: 'arial',
                borderCollapse: 'collapse'
            }}>
                <thead>
                    <tr>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>شماره</th>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نام</th>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>متن </th>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>وضعیت </th>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>تایید</th>
                    </tr>
                </thead>
                {this.state.comments.map((comment, index) =>
                    <tbody >
                        <tr>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{comment.id}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{comment.name}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{comment.text}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{comment.approve == true ? 'تایید شده' : 'تایید نشده'}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <button className="btn btn-info" onClick={() => { this.handleClickOpen(comment.id) }}> تایید</button></td>
                        </tr>
                    </tbody>
                )}
            </table>


            <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} handleRequest={this.handleRequest.bind(this)} />
        </div>
            )
    }
}
