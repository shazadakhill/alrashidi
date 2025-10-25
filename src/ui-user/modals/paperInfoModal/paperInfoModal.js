
import React, { useState } from 'react';
import { Container, Col, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'

import { FaDownload } from "react-icons/fa";


import DynamicForm from '../../../ui-user/containers/dynamicForm/dynamicForm';


import moment from "moment"









function PaperInfoModal(props) {


    const application = props.application

    const disableStyle = {
        pointerEvents: "none",
        opacity: "50%",
        color: "rgb(136, 136, 136)"
    }



    const { t } = useTranslation();
    const [showEditStatus, setShowEditStatus] = useState(false);

    const handleClosePolicy = () => {
        setShowEditStatus(false)
    }
    const handleShowEditStatus = () => {
        setShowEditStatus(true)
    }



    const showUpdateStatus = (e) => {
        document.getElementById('updateBody').style.display = "block";
        document.getElementById('updateButton').style.display = "none";
    };
    const paperFields = (
        < div >
            <Container >
                <Row className="div ">

                    {application.paperFields.map((paperFields, index) => {
                        return (<p key={index}>{paperFields.fieldTemplateObject.title} : {` `}
                            <span key={index}>
                                <input width="100%" style={{ width: "100%" }} readOnly value={paperFields.data ? paperFields.data : t("userApplication.notEnteredYet")} ></input>
                            </span></p>)
                    })}

                </Row>
            </Container>
        </div >
    )
    const paperFileFields = (
        < div >
            <Container>
                <Row className="div ">
                     {application.paperFileFields.map((paperFileFields, index) => {
                        return (
                            <p key={index}>{paperFileFields.fileFieldTemplateObject.title} :
                                <span key={index}>
                                    {paperFileFields.data
                                        ? <a download={paperFileFields.fileFieldTemplateObject.title} target="_blank" rel="noreferrer" href={paperFileFields.data}>
                                            < FaDownload style={{ color: "rgb(0, 27, 57)" }} />
                                        </a>
                                        : <p>{t("userApplication.notEnteredYet")}</p>}
                                </span>
                            </p>)
                    })}
                </Row>
            </Container>
        </div >
    )
    return (
        <Container className={`PaperInfoModal text-center ${t("style.rtl")}`}>

            <Row>
                <Col >
                    <span type="button" onClick={handleShowEditStatus} >
                        {t("userApplication.enteredInfo")}
                    </span>
                </Col>
            </Row>

            <Modal
                show={showEditStatus}
                onHide={handleClosePolicy}
                backdrop="static"
                keyboard={false}
                animation={false}
                className={`${t("style.rtl")}`}
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                        {t("userApplication.enteredInfo")}
                    </Modal.Title>

                </Modal.Header >
                <Modal.Body >
                    <div id="div1" style={{ height: "65vh", position: "relative" }}>
                        <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>

                                <span className="text-center">
                                    <h6 style={{ color: "rgb(184, 148, 39)" }} >
                                        {t("userApplication.enterdData")}
                                    </h6>
                                </span>

                                {paperFields}
                                {paperFileFields}
                                <hr />
                                <span className="text-center">
                                    <h6 style={{ color: "rgb(184, 148, 39)" }} >
                                    {t("userApplication.applicantInfo")}
                                    </h6>
                                </span>
                                {application.userObject.fullName ? <p >{t("userApplication.fullName")}{application.userObject.fullName}</p> : null}
                                {application.userObject.nationalId ? <p >{t("userApplication.nationalId")} {application.userObject.nationalId}</p> : null}
                                {application.userObject.phone ? <p >{t("userApplication.phone")}<p style={{ direction: "ltr" }}>{application.userObject.phone}</p></p> : null}
                                <hr />

                                <span className="text-center">
                                    <h6 style={{ color: "rgb(184, 148, 39)" }} >
                                        {t("userApplication.details")}
                                    </h6>
                                </span>
                                {application.created_at ? <p>{t("userApplication.created_at")} {moment(application.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.assigned_at ? <p>{t("userApplication.assigned_at")} {moment(application.assigned_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.accepted_at ? <p>{t("userApplication.accepted_at")} {moment(application.accepted_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.done_at ? <p>{t("userApplication.done_at")} {moment(application.done_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.payed_at ? <p>{t("userApplication.payed_at")} {moment(application.payed_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.payment_code ? <p>{t("userApplication.payment_code")} {application.payment_code}</p> : null}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer >
                    <Container className="text-center">
                        <Row >
                            {props.loginProps.userType === "employee"
                                ? < Col className="text-center">
                                    {props.inPage === "assignedPaper"
                                        ? <>
                                            <span style={application.status === 5 || application.status === 6 ? disableStyle : null}>
                                                <div className="button" type="button" style={{ display: "block" }} id="updateButton" onClick={showUpdateStatus}>
                                                    {t('status.updateApplicationStatus')}
                                                </div>
                                            </span>
                                            <span id="updateBody" className="text-center" style={{ display: "none" }}>
                                                <DynamicForm className="text-center"
                                                    formSchema={{
                                                        "status": {
                                                            "id": 0,
                                                            "inputType": "select",
                                                            "titleEn": "application status",
                                                            "titleAr": "حالة الطلب",
                                                            "title": "حالة الطلب",
                                                            "required": true,
                                                            "options": application.status === 3
                                                                ? [{ "label": `accepted`, "value": 4 }, { "label": `rejected`, "value": 5 }, { "label": `finished`, "value": 6 }]
                                                                : application.status === 4
                                                                    ? [{ "label": `rejected`, "value": 5 }, { "label": `finished`, "value": 6 }]
                                                                    : []
                                                        }
                                                    }}
                                                    submitFunction={`onSubmit_updateStatus`}
                                                    buttonName=  {t("form.confirm")}
                                                    parentId={""}
                                                    payload={props.application.id}
                                                    multilangual={true}
                                                ></DynamicForm></span>
                                        </>

                                        : null}
                                </Col>
                                : null
                            }
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}
const mapStateToProps = state => {

    return {
        loginProps: state.auth
    }

}


export default connect(mapStateToProps)(PaperInfoModal);