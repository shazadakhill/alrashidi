
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/_adminStyling/components/card.scss'
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap';


const Card4 = (props) => {

  return (
    <div className="card4 text-center">
      <Card>
        <div className="imageContainer">
        <p className="status" style={{ fontSize: "small" }} >
            <span>
              {`(${props.collectionName})`}
            </span>
          </p>
         
          <img src={props.imgURL} alt={props.name} className="image " />
        </div>
        <Card.Body className="title">
          <Card.Title >  {props.name}</Card.Title>
        </Card.Body>

        <Row>
          <Col className="link">
            <Card.Link as={Link} to={{ pathname: "/admin/services/edit-service/" + props.id }}>تعديل الخدمة</Card.Link>
          </Col>
          <Col className="link">
            <Card.Link as={Link} to={{ pathname: "/service/" + props.id }}>حذف الخدمة</Card.Link>
          </Col>
        </Row>
      </Card >
    </div >
  )
}
export default Card4;