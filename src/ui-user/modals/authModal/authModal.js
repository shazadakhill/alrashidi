
import React, { useState } from 'react';
import { Container, Col, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Text1 from "../../components/text1/text1";
import image from "../../../assets/backgroundMobile.png"
import LoginForm from "../../../jsonFiles/staticForms/accounts/login.json"
import SignUpForm from "../../../jsonFiles/staticForms/accounts/signup.json"
import Button from "../../components/button/button"


import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import "../../../styles/_userStyling/components/authModal.scss"
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from 'axios'
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

let formSchemaLogin = {}
for (var y = 0; y < LoginForm.length; y++) { formSchemaLogin[LoginForm[y].titleEn] = LoginForm[y]; }

let formSchemaSignup = {}
for (var j = 0; j < SignUpForm.length; j++) { formSchemaSignup[SignUpForm[j].titleEn] = SignUpForm[j]; }



function AuthModal(props) {


    const style = {
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }


    const { t } = useTranslation();
    const [privacyPolicyArabic, setPrivacyPolicyArabic] = React.useState("");
    const [privacyPolicyEnglish, setPrivacyPolicyEnglish] = React.useState("");


    React.useEffect(() => {

        axios.get(`${ApiURL.domain}${ApiURL.settings}`).then(
            response => {
                const detail = response.data;
                setPrivacyPolicyArabic(detail.privacyPoilicy);
                setPrivacyPolicyEnglish(detail.privacyPoilicyEnglish);
            });
    });





    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);
    const handleClose = () => {
        setShowLogin(false)
        setShowSignup(false)
        setShowPolicy(false)
    };
    const handleShowSignup = () => {
        setShowLogin(false)
        setShowSignup(true)
        setShowPolicy(true)
    };
    const handleShowLogin = () => {
        setShowSignup(false)
        setShowLogin(true)
    };
    const handleShowPolicy = () => {
        if (!showLogin && !showSignup) {
            setShowSignup(true)
            setShowPolicy(true)
        }
        else { setShowPolicy(true) }
    };
    const handleClosePolicy = () => {
        setShowPolicy(false)
    }


    const reSendActivation = (e) => {
        var phone = document.getElementById("reActivationNumber").innerHTML;
        let data =
            { "phone": phone }
        axios.post(`${ApiURL.domain}${ApiURL.reSendActivation}`, data)
            .then(response => {
                alert(`activation resent to ${data.phone} successfully`)
            }).catch(err => {
                if (err.request) {
                    // console.log(err.request)
                }
                if (err.response) {
                    // console.log(err.response)
                }
            });

    };



    const ClickResetPassword = (e) => {
        document.getElementById("forgotPassword").style.display = "none";
        document.getElementById("resetPasswordNumber").style.display = "block";
    };

    let governorates = [];

    axios.get(`${ApiURL.domain}${ApiURL.governorate}`).then(
        response => {
            formSchemaSignup["zone"].options = []
            governorates = response.data
            governorates.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            }).map((governorate, index) => {
                return (<React.Fragment key={index}>
                    {governorate.zones.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    }).map((zone, index) => {
                        return (<React.Fragment key={index}>
                            {formSchemaSignup["zone"].options.push(
                                {
                                    "label": `${governorate.name} _ ${zone.name}`,
                                    "value": zone.id
                                }
                            )}
                        </React.Fragment>)
                    })}
                </React.Fragment>)
            })
        })
    return (
        <Container className={`authModal text-center ${t("style.rtl")}`}>

            {props.previous !== "activation" && props.previous !== "resetPassword"
                ? <Row>
                    <Col xs={2} md={4}></Col>
                    <Col xs={4} md={2}>
                        <Button onClick={handleShowPolicy} >
                            {t('form.signup')}
                        </Button>
                    </Col>
                    <Col xs={4} md={2}>
                        <Button onClick={handleShowLogin}>
                            {t('form.login')}
                        </Button>
                    </Col>
                    <Col xs={2} md={4}></Col>

                </Row>
                : <Row>
                    <Col >
                        <br />
                        <Button onClick={handleShowLogin}>
                            {t('form.login')}
                        </Button>
                    </Col>
                </Row>
            }







            <Modal
                show={showLogin}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
                size="lg"
                className={`${t("style.rtl")}`}
            >
                <Modal.Header closeButton style={style}>
                    <Modal.Title> {t("form.login")}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={style}>
                    <div id="div1" style={{ height: "55vh", position: "relative" }}>
                        <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>
                                <DynamicForm
                                    formSchema={formSchemaLogin}
                                    submitFunction={`onSubmit_login`}
                                    buttonName={t("form.login")}
                                    parentId={""}
                                    multilangual={true}
                                ></DynamicForm>

                                <div className="text-center" id="forgotPassword" type="button" style={{ display: "block", textDecoration: "underline" }} onClick={ClickResetPassword}> {t("form.forgotPassword")}  </div>

                                <span id="resetPasswordNumber" style={{ display: "none" }}>
                                    <div className="text-center" > {t("form.resetPasswordRequest")}</div>
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
                                        submitFunction={`onSubmit_resetPasswordRequest`}
                                        buttonName={t("form.confirm")}
                                        parentId={""}
                                        multilangual={true}

                                    ></DynamicForm>
                                </span>
                                <div className="text-center" style={{ display: "none" }} id="goToResetPassword" >
                                    <Link to="/auth/users/reset_password/"> {t("form.resetPasswordNote")}</Link>
                                </div>


                            </div></div></div>
                </Modal.Body>
                <Modal.Footer style={style}>
                    <Container className="text-center">
                        <Row >
                            <Col>
                                <div>

                                    <Link to="/auth/users/activation/"> {t("form.activateNote")}</Link>
                                    {t("form.loginNote")}
                                    <span className="button" style={{ textDecorationLine: "underline", fontSize: "120%" }} type="button" onClick={handleShowSignup}>{t('form.signup')}</span >
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Footer>
                <Modal.Footer style={style}>
                    <Container className="text-center">
                        <Row >
                            <Col>
                                <div className="button" type="button" onClick={handleShowPolicy}>
                                    {t('form.policy')}
                                </div >
                            </Col>
                        </Row>
                    </Container>

                </Modal.Footer>
            </Modal>
            <Modal
                show={showSignup}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
                size="lg"
                className={`${t("style.rtl")}`}
            >
                <Modal.Header closeButton style={style}>
                    <Modal.Title>
                        {t('form.signup')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={style}>

                    <div id="div1" style={{ height: "55vh", position: "relative" }}>
                        <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>
                                <span id="signupForm">
                                    <Row>
                                        <Col xs={{ span: 8, offset: 2 }} style={{ fontSize: "smaller", color: "777" }}>
                                       * {t("form.passwordDescription")} 
                                        </Col>
                                       
                                    </Row>

                                    <DynamicForm
                                        formSchema={formSchemaSignup}
                                        submitFunction={`onSubmit_signup`}
                                        buttonName={t("form.signup")}
                                        parentId={""}
                                        multilangual={true}
                                    ></DynamicForm>
                                </span>

                                <div style={{ display: "none" }} className="text-center" id="resendActivation">
                                    <p >{t("form.check")} </p>
                                    <p id="reActivationNumber"></p>
                                    <Link to="/auth/users/activation/"> {t("form.activate")}</Link>
                                    <br />
                                    <br />
                                    <p type="button" style={{ textDecorationLine: "underline" }} onClick={reSendActivation} >{t("form.resend")} </p>
                                </div>
                            </div></div></div>


                </Modal.Body>
                <Modal.Footer style={style}>

                    <Container className="text-center">
                        <Row >
                            <Col className="">
                                <Link to="/auth/users/activation/"> {t("form.activateNote")}</Link>
                                {t("form.signupNote")}
                                <span className="button" type="button" style={{ textDecorationLine: "underline", fontSize: "120%" }} onClick={handleShowLogin}> {t('form.login')} </span>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Footer>
                <Modal.Footer style={style}>

                    <Container className="text-center">
                        <Row >
                            <Col>
                                <span className="button" type="button" onClick={handleShowPolicy}>
                                    {t('form.policy')}
                                </span>
                            </Col>

                        </Row>
                    </Container>

                </Modal.Footer>
            </Modal>

            <Modal
                show={showPolicy}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
                className={`${t("style.rtl")}`}

            >
                <Modal.Header closeButton >
                    <Modal.Title>{t("form.policy")}</Modal.Title>

                </Modal.Header >
                <Modal.Body >
                    <div id="div1" style={{ height: "55vh", position: "relative" }}>
                        <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>
                                <Text1 size="small"> {t("style.rtl") === "rtl"
                                    ? <ReactMarkdown>{privacyPolicyArabic}</ReactMarkdown>
                                    : <ReactMarkdown>{privacyPolicyEnglish}</ReactMarkdown>
                                }
                                </Text1></div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer >
                    <Container className="text-center">
                        <Row >
                            <Col>
                                <div className="button" type="button" onClick={handleClosePolicy}>
                                    {t('form.accept')}
                                </div>
                            </Col>
                            <Col>
                                <div className="button" type="button" onClick={handleClose}>
                                    {t('form.close')}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}

export default AuthModal;