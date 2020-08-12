import React ,{Component} from 'react'
import {Link} from 'react-router-dom'


export default class NoMatch extends Component{
    render(){
        return(
            <div>
                <h2> صفحه مورد نظر یافت نشد ! </h2>
                <h3>بازگشت به صفحه اصلی <Link to="/">خانه</Link> </h3>
            </div>
        )
    }
}