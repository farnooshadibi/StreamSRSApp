import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import Footer from './Footer';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu auth={this.props.auth} logout={this.props.logout} />
                <div>
                    {this.props.children}
                </div>
                <Footer className="footer" />
            </div>
        );
    }
}
