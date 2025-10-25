
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/_userStyling/components/card.scss'
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const Card1 = (props) => {

  const { t } = useTranslation();
  return (
    <div className="card1">
      <Card>
        <div className="imageContainer">
          <Card.Link as={Link} to={{ pathname: "/collection/" + props.collectionId }} className="collectionName" >
            {props.collectionName}
          </Card.Link>
          <img src={props.imgURL} alt={props.name} className="image " />
        </div>
        <Card.Body className="title">
          <Card.Title >  {props.name}</Card.Title>
        </Card.Body>

        <Row>
          <Col className="link">
            <Card.Link as={Link} to={{ pathname: "/service-application/" + props.id }}>{t("card.makeApplication")}</Card.Link>
          </Col>
          <Col className="link">
            <Card.Link as={Link} to={{ pathname: "/service/" + props.id }}>{t("card.view")}</Card.Link>
          </Col>
        </Row>
      </Card >
    </div >
  )
}
export default Card1;