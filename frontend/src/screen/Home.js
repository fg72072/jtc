import { Faq, Footer, Header, Team, Title, Tokenomics } from "../component";
import Slider from "react-slick";
import { Container, Row, Col } from "react-bootstrap";
import about from "../assets/images/about.png"
import SliderTwo from "../assets/images/slider2.jpg"
import SliderThree from "../assets/images/slider3.jpg"
function Home(){

    const settings = {
        dots: true,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

return(

    <>
    
    <Header/>

    <section className="slider-section">

        <Slider {...settings}>

            {/* <div className="slider-item1">
               
            </div> */}

            <div className="slider-item">
               <img src={SliderTwo}/>
            </div>

            <div className="slider-item">
            <img src={SliderThree}/>
               
            </div>
        </Slider>

    </section>

    <section className="section bg-section" id="about">

        <Container >

            <Title title="About Us"/>

            <Row className="about align-items-center">

                
                <Col lg={6} >

                <div className="about-meta">
                    <h2 className="space-h2">Amazing Coin <br/> Community</h2>
                    <p className="space-p">We have developed an inventive, innovative, and advanced system Java Times Caffe' which works on the principle that 
decentralizes the advancement of new coffee branches through investments in JTC Tokens. The undertaking was framed with the 
arrangement to change the Coffee business in "México" and the other world through creative thoughts, innovative ideas, methods,
techniques, and applied technology. Our investors won't just turn into a piece of this tremendous coffee Industry however can 
likewise partake in this innovation-driven coffee shop chain.</p>
                </div>

                </Col>

                <Col lg={6}  className="about-img">

                    <img src={about} />

                </Col>


            </Row>

        </Container>

    </section>

    <section className="section token-section" id="tokenomics">

        <Container>

            <Title title="Tokenomics" class="text-white"/>

            <Tokenomics/>

        </Container>

    </section>

    <section className="team-section section" id="team">

        <Container>

            <Title title="Team"/>

            <Team/>

        </Container>

    </section>

    {/* <section className="section bg-section" id="faq">

        <Container>

            <Title title="Frequently Asked Questions"/>

            <Faq/>

        </Container>

    </section> */}


<Footer/>    

</>

)

}

export default Home;