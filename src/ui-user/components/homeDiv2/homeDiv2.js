import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import socialMedia from "../../../assets/social-media.png"
import home from "../../../assets/icons/home.png"
import { useTranslation } from 'react-i18next';
import '../../../styles/_userStyling/components/homeDiv2.scss'
const HomeDiv2 = (props) => {

    const { t } = useTranslation();

    return (
        <div className={`${t("style.rtl")} homeDiv2 `}>
            <Container style={{ alignItems: "center" }}>

                <Row>
                    <Col xs={12} md={3} ></Col>
                    <Col xs={12} md={4} className="text-center text-md-left pargraph" >
                        <img className=" image img-fluid"
                            style={{ width: "70%", height: "auto" }}
                            alt=""
                            src={home}
                        >
                        </img>
                        {/* <p > {t('homeDiv2.content')}</p> */}
                    </Col>
                    <Col xs={12} md={3}>
                        <img className=" image img-fluid"
                            style={{ width: "100%", height: "auto" }}
                            alt=""
                            src={socialMedia}
                        >
                        </img>
                    </Col>
                    <Col xs={12} md={2}></Col>
                </Row>
            </Container>
        </div>
    )
};
export default HomeDiv2;