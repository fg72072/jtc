import { Navbar, Container, Nav, NavDropdown,Button,Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/download.png";
import { useWeb3React } from "@web3-react/core";
import { connectWallet } from "../utils/connectWallet";
import { useEagerConnect, useInactiveListener } from '../hooks/useEagerConnect';
import { useState } from 'react';

function Header(props) {
  const [errorMessage, setErrorMessage] = useState();
  useEagerConnect(setErrorMessage);
  useInactiveListener();
  const {
    active,
    activate,
} = useWeb3React();

console.log(active)
    // const [navbar, setNavbar] = useState(false);
  
  
    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //       if (window.pageYOffset > 80) {
    //         setNavbar(true);
    //       } else {
    //         setNavbar(false);
    //       }
    //     });
    //   }, []);
  
    function openNav() {
      document.getElementById("mySidenav").style.width = "90%";
   }
  
   function closeNav() {
    var x = window.matchMedia("(max-width: 800px)")
    if (x.matches) { // If media query matches
      document.getElementById("mySidenav").style.width = "0";
    }
  
   }
  
  
    return (
  
      <>
  
    
        <Navbar collapseOnSelect expand="lg" className={props.type == 'dark' ? "custom-nav dark-header" : "custom-nav light-header"} variant="dark">
          <Container fluid className="w-100">
  
           
  
            <span onClick={(e) => openNav()} className="opennav">
                    <i class="fa fa-bars"></i>
            </span>
            <div id="mySidenav" className="justify-content-md-around gap-2 sidenav">
            <a href="javascript:void(0)" class="closebtn" onClick={(e) => closeNav()}>&times;</a>
            <Link to={"/"} className="logo" onClick={(e) => closeNav()}>
              {/* <h2>JTC</h2> */}
              <img src={logo}/>
            </Link>
            <Nav>
                <Link to={"/"} onClick={(e) => closeNav()}>Home</Link>
                <a href="#about" onClick={(e) => closeNav()}>About us</a>
                <a href="#tokenomics" onClick={(e) => closeNav()}>Tokenomics</a>
                <div className="custom-dropdown-main"> 
                <Link to={'#'}  className="buy-token-btn"><span>Buy JTC</span> <i class="fa-solid fa-caret-down "></i></Link>
                <div className="custom-drop-down">
                  <Link to={"/public-sale"} onClick={(e) => closeNav()}>Public-Sale</Link>
                  <Link to={"/private-sale"} onClick={(e) => closeNav()}>Private-Sale</Link>
                </div>
                </div>
                <Link to={require('../assets/whitepaper.pdf')} target="_blank" download>Whitepaper</Link>
                {/* <a href="#faq">FAQ</a> */}
                <a href="#team" onClick={(e) => closeNav()}>Team</a>

            </Nav>
  
            <div className="d-flex justify-content-center">
            {
                active?
                <a href="#" 
              className="custom-btn primary-btn buy-token-btn">Connected</a>
              
            :<a href="#" onClick={()=>
              {connectWallet(activate, setErrorMessage);}}
              className="custom-btn primary-btn buy-token-btn">Connect Wallet</a>}
                                    </div>
  
            </div>
  
  
  
          </Container>
        </Navbar>
  
      </>
  
    )
  
  
  
  }
  
  export default Header;