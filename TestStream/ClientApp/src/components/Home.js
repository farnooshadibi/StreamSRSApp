import React, { Component } from 'react'
import axios from 'axios';
import VideoList from './VideoList';
import SearchBox from './SearchBox/SearchBox';
import Carousel from 'react-bootstrap/Carousel'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            searchField: ''
        }
    }

    componentDidMount() {
        axios.get('/api/customer')
            .then(response => {
                console.log("response", response);
                const { data } = response.data;
                this.setState({
                    customers: data
                })

            })
            .catch((error) => console.log(error))

    }

    handleSearch = (e) => {
        this.setState({ searchField: e.target.value });
    }

    render() {
        const { customers, searchField } = this.state;
        const filteredCustomers = customers.filter(customer => {
            return customer.name.toLowerCase().includes(searchField.toLowerCase());
        });
        console.log(this.state.customers)
        return (
            <div>

                <div className="text-center">
                    <SearchBox placeholder='جست و جو' handleSearch={this.handleSearch} />
                </div>

                <div className="row rtl">
                    {filteredCustomers.map((customer, index) => <VideoList key={index} customer={customer} />)}

                </div>


            </div>
        )
    }
} 