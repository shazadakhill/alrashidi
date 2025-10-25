
import React, { useState } from 'react';
import { Container,  Modal } from 'react-bootstrap';
import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import { useTranslation } from 'react-i18next';




function ConfirmPasswordModal(props) {

    const { t } = useTranslation();


    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClose = () => {
        setShowConfirmPassword(false)
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(true)
    };





    return (
        <Container className={`ConfirmPasswordModal text-center `}>


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
                className={t("style.rtl")}
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                   { props.buttonName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <span id="confirmForm">
                        <DynamicForm
                            formSchema={{
                                "current_password": {
                                    "id": 1,
                                    "titleEn": "current password",
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
                            multilangual={true}

                        ></DynamicForm>
                    </span>
                </Modal.Body>
            </Modal>
        </Container >
    );
}

export default ConfirmPasswordModal;