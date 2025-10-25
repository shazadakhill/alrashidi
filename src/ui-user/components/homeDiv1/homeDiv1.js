import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import HomeDiv1Img from "../../../assets/homeDiv1.jpg"
import Checklist from "../../../assets/Checklist.png"
import { useTranslation } from 'react-i18next';
import Meta from "../../../jsonFiles/meta/meta.json"
import '../../../styles/_userStyling/components/homeDiv1.scss'
const HomeDiv1 = (props) => {

  const { t } = useTranslation();

  return (
    <div className={`${t("style.rtl")} homeDiv1 `}>
      <Container style={{ alignItems: "center" }}>
        <Row>
          <Col xs={12} md={6}>
            <img className="img-fluid"
              style={{ width: "100%", height: "auto" }}
              alt=""
              src={Checklist}
            >
            </img>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-left pargraph" >
            <p >{t("style.rtl")==="rtl"?Meta.websiteName1Ar:Meta.websiteName1En} </p>
            <p >{t("style.rtl")==="rtl"?Meta.websiteName2Ar:Meta.websiteName2En} </p>
            <p > {t('homeDiv1.content')}</p>
          </Col>
        </Row>
      </Container>

    </div>
  )
};
export default HomeDiv1;