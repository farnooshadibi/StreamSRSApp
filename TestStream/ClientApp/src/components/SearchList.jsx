import React, { Component } from 'react';
import './programlist.css';
import ProgramList from './ProgramList';
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
        this.setState({ name: nextProps.location.state });
        console.log("nextProps", nextProps.location.state);
        console.log("name", this.state.name);
        axios.post('/api/customer/SearchByName', nextProps.location.state)
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
        return (
            <div>
                <div className="row">
                    <p className="paraph">
                        نمایش نتایج جستجو
                    </p>
                </div>
                <div className="row" style={{ marginBottom:"19%" }}>
                    {this.state.filteredCustomer.map((shrine, index) => <ProgramList key={index} customer={shrine} mode="shrine-detail" />)}
                </div>
            </div>
        )
    }
}