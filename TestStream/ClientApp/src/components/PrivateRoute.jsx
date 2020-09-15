import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default class PrivateRoute extends Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired

    }

    render() {
        const { component: Component, auth: isAuthenticate, ...restProps } = this.props;
        return (
            <Route  {...restProps} render={(props) => (
              //  isAuthenticate ? (
                    <Component {...props} auth={isAuthenticate}/>
             //   )
                   // : ( null
                        //<div className="container">
                        //    <p> به منظور ارسال نظر و لایک ابتدا لازم است با حساب کاربری خود وارد شوید</p>
                        //    <Link className="btn btn-success" style={{ marginBottom:'500px' }} to={{ pathname: "/login", state: { from: this.props.location } }}  >ورود </Link>
                        //    {/*<Redirect to={{ pathname: "/login", state: { from: this.props.location } }} />*/}
                        //</div>)
                  //      )
            )} />
        )
    }
}