import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from "../assets/images/favicon-wh.png"

function Footer(){

    return(

            <>

            <footer>

                <Container className="footer-top">

                    <Row>
                        <Col lg={4} md={4}>

                        <Link to={"/"} className="logo">
                            {/* <h2>JTC</h2> */}
                            <img src={logo}/>
                        </Link>

                        <p className="footer-about">The project Java Times Caffé has intended to change the coffee business in the world through innovation, vision, and applied
                            technology.</p>

                        </Col>

                        <Col lg={4} md={4}>

                            <h4>Quick Links</h4>

                            <ul className="footer-menu">
                                <li>
                                <a href="#about">About</a>

                                </li>

                                <li>
                                <a href="#tokenomics">Tokenomics</a>

                                </li>

                                <li>
                                <a href="#team">Team</a>

                                </li>

                                {/* <li>
                                <a href="#faq">FAQ</a>

                                </li> */}

                            </ul>
                            
                        </Col>

                        <Col lg={4} md={4}>

                            <h4>Follow Us</h4>

                            <ul className="social bottom">
                                <li><a href=""><i class="fa-brands fa-twitter"></i></a></li>
                                <li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href=""><i class="fa-brands fa-discord"></i></a></li>
                            </ul>
                            
                        </Col>
                    </Row>

                </Container>

                <Container className="footer-bottom">
                    <p> Copyright &copy; {new Date().getFullYear()} JTC All Rights Reserved</p>
                </Container>
                
            </footer>    

            
            </>

    )

}

export default Footer