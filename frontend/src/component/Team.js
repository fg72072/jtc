import { Row, Col } from "react-bootstrap";
import team from "../assets/images/team.jpg"


function Team(){

    return(

        <>

            <Row className="gx-5">

                <Col lg={4}>

                    <h2 className="space-h2">Meet <br/> Our Team</h2>
                    <p className="space-p">We have an extensive experience of 35 years in the coffee Industry. We are the master in cafeteria operations and training key
                        personnel for the coffee shop operations. This success is a reward that is granted to Java Times Caffe's team which had a crucial
                        impact in forming the Java Times Caffe's into what it is today, giving a system and platform to invest in JTC Tokens. They showed
                        continuous improvement and assisted with guaranteeing the drawn-out outcome of the Java Times Caffe's project. The incredible
                        work done by our team brings about contacting a more extensive crowd and stirs more prominent interest in Java Times Caffe'.</p>

                </Col>

                <Col lg={4} md={6}>

                    <ul className="team-ul">
                        <li>

                            <img src={team}/>

                            <span>
                            <h4>J. Antonio</h4>
                            <p>Project Director</p>
                            </span>

                        </li>

                        <li>

                            <img src={team}/>
                            <span>
                            <h4>Andres Casielles</h4>
                            <p>Analyst - Data and Insights</p>
                            </span>
                        </li>

                        <li>
                        <img src={team}/>
                            <span>
                            <h4>Yadira Deusto</h4>
                            <p>Venture Development Manager</p>
                            </span>
                        </li>

                        <li>
                            <img src={team}/>
                            <span>
                            <h4>Edu Hernandes</h4>
                            <p> Brand Marketing Intern </p>
                            </span>
                        </li>

                        <li>
                            <img src={team}/>
                            <span>
                            <h4>Martha Galindo</h4>
                            <p>Real Estate Acquisition Manager</p>
                            </span>
                        </li>

                        <li>
                            <img src={team}/>
                            <span>
                            <h4>Arsalan Shahzad</h4>
                            <p>Chief Technical Officer</p>
                            </span>
                        </li>

                        <li>
                            <img src={team}/>
                            <span>
                            <h4>Rameez Saleem</h4>
                            <p>Project Manager</p>
                            </span>
                        </li>

                        
                    </ul>

                </Col>

                <Col lg={4} md={6}>

                    <ul className="team-ul mt-res-0">
                            <li>

                                <img src={team}/>

                                <span>
                                <h4>Tony Casielles</h4>
                                <p>Operations Manager</p>
                                </span>

                            </li>

                            <li>

                                <img src={team}/>
                                <span>
                                <h4>Paulina Lujan</h4>
                                <p>Business Intelligence Analyst</p>
                                </span>
                            </li>

                            <li>
                            <img src={team}/>
                                <span>
                                <h4>Ivan Bentacourt</h4>
                                <p>Architect</p>
                                </span>
                            </li>

                            <li>
                                <img src={team}/>
                                <span>
                                <h4>Sergio Escobedo</h4>
                                <p>Project Maintenance Officer</p>
                                </span>
                            </li>

                            <li>
                                <img src={team}/>
                                <span>
                                <h4>Gulshan Goya</h4>
                                <p>QA Engineering Analyst</p>
                                </span>
                            </li>

                            <li>
                                <img src={team}/>
                                <span>
                                <h4>Fahad Wahid</h4>
                                <p>Operational manager</p>
                                </span>
                            </li>

                            
                    </ul>


                </Col>

            </Row>

        </>

    )

}

export default Team;