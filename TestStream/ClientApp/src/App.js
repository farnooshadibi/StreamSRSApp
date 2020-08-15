import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './styles/css/bootstrap.min.css';
import './styles/css/bootstrap-rtl.min.css';
import 'rsuite/dist/styles/rsuite-default-rtl.css';
import Header from './components/sections/Header';
//import { Route, Switch } from 'react-router-dom';
import NoMatch from './components/NoMatch';
import User from './components/User';
import UserList from './components/UserList';
import AdminLogin from './components/AdminLogin';
import VideoDetail from './components/VideoDetail';
import Main from './components/Main';
import Footer from './components/Footer';



import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <div>
            {/*<Header />*/}
            <Layout>

                <Route exact path='/' component={Home} />
                <AuthorizeRoute path="/user-list" component={UserList} />
                <AuthorizeRoute path="/user-profile" component={User} />
                <AuthorizeRoute path="/user-profile/:id" component={User} />
                <Route path="/video-detail/:id" component={VideoDetail} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

              </Layout>
              <Footer />
        </div >
    );
  }
}
