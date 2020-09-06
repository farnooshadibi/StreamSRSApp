import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './styles/css/bootstrap.min.css';
import User from './components/User';
import UserList from './components/UserList';
import VideoDetail from './components/VideoDetail';
import ShrineDetail from './components/ShrineDetail';
import Requester from './components/Requester'
import ShrineList from './components/ShrineList';
import UserProgram from './components/UserProgram';
import './custom.css';
import SearchList from './components/SearchList';
import StreamManagement from './components/StreamManagement';
import RequesterList from './components/RequesterList';
import UserProgramList from './components/UserProgramList';
import Shrine from './components/Shrine';
import ShrineListAdmin from './components/ShrineListAdmin';
import Gallery from './components/Gallery';
import Service from './components/Service';
import Festival from './components/Festival';
import FestivalList from './components/FestivalList';
import FestivalDetail from './components/FestivalDetail';


export default class App extends Component {
    static displayName = App.name;


    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/video-detail2/:id" component={VideoDetail} />
                    <Route exact path="/shrine-detail2/:id" component={ShrineDetail} />
                    <Route path="/requester2" component={Requester} />
                    <Route path="/">
                        <Layout>

                            <Route exact path='/' component={Home} />
                            <AuthorizeRoute path="/user-list" component={UserList} />
                            <AuthorizeRoute path="/user-profile" component={User} />
                            <AuthorizeRoute path="/user-profile/:id" component={User} />
                            <AuthorizeRoute path="/user-program" component={UserProgram} />
                            <AuthorizeRoute path="/user-program/:id" component={UserProgram} />
                            <AuthorizeRoute path="/user-program-list" component={UserProgramList} />
                            <AuthorizeRoute path="/shrine" component={Shrine} />
                            <AuthorizeRoute path="/shrine/:id" component={Shrine} />
                            <AuthorizeRoute path="/shrine-list-admin" component={ShrineListAdmin} />
                            <AuthorizeRoute path="/requester-list" component={RequesterList} />
                            <AuthorizeRoute path="/requestReview" component={Requester} />
                            <AuthorizeRoute path="/requestReview/:id" component={Requester} />
                            <AuthorizeRoute path="/festival-list" component={FestivalList} />
                            <AuthorizeRoute path="/festival-detail" component={FestivalDetail} />
                            <Route path="/video-detail/:id" component={VideoDetail} />
                            <Route path='/counter' component={Counter} />
                            <AuthorizeRoute path='/fetch-data' component={FetchData} />
                            <Route path="/shrine-list" component={ShrineList} />
                            <Route path="/shrine-detail/:id" component={ShrineDetail} />
                            <Route path="/search-list" component={SearchList} />
                            <Route path="/stream-list" component={StreamManagement} />
                            <Route path="/requester" component={Requester} />
                            <Route path="/service" component={Service} />
                            <Route path="/festival" component={Festival} />
                            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                            <Route exact path="/gallery" component={() => <Gallery />} />
                            <Route exact path="/gallery/images" component={() => <Gallery mode='images' />}/>
                            <Route exact path="/gallery/videos" component={() => <Gallery mode='videos' />} />
                            <Route exact path="/gallery/audios" component={() => <Gallery mode='audios' />} />
                        </Layout>
                    </Route>
                </Switch>
            </div >
        );
    }
}
