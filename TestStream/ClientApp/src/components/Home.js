import React, { Component } from 'react'
import axios from 'axios';
import VideoList from './VideoList';
import SearchBox from './SearchBox/SearchBox';


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

                <div className="jumbotron rtl">
                    <div className="container">
                        <h3 >وب‌سایت </h3>
                        <p>لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.</p>
                    </div>
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