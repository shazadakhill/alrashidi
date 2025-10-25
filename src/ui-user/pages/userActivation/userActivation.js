
import React, { useState } from 'react';
import AuthModal from '../../modals/authModal/authModal';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../../containers/dynamicForm/dynamicForm';
const UserActivation = (props) => {
    const { t } = useTranslation();

    const [resendActivationOpened, setResendActivationOpened] = useState(false);



    return (
        <div >
            <div style={{ display: 'inline' }} id="beforActivation">
                <DynamicForm
                    formSchema={{
                        "phone": {
                            "id": 1,
                            "titleEn": "phone",
                            "titleAr": "رقم الموبايل",
                            "title": "رقم الموبايل",
                            "required": true,
                            "inputType": "text"
                        },
                        "code": {
                            "id": 1,
                            "titleEn": "code",
                            "titleAr": "الرمز",
                            "title": "الرمز",
                            "required": true,
                            "inputType": "text"
                        }
                    }}
                    submitFunction={`onSubmit_activate_confirm`}
                    buttonName={t("form.activate")}
                    parentId={""}
                    multilangual={true}

                ></DynamicForm>

                <p type="button" style={{ textDecorationLine: "underline" }} onClick={() => { setResendActivationOpened(true) }} >{t("form.resend")} </p>
                <div style={resendActivationOpened === true ? { display: "inline" } : { display: "none" }}>
                    <DynamicForm
                        formSchema={{
                            "phone": {
                                "id": 1,
                                "titleEn": "phone",
                                "titleAr": "رقم الموبايل",
                                "title": "رقم الموبايل",
                                "required": true,
                                "inputType": "text"
                            }

                        }}
                        submitFunction={`onSubmit_activate_resend`}
                        buttonName={t("form.resend")}
                        parentId={""}
                        multilangual={true}

                    ></DynamicForm>
                </div>
            </div>

            <span style={{ display: 'none' }} id="afterActivation">
                <p>{t("form.sucssessActivation")}   &#x2713; </p>
                <p> {t("form.loginAgain")}  </p>
                <AuthModal previous="activation"></AuthModal>
            </span>
        </div>
    );
}

export default UserActivation;