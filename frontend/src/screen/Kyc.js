import { Footer, Header, Title } from "../component";
import { Container, Row, Col, Form } from "react-bootstrap";
function Kyc(){

return(

    <>
    
    <Header type="dark"/>



    <section className="section bg-section" >

        <Container >

            <Title title="KYC"/>

            <Row className="about align-items-center">

                
                <Col lg={6} >

                <div className="about-meta">
                    <h2 className="space-h2">Lorem Ipsum <br/> Lorem</h2>
                    <p className="space-p">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. </p>
                </div>

                </Col>

                <Col lg={6}  >

                    <Form>
                        <Row>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="middlename">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Middle Name" />
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Phone" />
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="dob">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="passport">
                                <Form.Label>Passport</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="cnicfront">
                                <Form.Label>CNIC Front</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" controlId="cnicback">
                                <Form.Label>CNIC Back</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                            </Col>
                            <Col lg={12}>
                            <Form.Group className="mb-3" controlId="resedential">
                                <Form.Label>Resedential</Form.Label>
                                <Form.Control as="textarea" rows={5}/>
                            </Form.Group>
                            </Col>
                            <Col lg={12}>
                            <button className="custom-btn primary-btn">Submit</button>
                            </Col>
                           
                        </Row>
                    </Form>

                </Col>


            </Row>

        </Container>

    </section>


<Footer/>    

</>

)

}

export default Kyc;