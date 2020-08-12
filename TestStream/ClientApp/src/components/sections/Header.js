import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



export default class Header extends Component{
  goLogin(){
    window.location.href("/Login");
  }
 
    render(){
        return(

            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top rtl">
<Link className="navbar-brand" to="/">داشبورد</Link>
  <div className="navbar-collapse collapse" id="navbarsExampleDefault" >
    <ul className="navbar-nav mr-auto">  
    {/* <Link className="btn btn-success" style={{marginLeft:5}} to="/login">ورود</Link>
    <Button color="green">ثبت نام</Button>    
        <Link className="nav-link" to="/user">لیست کاربران</Link>

        <Link className="nav-link" to={{ pathname: '/user-profile', state: { mode:'add'} }}>افرودن کاربر جدید</Link>
        <Link className="nav-link" to="/About">درباره ما</Link> */}
    </ul>
    {/* <form className="form-inline my-2 my-lg-0 rtl">
      <input className="form-control mr-sm-2" type="text" placeholder="جستجو" aria-label="Search"/>
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">جستجو</button>
    </form> */}
  </div>
 </nav> 
        )
    }
}