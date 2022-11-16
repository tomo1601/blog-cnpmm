import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "../css/Footer.css";

const Footer = () => {
    const {authState: {isAuthenticated}} = useContext(AuthContext)
    
    let body
  
    if(isAuthenticated){
      body = (
        <footer className='utew'>
          <div className='footer animated fadeIn'>
            <div className='footer__container'>
              <div className='columns'>
                <div className='column is-hidden-mobile'>
                  <ul className='footer__link'>
                    <li className='footer__link-head'>Life Stories</li>
                    <li>Gaming</li>
                    <li>New</li>
                    <li>League of legend</li>
                    <li>Policy</li>
                  </ul>
                </div>
                <div className='column'>
                  <ul className='footer__link '>
                    <li className='footer__link-head'>For you</li>
                    <li>Create new Stories</li>
                    <li>Contact</li>
                    <li>Services</li>
                  </ul>
                </div>
                <div className='column'>
                  <ul className='footer__link '>
                    <li className='footer__link-head'>Headquater</li>
                    <li>Ho Chi Minh</li>
                  </ul>
                </div>
                <div className='column'>
                  <ul className='footer__link '>
                    <li className='footer__link-head'>Help</li>
                    <li>FaceBook  </li>
                    <li>Messenger</li>
                    <li>Email</li>
                    <li>A&Q</li>
                  </ul>
                </div>
                <div className='column'>
                  <iframe 
                    src = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8608.202565779875!2d106.77194854733025!3d10.850817852681455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUcC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1664989342060!5m2!1svi!2s" 
                    width = '150' 
                    height="150" 
                    style = {{border: 0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">

                  </iframe>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #fff ", marginLeft: 20, marginRight: 20 }}>

              </div>
            </div>
          </div>
        </footer>
        
      )
    }
  
    return (
      <>
        {body}
      </>
      
    )
}

export default Footer