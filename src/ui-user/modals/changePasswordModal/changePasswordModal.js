
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
                   { t("form.confirmYouPassword")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <span id="confirmForm">
                        <DynamicForm
                            formSchema={{
                                "new_password": {
                                    "id": 1,
                                    "titleEn": "new password",
                                    "titleAr": "كلمة السر الجديدة",
                                    "title": "كلمة السر الجديدة",
                                    "required": true,
                                    "inputType": "text"
                                },
                                "current_password": {
                                    "id": 2,
                                    "titleEn": "current password",
                                    "titleAr": "كلمة السر الحالية",
                                    "title": "كلمة السر الحالية",
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