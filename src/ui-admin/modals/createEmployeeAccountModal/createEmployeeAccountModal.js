
import React, { useState } from 'react';
import { Container, Col, Modal, Row } from 'react-bootstrap';
import SignUpEmployeeForm from "../../../jsonFiles/staticForms/accounts/signup_Employee.json"
import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from 'axios'
import Button from "../../components/button/button"

let formSchemaSignupEmployee = {}
for (var j = 0; j < SignUpEmployeeForm.length; j++) { formSchemaSignupEmployee[SignUpEmployeeForm[j].titleEn] = SignUpEmployeeForm[j]; }


let governorates = [];

function SignupEmployeeModal(props) {



    const [showSignup, setShowSignup] = useState(false);
    const handleClose = () => {
        setShowSignup(false)
    };
    const handleShowSignup = () => {
        setShowSignup(true)
    };


    axios.get(`${ApiURL.domain}${ApiURL.governorate}`).then(
        response => {
            governorates = response.data
            formSchemaSignupEmployee["zone"].options = []
            governorates.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            }).map((governator,index) => {
                return (<React.Fragment key={index}>
                    {governator.zones.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    }).map((zone,index) => {
                        return (<React.Fragment key={index}>

                            {formSchemaSignupEmployee["zone"].options.push(
                                {
                                    "label": `${governator.name} _ ${zone.name}`,
                                    "value": zone.id
                                }
                            )}
                        </React.Fragment>)
                    })
                    }
                </React.Fragment>)
            })
        })






    return (
        <Container className={`SignupEmployeeModal text-center rtl`}>


            <Row>
                <Col >
                    <br />
                    <Button type="button" onClick={handleShowSignup}>
                        انشاء حساب موظف
                    </Button >

                </Col>
            </Row>


            <Modal
                show={showSignup}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
                size="lg"
                className={`rtl`}
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                        انشاء حساب موظف
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div id="div1" style={{ height: "75vh", position: "relative" }}>
                        <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>
                                <span id="signupForm">
                                    <DynamicForm
                                        formSchema={formSchemaSignupEmployee}///cahange
                                        submitFunction={`onSubmit_signup_employee`}///cahange
                                        buttonName="انشاء"
                                        parentId={""}
                                    ></DynamicForm>
                                </span>

                            </div></div></div>

                </Modal.Body>
            </Modal>
        </Container >
    );
}

export default SignupEmployeeModal;