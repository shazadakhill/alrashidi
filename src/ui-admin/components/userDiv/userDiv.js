
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ConfirmPasswordModal from '../../modals/confirmPasswordModal/confirmPasswordModal';
import { AiOutlineDelete } from "react-icons/ai"
import EditEmployeeAccountModal from '../../modals/editEmployeeAccountModal/editEmployeeAccountModal'

const UserDiv = (props) => {

  return (<>
    < Container className="UserDiv" style={{ backgroundColor: " rgb(251 210 85 / 68%)", marginTop: "30px", padding: "14px", boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)" }}>

      <Row>
        <Col xs={12} md={1}>
          <p >{props.number} </p>
        </Col>
        <Col xs={12} md={3}>
          {props.fullName ? <p>الاسم : {props.fullName} </p> : null}
          {props.phone ? <p>الموبايل: <p style={{direction: "ltr" }}>{props.phone} </p></p> : null}

        </Col>
        <Col xs={12} md={3}>
          {props.nationalId ? <p> الرقم الوطني: {props.nationalId} </p> : null}
        </Col>
        <Col xs={12} md={3}>
          {props.zone ? <p> المنطقة : {props.zone} </p> : null}
          {props.governorate ? <p>  المحافظة: {props.governorate} </p> : null}
        </Col>

        <Col xs={12} md={2}>
          {props.type === "allUsers"
            ? null
            : props.type === "employees"
              ? <ConfirmPasswordModal
                submitFunction={`onSubmit_Delete_User`}
                buttonName={<><AiOutlineDelete /> حذف الموظف </>}
                payload={props.id}
              ></ConfirmPasswordModal>
              : props.type === "normalUsers"
                ? <ConfirmPasswordModal
                  submitFunction={`onSubmit_Delete_User`}
                  buttonName={<><AiOutlineDelete /> حذف المستخدم </>}
                  payload={props.id}
                ></ConfirmPasswordModal>
                : null
          }
          {props.type === "allUsers"
            ? null
            : props.type === "employees"
              ? <EditEmployeeAccountModal payload={props.id}></EditEmployeeAccountModal>
              : props.type === "normalUsers"
                ? null
                : null
          }

        </Col>
      </Row>

    </Container >
  </>

  )
}
export default UserDiv;