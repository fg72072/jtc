import { Container, Row, Col } from "react-bootstrap";


function Title(props){

    return(

        <>
        
        <Row className="justify-content-center">

        <Col lg={5}>

            <h2 className={"section-title "+props.class}>{props.title}</h2>

        </Col>

        </Row>

        </>

    )

}

export default Title