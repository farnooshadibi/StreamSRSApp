import React from 'react'
import { Telegram, Whatsapp, Twitter } from 'react-social-sharing'

const Footer = () => {
  return(
<footer className="page-footer font-small teal pt-4 myfooter">
          <div style={{ backgroundColor: "#171717", color: "#ffffff"}} className="footer-copyright text-center py-3">© 2020 Copyright: 
              <a style={{ textDecoration: 'none', color: '#fff' }} href="http://aminmvno.com/"> راهکار کسب و کار هوشمند امین </a>
              <div style={{color:"#fff"}}>
                  <Whatsapp simpleReverse link="soogvaran.daan.ir" />
                  <Telegram simpleReverse link="soogvaran.daan.ir" />
                  <Twitter simpleReverse link="soogvaran.daan.ir" />
              </div>
          </div>

</footer>
)
}
export default Footer;