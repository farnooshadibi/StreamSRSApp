import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import Header from './sections/Header';
import axios from 'axios';
import authService from './api-authorization/AuthorizeService';
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';
import SearchBox from './SearchBox/SearchBox';
import ProgramList from './ProgramList';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthenticated: false,
            userName: null,
            name: '',
            filteredCustomer: []
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

    handleSearch(e) {
        e.preventDefault();
        const name = this.state;

        axios.post('/api/customer/SearchByName', name)
            .then(response => {
                const { data } = response.data;
                this.setState({ filteredCustomer: data });

                console.log(this.state.filteredCustomer)
            })
            .catch((error) => {
                console.log(error)
            })

        //const url = '/search-list';
        //window.open(url, '_blank');
        //window.location.href('/shrine-list');
        // this.props.history.push('/shrine-list');

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
                                        <form onSubmit={this.handleSearch.bind(this)}>
                                            <div className="text-center">
                                                <input className='search'
                                                    type='text'
                                                    placeholder="جستجو"
                                                    value={this.state.name}
                                                    onChange={(event) => { this.setState({ name: event.target.value }); }}
                                                />
                                                <button className="btn"> <Link className="btn btn-light " to={{pathname: '/search-list', state: { filteredCustomer: [1, 2, 3], name: this.state.name } }} >جستجو </Link></button>
                                                {/*<SearchBox placeholder='جست و جو' handleSearch={this.handleSearch.bind(this)} />*/}
                                            </div>
                                        </form>

                                       
                                    </NavItem>

                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
                {/*  <div className="row">
                    {this.state.filteredCustomer.map((shrine, index) => <ProgramList key={index} customer={shrine} mode="shrine-detail" />)}
                </div> */}
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
