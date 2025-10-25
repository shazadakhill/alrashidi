
import React, { useState, useEffect } from 'react';
import { Container, Col, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux'

import { FaDownload } from "react-icons/fa";
import moment from "moment"
import DynamicForm from '../../containers/dynamicForm/dynamicForm';

import ApiURL from '../../../jsonFiles/api/api.json'
import axios from 'axios'



let formSchemaEmployees =
{
    "employee": {
        "id": 0,
        "inputType": "select",
        "titleEn": "employee",
        "titleAr": "الموظف",
        "title": "الموظف",
        "required": true,
        "options": []
    }
}




function PaperInfoModal(props) {



    // const service = props.service;
    const application = props.application

    const employees =props.employees;



    const [EnteredData, setEnteredData] = useState(false);
    const [EmployeName, setEmployeName] = useState("...");

    const handleClosePolicy = () => {
        setEnteredData(false)
    }
    const handleEnteredData = () => {
        setEnteredData(true)
    }
    const showAssign = (e) => {
        document.getElementById('assignBody').style.display = "block";
        document.getElementById('assignButton').style.display = "none";
    };


    useEffect(() => {
        const fetchData = async () => {
            if (application.employee && EnteredData === true) {
                const token = 'Bearer '.concat(props.loginProps.token);

                axios.get(`${ApiURL.domain}${ApiURL.accountsEmployee}${application.employee}/`, { "headers": { Authorization: token } }).then(
                    response => {
                        setEmployeName(response.data.fullName)
                    });
            }
        };

        fetchData();

        formSchemaEmployees["employee"].options = []
        if (Array.isArray(employees)) {
            employees.sort(function (a, b) {
                if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) return -1;
                if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) return 1;
                return 0;
            }).map((employee, index) => {
                return (<React.Fragment key={index}>
                    {formSchemaEmployees["employee"].options.push(
                        {
                            "label": employee.fullName,
                            "value": employee.id
                        }
                    )}
                </React.Fragment>)
            })
    
        }
    }, [EnteredData, application.employee, props.loginProps.token,employees]);

    const paperFields = (
        < div >
            <Container >
                <Row className="div ">
                    {application.paperFields.map((paperFields, index) => {
                        return (<p key={index}>{paperFields.fieldTemplateObject.title} : {` `}
                            <span key={index}>
                                <input width="100%" style={{ width: "100%" }} readOnly value={paperFields.data ? paperFields.data : "لم يتم ادخاله بعد"} ></input>
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
                                        : <p>لم يتم ادخاله بعد</p>}
                                </span>
                            </p>)
                    })}

                </Row>
            </Container>
        </div >
    )

  

    return (
        <Container className={`PaperInfoModal text-center rtl`}>

            <Row>
                <Col >
                    <span type="button" onClick={handleEnteredData} >
                        عرض
                    </span>
                </Col>
            </Row>

            <Modal
                show={EnteredData}
                onHide={handleClosePolicy}
                backdrop="static"
                keyboard={false}
                animation={false}
                className={"rtl"}

            >
                <Modal.Header closeButton >
                    <Modal.Title>
                        البيانات المدخلة
                    </Modal.Title>

                </Modal.Header >
                <Modal.Body >
                    <div id="div1" style={{ height: "65vh", position: "relative" }}>
                        <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>

                                <span className="text-center">
                                    <h6 style={{ color: "rgb(184, 148, 39)" }} >
                                        البيانات المدخلة
                                    </h6>
                                </span>

                                {paperFields}
                                {paperFileFields}
                                <hr />


                                <span className="text-center">
                                    <h6 style={{ color: "rgb(184, 148, 39)" }} >
                                        بيانات  مقدم الطلب
                                    </h6>
                                </span>
                                {application.userObject.fullName ? <p >الاسم الكامل : {application.userObject.fullName}</p> : null}
                                {application.userObject.nationalId ? <p >الرقم الوطني : {application.userObject.nationalId}</p> : null}
                                {application.userObject.phone ? <p >رقم الموبايل : <p style={{ direction: "ltr" }}>{application.userObject.phone}</p></p> : null}
                                <hr />



                                <span className="text-center">
                                    <h6 style={{ color: "rgb(184, 148, 39)" }} >
                                        تفاصيل الطلب
                                    </h6>
                                </span>
                                {application.created_at ? <p style={{ direction: "rtl" }}>تاريخ الانشاء: {moment(application.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.assigned_at ? <p>تاريخ استلام الطلب {moment(application.assigned_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.employee ? <p style={{ direction: "rtl" }}>اسم الموظف: {EmployeName}</p> : null}
                                {application.accepted_at ? <p>تاريخ قبول الطلب: {moment(application.accepted_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.done_at ? <p>تاريخ الانتهاء: {moment(application.done_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.payed_at ? <p>تاريخ دفع الاتعاب: {moment(application.payed_at).format('MMMM Do YYYY, h:mm:ss a')}</p> : null}
                                {application.payment_code ? <p >كود الدفع: {application.payment_code}</p> : null}


                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {application.status === 2
                    ? <Modal.Footer >
                        <Container className="text-center" style={{ transform: "scale(0.8)" }}>
                            <Row  >
                                < Col className="text-center">
                                    <span>
                                        <div className="button" type="button" style={{ display: "block" }} id="assignButton" onClick={showAssign}>
                                            تعيين الطلب لموظف
                                        </div>
                                    </span>
                                    <span id="assignBody" className="text-center" style={{ display: "none" }} >
                                        <DynamicForm className="text-center"
                                            formSchema={formSchemaEmployees}
                                            submitFunction={`onSubmit_AssignPaperToEmployee`}
                                            buttonName={"تعيين"}
                                            parentId={""}
                                            payload={props.application.id}
                                        ></DynamicForm></span>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Footer>
                    : null}
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