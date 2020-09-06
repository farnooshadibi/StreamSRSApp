import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomizedSnackbars, { } from './CustomizedSnackbars';
const getUrl = '/api/festival';



export default class FestivalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            festivals: [],
            festivalId: 0,
            id: 0,
            showPopup: false,
            setOpen: false,
            open: false,
            setOpenSnack: false,
            openSnack: false,
            isSuccess: false,
            mode: '',
            message: '',
        }
    }
    componentDidMount(e) {
        this.getFestivalList();
    }
    handleCloseCustomizadSnack() {
        this.setState({ isSuccess: false })
    }
    getFestivalList() {
        axios.get(getUrl)
            .then(response => {
                const { data } = response.data;
                this.setState({ festivals: data });
            })
            .catch(error => console.log(error))
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
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>نام خانوادگی</th>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>شماره همراه</th>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>وضعیت</th>
                        <th scope="col" style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>جزییات</th>
                    </tr>
                </thead>
                {this.state.festivals.map((festival, index) =>
                    <tbody key={festival.id}>
                        <tr>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{festival.id}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{festival.firstName}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{festival.lastName}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{festival.mobile}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}>{festival.processed}</td>
                            <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: 8 }}> <Link className="btn btn-primary" to={{ pathname: '/festival-detail', state: { festivalId: festival.id, mode: 'edit' } }} >جزییات </Link></td>
                        </tr>
                    </tbody>
                )}
            </table>


            <CustomizedSnackbars action={this.state.mode} message={this.state.message} open={this.state.open} handleClose={this.handleCloseCustomizadSnack.bind(this)} />
        </div>
            )
    }
}
