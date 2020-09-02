import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import authService from './api-authorization/AuthorizeService';



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

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            return this.anonymousView();
        } else {
            return this.authenticatedView();
        }
    }


    authenticatedView() {

        return (
            <div>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
                        <Container>
                            <NavbarBrand tag={Link} to="/">سوگواران</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} to="/">خانه</NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/user-list">مشتریان</NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/user-program-list">مدیریت برنامه های پخش</NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/stream-list">مدیریت استریم ها</NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/requester-list">مدیریت درخواست ها</NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/shrine-list-admin">حرم های مطهر </NavLink>
                                        <div className="active"></div>
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

    anonymousView() {
        return (
            <div>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark mb-3" style={{fontSize:'120%'} }>
                        <Container>
                            <NavbarBrand tag={Link} to="/">راهیان</NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} to="/">خانه</NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>       
                                        <NavLink tag={Link} to={{ pathname: '/requester', state: { mode: 'add' } }} >ثبت اطلاعات </NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to={{ pathname: '/festival', state: { mode: 'add' } }} >ثبت نام در جشنواره </NavLink>
                                        <div className="active"></div>
                                    </NavItem>
                                    <NavItem>
                                        
                                            <div className="text-center" style={{display:'flex'}}>
                                                <input className='searcho'
                                                    type='text'
                                                    placeholder="جستجو"
                                                    value={this.state.name}
                                                    onChange={(event) => { this.setState({ name: event.target.value }); }}
                                                />

                                            <Link className="btn btn-dark mybtn-search searchoButton" to={{ pathname: '/search-list', state: { filteredCustomer: [1, 2, 3], name: this.state.name } }} ><i className="fa fa-search" style={{ fontSize: '15px', color: 'white', padding: "2px 0 0 2px" }}></i> </Link>


                                                {/*<SearchBox placeholder='جست و جو' handleSearch={this.handleSearch.bind(this)} />*/}
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
}
