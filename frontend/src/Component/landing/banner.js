// import React from "react";
// import bannerimg from "../../Asset/bannerlog.jpg"
// export function Banner(){
//     return(
//         <>
//             <div className="container-fluid">
//                 <div className="row">

//                     <div className="col-lg-6 p-5 my-5">
//                         <h1>We solve business problems with technology.</h1>
//                         <p>Our performance is your success. Our passion is innovation. Our expertise is unmatched.</p>
//                     </div>
//                     <div className="col-lg-6">
//                         <img src={bannerimg} className="container"/>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HeroSection.css';  // Custom styling
import bannerimage from "../../Asset/Audiobanner.png"
const HeroSection = () => {
  return (
    <Container fluid className="hero-section d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          {/* Left Column: Text */}
          <Col md={7} className="text-white">
            <h5 className='text-white'>WELCOME TO <span className="text-primary">FIN</span><span className="text-mycolor">CATP</span></h5>
            <h1 className="display-4 font-weight-bold text-white">We build Sales Superstars to accelerate your business</h1>
            <p className="lead">
            Master the Sales skills and drive the growth
            </p>
            <Button variant="primary" className="mr-2 col-lg-4 p-3">Get Started</Button>
            <Button variant="outline-light" className='col-lg-5 p-3 ms-3'>View Case Study</Button>
          </Col>
          {/* Right Column: Image */}
          <Col md={5} className="text-center">
            <img src={bannerimage} alt="Man with Laptop" className="img-fluid hero-image" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HeroSection;
