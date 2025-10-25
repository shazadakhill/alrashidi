
import React from 'react';
import '../../../styles/_userStyling/components/card.scss'
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap';
import PaperInfoModal from '../../modals/paperInfoModal/paperInfoModal';
import { useTranslation } from 'react-i18next';


const Card2 = (props) => {
  const { t } = useTranslation();
  return (
    <div className="card2">
      <Card>
        <div className="imageContainer">
          <p className="status" >
            {props.application.status === 1
              ? t("status.status1")
              : props.application.status === 2
                ? t("status.status2")
                : props.application.status === 3
                  ? t("status.status3")
                  : props.application.status === 4
                    ? t("status.status4")
                    : props.application.status === 5
                      ? t("status.status5")
                      : props.application.status === 6
                        ? t("status.status6") : null
            }
          </p>
          <img src={props.application.paperTemplateObject.image} alt={props.application.paperTemplateObject.title} className="image" />

        </div>
        <Card.Body className="title">
          <Card.Title >({props.application.paperTemplateObject.title})
            ({props.application.userObject.fullName})</Card.Title>
        </Card.Body>

        <Row>
          <Col className="link">
            <PaperInfoModal
              application={props.application}
              inPage={props.inPage}
            ></PaperInfoModal>

          </Col>
        </Row>
      </Card >
    </div >
  )
}
export default Card2;