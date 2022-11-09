import { Facebook, Instagram, Pinterest, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./about.css"

export default function About() {
    return (
        <div className="about">
            <div className="aboutContainer">
                <div className="aboutTitle">
                    <span className="aboutTitleSm">Something about us</span>
                    <span className="aboutTitleLg">We are giang hoa-ers</span>
                    <span className="aboutTitleDesc">How do we know each other?</span>
                </div>
                <div className="aboutList">
                    <div className="aboutListItem item1">
                        <img src="https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/69873628_2572541156306706_8821361195278663680_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=B_nDW5QyU6oAX93SZCE&_nc_ht=scontent.fdad3-3.fna&oh=adcd8c541d89bcbf9c53d40dd8826119&oe=61AAB0E0" alt="" className="aboutImg" />
                        <p className="aboutInfo">Thông tin ghi vào đây</p>
                        <span className="aboutName">Đoàn Phan Nguyên - 19110248</span>
                        <div className="aboutContact">
                            <Link className="link" to={{ pathname: "https://www.facebook.com/dpn2408/" }} target="_blank" >
                                <Facebook className="aboutIcon"/>
                            </Link>     
                            <Link className="link" to={{ pathname: "https://www.facebook.com/dpn2408/" }} target="_blank" >
                                <Instagram className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/dpn2408/" }} target="_blank" >
                                <Twitter className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/dpn2408/" }} target="_blank" >
                                <Pinterest className="aboutIcon"/>
                            </Link>
                        </div>
                </div>
                <div className="aboutListItem item2">
                    <img src="https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/243687139_1952001148325983_5679396935155305395_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=bOIr8uN0lrEAX_B6DQK&tn=XIwUrkcwVGytIlAg&_nc_ht=scontent.fdad3-2.fna&oh=10f67fa30e806a69137b74ffb8275561&oe=61AB417B" alt="" className="aboutImg" />
                        <p className="aboutInfo">Thông tin ghi vào đây</p>
                        <span className="aboutName">Đoàn Hoàng Phúc - 19110264</span>
                        <div className="aboutContact">
                            <Link className="link" to={{ pathname: "https://www.facebook.com/hoangphuc.jr" }} target="_blank" >
                                <Facebook className="aboutIcon"/>
                            </Link>     
                            <Link className="link" to={{ pathname: "https://www.facebook.com/hoangphuc.jr" }} target="_blank" >
                                <Instagram className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/hoangphuc.jr" }} target="_blank" >
                                <Twitter className="aboutIcon"/>
                            </Link>  
                            <Link className="link" to={{ pathname: "https://www.facebook.com/hoangphuc.jr" }} target="_blank" >
                                <Pinterest className="aboutIcon"/>
                            </Link>
                        </div>
                </div>
                <div className="aboutListItem item3">
                    <img src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/248366546_2985795601688008_6326364072361637139_n.jpg?_nc_cat=101&_nc_rgb565=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=dp5UUMdyvI0AX8p7Ols&_nc_ht=scontent.fdad3-4.fna&oh=ee6cb125983b88b5f28646af5f01a539&oe=61AB1371" alt="" className="aboutImg" />
                        <p className="aboutInfo">Thông tin ghi vào đây</p>
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
                </div>
            </div>
        </div>
    )
}
