import { useWeb3React } from "@web3-react/core";
import { connectWallet } from "../utils/connectWallet";
import Metamask from '../assets/images/metamask.png'
import Logo from '../assets/images/logo.png'
import Bsc from '../assets/images/bsc.png'
import { memo } from "react";


function Header(props) {

    const {
        active,
        activate,
        account,
    } = useWeb3React();

    function openNav() {
        document.getElementById("sidebar").style.position = "fixed";
        document.getElementById("sidebar").style.width = "300px";
    }
    console.log(active)
    return (
    <>
    <div className="header">
            {/* <img src={Logo}/> */}
        <div className="d-flex">
        <div className="open-sidebar-icon">
            <i class="fa-solid fa-bars" onClick={openNav}></i>
        </div>
        <div className="head-logo-text">
        <h5 >SMART INVESTMENT</h5>
            {/* <img src={Logo} className="header-logo"/> */}

        {/* <span>The world's first staking app that combines Defi & Cefi for passive income</span>         */}
        </div>
        </div>
        <img src={Bsc} className="mobile-bsc"/>
        <div className="inner">
            <div className="address-section">
                {
                    active ?
                    <span>{account.slice(0, 4)+"..."+account.slice(account.length - 4)}</span>
                    : ''
                }
                <img src={Metamask}/>
                <img src={Bsc} className="bsc-icon"/>
            </div>
            <button className="head-btn" onClick={()=>{
                                        connectWallet(activate, props.setErrorMessage);
                                    }}>{active ? 'Connected' : 'Connect Wallet'}</button>
        </div>
    </div>
    </>
    );
}

export default memo(Header);
