import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import Header from './sections/Header';
import authService from './api-authorization/AuthorizeService';
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';
import SearchBox from './SearchBox/SearchBox';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            //const registerPath = `${ApplicationPaths.Register}`;
            //const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView();//registerPath, loginPath);
        } else {
            //const profilePath = `${ApplicationPaths.Profile}`;
            //const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView();//userName, profilePath, logoutPath);
        }
    }


    authenticatedView() {//userName, profilePath, logoutPath) {

        return (
            <div>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
                        <Container>
                            <NavbarBrand tag={Link} to="/">عزاداران</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} to="/">خانه</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/user-list">مشتریان</NavLink>
                                    </NavItem>
                                    <LoginMenu>
                                    </LoginMenu>
                                </ul>
                            </Collapse>

                        </Container>
                    </Navbar>
                </header>
            </div>
        );
    }

    anonymousView() {//registerPath, loginPath) {
        return (
            <div>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark mb-3">
                        <Container>
                            <NavbarBrand tag={Link} to="/">عزاداران</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} to="/">خانه</NavLink>
                                        <div className="active"></div>
                                    </NavItem>

                                    <NavItem>
                                        <div className="text-center">
                                            <SearchBox placeholder='جست و جو' handleSearch={this.handleSearch} />
                                        </div>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
            </div>
        );
    }
    //render() {
    //    return (
    //        <header>
    //            <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
    //                <Container>
    //                    <NavbarBrand tag={Link} to="/">عزاداران</NavbarBrand>
    //                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
    //                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
    //                        <ul className="navbar-nav flex-grow">
    //                            <NavItem>
    //                                <NavLink tag={Link} to="/">خانه</NavLink>
    //                            </NavItem>
    //                            <NavItem>
    //                                <NavLink tag={Link} to="/user-list">مشتریان</NavLink>
    //                            </NavItem>
    //                            {/*<NavItem>
    //              <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
    //            </NavItem>*/}
    //                            <LoginMenu>
    //                            </LoginMenu>
    //                        </ul>
    //                    </Collapse>
    //                </Container>
    //            </Navbar>
    //        </header>
    //    );
    //}
}
