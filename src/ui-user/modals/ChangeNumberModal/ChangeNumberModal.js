
import React, { useState } from 'react';
import { Container,  Modal } from 'react-bootstrap';
import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import { useTranslation } from 'react-i18next';




function ChangeNumberModal(props) {

    const { t } = useTranslation();


    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClose = () => {
        setShowConfirmPassword(false)
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(true)
    };





    return (
        <Container className={`ChangeNumberModal text-center `}>


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
                   { t("form.enterNewPhone")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    <span id="confirmForm">
                        <DynamicForm
                            formSchema={{
                                "current_password": {
                                    "id": 1,
                                    "titleAr": "كلمة السر الحالية",
                                    "titleEn": "current password",
                                    "required": true,
                                    "inputType": "text"
                                },
                                "new_phone": {
                                    "id": 2,
                                    "titleAr": "الرقم الجديد",
                                    "titleEn": "new phone",
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

export default ChangeNumberModal;