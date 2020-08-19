import React, { Component } from 'react'
import { Telegram, Whatsapp } from 'react-social-sharing'
import './programlist.css';
import ProgramList from './ProgramList';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SearchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredCustomer: [],
            name:''
        };
    }

    
    componentWillReceiveProps(nextProps) {
        // This will erase any local state updates!
        // Do not do this.
        this.setState({ name: nextProps.location.state });
        console.log(this.state.name);
        axios.post('/api/customer/SearchByName', this.state.name)
            .then(response => {
                const { data } = response.data;
                this.setState({ filteredCustomer: data });

                console.log(this.state.filteredCustomer)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {

        const name = this.props.location.state;

        axios.post('/api/customer/SearchByName', name)
            .then(response => {
                const { data } = response.data;
                this.setState({ filteredCustomer: data });

                console.log(this.state.filteredCustomer)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        //const { filteredCustomer, name } = this.props.location.state;
        //console.log("nnnnn", name);
        //const { filteredCustomer, mode } = this.props;

        return (
            <div>
                <div className="row">
                    <p>
                        نمایش نتایج جستجو
                    </p>
                </div>
                <div className="row">
                    {this.state.filteredCustomer.map((shrine, index) => <ProgramList key={index} customer={shrine} mode="shrine-detail" />)}
                </div>
            </div>
        )
    }
}