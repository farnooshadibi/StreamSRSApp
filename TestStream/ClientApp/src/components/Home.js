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
                <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                                src="https://lh3.googleusercontent.com/TXdmAkU48xY7A1D6y7DhFXgAfT4PBea1MNpXLh4KZm6MDMTC-DuSu46BPsUAWYAp5p2VvhSulhUdR8tfZpnSrJLqOnImvL3p1yUJKxPhSutTVtIADmBBPcM_zD5wua9ObmhMYBxr3uoE33QgFDdjUYIihJxWiYIrlrq95NGhnsutNddbTmA2B9ez_ln27vBAQsPrb7shzGauUILq6U8RqmAeDYuYTOQe8b2tUI52TCIIBOduOfEsIU8WLiZC67QIfT7DOPJOtzJdxSb0Dm3EuD4VqSbt2oFugICCYCNjWBz57JuRBCUickhBSTgAGcqL8faVkR7Wmmmz8_gcW25RVU5RavfS4YerRdtIH1ouUurSNFIKgEKpQ6aIW6znJGuJDagNaU5rAYRhdvS5LsN9M3xGYZCtwunJrUXNsdoqTMTTLznPJLjRK0FVjDu6aBbxLRADPkA4SPqjzgRtKCsQGePu_Cc02QMS6xvCQawPA0KdEYXFp20To3V82wzygPNX1tytMq0tUHuL8ieNyCSLci_8aOvf6Ul-sExnH6UA9kGL_oWpxJhUeODtPjSh3GtrkS94WsFu4w_axhHSUG6VtQ8qOeUn1b6IjhsEc6_iYnnGqmqDqUp6uMYEHP8jjoOS7yIqpS20Un-tB8bwFpsMPGXSzkQYJswIcB8y8GZYLhOnZYOSIfbif0g3r8S2O2UovKecs_2kGxfIjO4pJ4U=w1560-h924-no"
                                alt="First slide"
                                width="80%"
                                height="auto"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Cuesta_del_obispo_01.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                                src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/130238819/original/d4096d4950eba421600f21c6c753c19375222eb6/draw-you-a-landscape-image-with-ms-paint.png"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </div>
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