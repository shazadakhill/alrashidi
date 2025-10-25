
import React from 'react';
import '../../../styles/_adminStyling/components/card.scss'
import Card from 'react-bootstrap/Card'
import { Col, Row } from 'react-bootstrap';
import PaperInfoModal from '../../modals/paperInfoModal/paperInfoModal';
import moment from "moment"



const Card3 = (props) => {
  let collectionTitle = props.collection.length === 1 ? props.collection[0].title : "القطاع غير محدد";
  return (
    <div className="card3 text-center">
      <Card>
        <div className="imageContainer">

          <p className="status" style={{ fontSize: "small" }} >
            <span >
              {`(${collectionTitle})`}
            </span>
            <br />

            {props.application.status === 1
              ? " بانتظار الدفع"
              : props.application.status === 2
                ? " بانتظار استلام الموظف"
                : props.application.status === 3
                  ? "بانتظار القبول"
                  : props.application.status === 4
                    ? "قيد العمل"
                    : props.application.status === 5
                      ? "مرفوض"
                      : props.application.status === 6
                        ? "منته" : null
            }

          </p>

          <img src={props.application.paperTemplateObject.image} alt={props.application.paperTemplateObject.title} title={collectionTitle} className="image" />
        </div>
        <Card.Body className="title" style={{ fontSize: "small" }}>
          <Card.Title >({props.application.paperTemplateObject.title})
            ({props.application.userObject.fullName})
          </Card.Title>

        </Card.Body>

        <Row>
          <Col className="link" xs={12}>
            <PaperInfoModal
              application={props.application}
              employees={props.employees}
              inPage={props.inPage}
            ></PaperInfoModal>
          </Col>
          <Col className="link" xs={12} style={{ color: "#888" }}>

            {props.newStatus === 0
              ? <>تم انشاؤه في:{moment(props.application.created_at).format('MMMM Do YYYY')}<br /></>
              : props.newStatus === 1
                ? <>تم انشاؤه في:{moment(props.application.created_at).format('MMMM Do YYYY')}<br /></>
                : props.newStatus === 2
                  ? <>تم دفعه في:{moment(props.application.payed_at).format('MMMM Do YYYY')}<br /></>
                  : props.newStatus === 3
                    ? <>تم استلامه في:{moment(props.application.assigned_at).format('MMMM Do YYYY')}<br /></>
                    : props.newStatus === 4
                      ? <>تم قبوله في:{moment(props.application.accepted_at).format('MMMM Do YYYY')}<br /></>
                      : props.newStatus === 5
                        ? <>تم انشاؤه في:{moment(props.application.created_at).format('MMMM Do YYYY')}<br /></>
                        : props.newStatus === 6
                          ? <>تم انهاؤه في:{moment(props.application.done_at).format('MMMM Do YYYY')}<br /></>
                          : null
            }
          </Col>

        </Row>

      </Card >
    </div >
  )
}
export default Card3;