import React from 'react'
import { Telegram, Whatsapp, Twitter } from 'react-social-sharing'

const Footer = () => {
  return(
<footer className="page-footer font-small teal pt-4">
          <div style={{ backgroundColor: "#171717", color: "#ffffff"}} className="footer-copyright text-center py-3">© 2020 Copyright: 
              <a style={{ textDecoration: 'none', color: '#fff' }} href="http://aminmvno.com/"> راهکار کسب و کار هوشمند امین </a>
              <div style={{color:"#fff"}}>
                  <Whatsapp simpleReverse link="http://aminmvno.com/%D8%AA%D9%85%D8%A7%D8%B3-%D8%A8%D8%A7-%D9%85%D8%A7/" />
                  <Telegram simpleReverse link="http://aminmvno.com/%D8%AA%D9%85%D8%A7%D8%B3-%D8%A8%D8%A7-%D9%85%D8%A7/" />
                  <Twitter simpleReverse link="http://aminmvno.com/%D8%AA%D9%85%D8%A7%D8%B3-%D8%A8%D8%A7-%D9%85%D8%A7/" />
              </div>
          </div>

</footer>
)
}
export default Footer;