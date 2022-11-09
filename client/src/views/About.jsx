import { Facebook, Instagram, Pinterest, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ManhImg from '../assets/manh.png'
import QuangImg from '../assets/quang.jpg'
import TuanAnhImg from '../assets/tuananh.png'

export default function About() {
    return (
        <div className="about">
            <div className="aboutContainer">
                <div className="aboutTitle">
                    <span className="aboutTitleSm">Something about us</span>
                    <span className="aboutTitleLg">We are Ute-ers</span>
                    <span className="aboutTitleDesc">How do we know each other?</span>
                </div>
                <div className="aboutList">
                    <div className="aboutListItem item1">
                        <img src={QuangImg} alt="" className="aboutImg" />
                        <p className="aboutInfo">Front-end</p>
                        <span className="aboutName">Trần Văn Quang - 19110271</span>
                        <div className="aboutContact">
                            <Link className="link" to={{ pathname: "https://www.facebook.com/tomo.quang.0901" }} target="_blank" >
                                <Facebook className="aboutIcon"/>
                            </Link>     
                            <Link className="link" to={{ pathname: "https://www.facebook.com/tomo.quang.0901" }} target="_blank" >
                                <Instagram className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/tomo.quang.0901" }} target="_blank" >
                                <Twitter className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/tomo.quang.0901" }} target="_blank" >
                                <Pinterest className="aboutIcon"/>
                            </Link>
                        </div>
                </div>
                <div className="aboutListItem item2">
                    <img src={ManhImg } alt="" className="aboutImg" />
                        <p className="aboutInfo">Back-end</p>
                        <span className="aboutName">Lê Nguyễn Đức Mạnh - 19110240</span>
                        <div className="aboutContact">
                            <Link className="link" to={{ pathname: "https://www.facebook.com/LeStark.manh05" }} target="_blank" >
                                <Facebook className="aboutIcon"/>
                            </Link>     
                            <Link className="link" to={{ pathname: "https://www.facebook.com/LeStark.manh05" }} target="_blank" >
                                <Instagram className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/LeStark.manh05" }} target="_blank" >
                                <Twitter className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/LeStark.manh05" }} target="_blank" >
                                <Pinterest className="aboutIcon"/>
                            </Link>
                        </div>
                </div>
                <div className="aboutListItem item3">
                    <img src={TuanAnhImg} alt="" className="aboutImg" />
                        <p className="aboutInfo">Back-end</p>
                        <span className="aboutName">Ngô Bùi Tuấn Anh - 19110163</span>
                        <div className="aboutContact">
                            <Link className="link" to={{ pathname: "https://www.facebook.com/Kabuto.Hido" }} target="_blank" >
                                <Facebook className="aboutIcon"/>
                            </Link>     
                            <Link className="link" to={{ pathname: "https://www.facebook.com/Kabuto.Hido" }} target="_blank" >
                                <Instagram className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/Kabuto.Hido" }} target="_blank" >
                                <Twitter className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/Kabuto.Hido" }} target="_blank" >
                                <Pinterest className="aboutIcon"/>
                            </Link>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}
