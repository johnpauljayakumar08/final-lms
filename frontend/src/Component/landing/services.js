import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import img from "./Asset/Ai sales 1.png"
import img2 from "./Asset/Curated curriculum on Sales 1.png"
import img3 from "./Asset/Training 1.png"
const services = [
  { title: "AI based sales Roleplay training", description: "Get real-time training on sales.",img:img },
  { title: "Curated curriculum on Sales", description: "Proven Industry demand curriculum.",img:img2 },
  { title: "Personlilized assistance", description: "Get feedback at each level of learining.",img:img3 }
  
];

const ServicesSection = () => {
  return (
    <>
    <div className=''>

    <h2 className='text-center pt-5 '>Service Offered</h2>
    
    <div className="services-section text-center container-fluid" style={{ padding: '60px 0' }}>
      <Row>
        {services.map((service, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="h-100">
                <Card.Header>
                    <img src={service.img} className='container-fluid'/>
                </Card.Header>
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Button variant="primary">Learn more</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </div>
    </>
  );
};

export default ServicesSection;
