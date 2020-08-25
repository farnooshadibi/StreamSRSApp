import React, { Component } from 'react';
import { Container } from '@material-ui/core';






export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.open !== this.state.open) {
            this.setState({ open: props.open });
        }
    }
    handleClick() {
        this.setState({ open: true })
    }
    handleClose() {
        this.setState({ open: false })
    }
    render() {
        //const { message, action } = this.props
        if (this.props.open) {
            return (
                <Container>
                    <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">Well done!</h4>
                        <p> تبت اطلاعات با موفقیت انجام شد، کارشناسان ما در اسرع وقت با شما تماس می گیرند</p>
                        <hr />
                        <p class="mb-0">بازگشت</p>
                    </div>
                </Container>
            );
        } else {
            return (<div> </div>);
        }
    }
}



