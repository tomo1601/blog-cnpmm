import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "../css/Footer.css";
import { Facebook, Instagram, Pinterest, Twitter } from '@mui/icons-material';


const Footer = () => {
  const { authState: { isAuthenticated } } = useContext(AuthContext)

  let body

  if (isAuthenticated) {
    body = (
      <footer className='utew'>
        <div className='footer animated fadeIn' style={{ borderTop: "rgb(208 196 196)" }}>
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
                <div className="sidebarItem">
                  <span className="sidebarTitle">FOLLOW US</span>
                  <div className="sidebarSocial">
                    <Facebook className="sidebarIcon" />
                    <Instagram className="sidebarIcon" />
                    <Pinterest className="sidebarIcon" />
                    <Twitter className="sidebarIcon" />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #000 ", marginLeft: 20, marginRight: 20 }}>

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