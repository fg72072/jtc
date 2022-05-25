import { Link,useLocation } from "react-router-dom";
import { useState,useEffect, memo } from 'react';
import Logo from '../assets/images/logo.png'
import Hes from '../assets/images/hes.png'
import Token from '../assets/images/token.png'
import Payment from '../assets/images/payment.png'
import Stake from '../assets/images/stake.png'
import Calculator from '../assets/images/calculator.png'
import News from '../assets/images/news.png'
import Disclaimer from '../assets/images/disclaimer.png'
import Partners from '../assets/images/partners.png'
import Team from '../assets/images/team.png'
import Admin from '../assets/images/admin.png'

import GreenHes from '../assets/images/green-hes.png'
import GreenToken from '../assets/images/green-token.png'
import GreenPayment from '../assets/images/green-payment.png'
import GreenStake from '../assets/images/green-stake.png'
import GreenCalculator from '../assets/images/green-calculator.png'
import GreenNews from '../assets/images/green-news.png'
import GreenDisclaimer from '../assets/images/green-disclaimer.png'
import GreenPartners from '../assets/images/green-partners.png'
import GreenTeam from '../assets/images/green-team.png'
import GreenAdmin from '../assets/images/green-admin.png'


function SideBar(props)
{
    const location = useLocation()
    const [url,setUrl] = useState(location.pathname)
    useEffect(() => {
        setUrl(location.pathname);
    })

    function closeNav() {
        var x = window.matchMedia("(max-width: 768px)")
        if (x.matches) { 
        document.getElementById("sidebar").style.width = "0";
        }
        // document.getElementById("sidebar").style.position = "sticky";
    }
    return <>
    <div className="sidebar" id="sidebar">
        <div className="close-nav-section">
        <div className="logo">
            <img src={Logo}/>
            <h4 className="primary-text">JTC</h4>
        </div>
        <i class="fa-solid fa-times close-sidebar-icon" onClick={closeNav}></i>
        </div>

        <div className="sidebar-scroll">
        <ul className="sidebar-ul">
            <li className={url == "/" ? "active" :''}>
                <Link to={"/"} onClick={closeNav}><i class="fa-solid fa-house-user"></i><span>Dashboard</span></Link>
            </li>
            <li className={url == "/user" ? "active" :''}>
                <Link to={"/user"} onClick={closeNav}><i class="fa-solid fa-users"></i><span>User</span></Link>
            </li>
        </ul>
        </div>
    </div>
</>
}
export default memo(SideBar);