
import React from 'react';
import AuthModal from '../../modals/authModal/authModal';
import { useTranslation } from 'react-i18next';
import DynamicForm from '../../containers/dynamicForm/dynamicForm';
const UserResetPasswordConfirm = (props) => {
    const { t } = useTranslation();




    return (
        <div >
            <div style={{ display: 'block' }} id="beforPasswordChange">
                <span >{t("form.enterNewPassword")} </span>

                <DynamicForm
                    formSchema={
                        {
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
                            },
                            "password": {
                                "id": 1,
                                "titleEn": "new password",
                                "titleAr": "كلمة السر الجديدة",
                                "title": "كلمة السر الجديدة",
                                "required": true,
                                "inputType": "text"
                            }
                        }}
                    submitFunction={`onSubmit_resetPassword_confirm`}
                    buttonName={t("form.confirm")}
                    parentId={""}
                    multilangual={true}

                ></DynamicForm>
            </div>
            <span style={{ display: 'none' }} id="afterPasswordChange">
                <p>{t("form.sucssessChangePassword")}   &#x2713; </p>
                <p> {t("form.loginAgain")}  </p>
                <AuthModal previous="resetPassword"></AuthModal>
            </span>
        </div>
    );
}

export default UserResetPasswordConfirm;