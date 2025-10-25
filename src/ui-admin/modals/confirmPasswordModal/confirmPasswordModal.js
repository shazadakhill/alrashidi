
import React, { useState } from 'react';
import { Container,  Modal } from 'react-bootstrap';
import DynamicForm from '../../containers/dynamicForm/dynamicForm';




function ConfirmPasswordModal(props) {



    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClose = () => {
        setShowConfirmPassword(false)
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(true)
    };





    return (
        <Container className={`ConfirmPasswordModal text-center rtl`}>


            <span type="button"  onClick={handleShowConfirmPassword}>
               
                {props.buttonName}
            </span >


            <Modal
                show={showConfirmPassword}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
                size="lg"
                className={`rtl`}
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                        ادخل كلمة السر للمتابعة
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <span id="confirmForm">
                        <DynamicForm
                            formSchema={{
                                "current_password": {
                                    "id": 1,
                                    "titleEn":"current password",
                                    "titleAr": "كلمة السر",
                                    "title": "كلمة السر",
                                    "required": true,
                                    "inputType": "text"
                                }
                            }}
                            submitFunction={props.submitFunction}
                            buttonName={props.buttonName}
                            parentId={""}
                            payload={props.payload ? props.payload : null}
                        ></DynamicForm>
                    </span>
                </Modal.Body>
            </Modal>
        </Container >
    );
}

export default ConfirmPasswordModal;