import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from "../../../assets/logo.png"
import "../../../styles/_userStyling/components/userFooter.scss"
import { Navbar, Container, Nav, Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from "axios"
import moment from 'moment'
import Meta from "../../../jsonFiles/meta/meta.json"
const UserFooter = (props) => {

  const { t } = useTranslation();
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const [companyEmail, setCompanyEmail] = React.useState(null);
  const [companyNumber, setCompanyNumber] = React.useState(null);


  React.useEffect(() => {

    axios.get(`${ApiURL.domain}${ApiURL.settings}`).then(
      response => {
        const detail = response.data;
        setCompanyEmail(detail.email);
        setCompanyNumber(detail.number);
      });
  });


  return (
    <div className={`userFooter ${t("style.rtl")}`} >
      <Container className={` custom-Footer text-center`} >

        <Row>
          <Col xs={12}  md={0} lg={1}></Col>
          <Col xs={12} md={3} lg={3}  >
            <Row className="text-center">
              <Col><Navbar.Brand as={NavLink} to="/home" className="custom-Footer-Brand heading " style={{margin:"auto"}} >
                <img
                  alt=""
                  src={Logo}
                  height="auto"
                  width="95"
                  className="d-inline-block align-top "
                />
              </Navbar.Brand>
              </Col>
            </Row>
            <Row className="text-center">
              <Col xs={12} style={{color:"white" , fontSize:"10px"}}>
              {t("style.rtl")==="rtl" ?Meta.websiteName1Ar:Meta.websiteName1En} 
              </Col>
              <Col xs={12} style={{color:"white" , fontSize:"10px"}}>
              {t("style.rtl")==="rtl" ?Meta.websiteName2Ar:Meta.websiteName2En} 
              </Col>
            </Row>
          </Col>

          <Col xs={12} md={3} lg={3} className="text-center text-md-left">
            <Row ><Col className="heading"> {t('userFooter.explore')}</Col></Row>
            <Row><Col> <Nav.Link as={NavLink} to="/" onClick={scrollTop} className="custom-Footer-Item">{t('userFooter.home')}</Nav.Link></Col></Row>
            <Row><Col> <Nav.Link as={NavLink} to="/privacyPolicy" onClick={scrollTop} className="custom-Footer-Item">{t('userFooter.policy')}</Nav.Link></Col></Row>
            <Row><Col> <Nav.Link as={NavLink} to="/aboutUs" onClick={scrollTop} className="custom-Footer-Item">{t('userFooter.aboutUs')}</Nav.Link></Col></Row>
          </Col>

          <Col xs={12} md={3} lg={3} className="text-center text-md-left">
            <Row><Col className="heading"> {t('userFooter.contact')}</Col></Row>
            <Row><Col> <p className="custom-Footer-Item">{!companyEmail ? 'Loading...' : `${companyEmail}`}</p></Col></Row>
            <Row><Col> <p className="custom-Footer-Item">{!companyNumber ? 'Loading...' : `${companyNumber} `}</p></Col></Row>
            <Row><Col> <Nav.Link as={NavLink} to="contactUs" onClick={scrollTop} className="custom-Footer-Item">{t('userFooter.contactUs')}</Nav.Link></Col></Row>
          </Col>

          <Col xs={12} md={3} lg={1} className="text-center text-md-left heading">
            <Row>
              <Nav.Link as={NavLink} to="/collections" onClick={scrollTop} className="custom-Footer-Item heading">
                <Col xs={12} >
                  <svg style={{ fill: "#fff", width: "30px", margin: "5px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125.07 128.55"><defs><style>.cls-1</style></defs><g id="Layer_2" data-name="Layer 2"><g id="services"><path className="cls-1" d="M96,31.33a10.5,10.5,0,0,1-5.58-16.41,33.59,33.59,0,0,0-5-5.89,10.47,10.47,0,0,1-5.35,1.47A10.49,10.49,0,0,1,69.62.75,33.84,33.84,0,0,0,62.53,0q-.68,0-1.35,0a10.5,10.5,0,0,1-10,7.37,10.5,10.5,0,0,1-6.5-2.24,32.79,32.79,0,0,0-6.45,5.28,10.52,10.52,0,0,1-8.36,15.47A33.79,33.79,0,0,0,29,33.56q0,.59,0,1.17a10.51,10.51,0,0,1,5.41,17.14,33.12,33.12,0,0,0,5.35,6.34,10.39,10.39,0,0,1,5.54-1.59,10.5,10.5,0,0,1,10.48,9.82,33.38,33.38,0,0,0,6.75.68q1,0,2-.06a10.5,10.5,0,0,1,17.21-6A33.67,33.67,0,0,0,87.46,56a10.38,10.38,0,0,1-1.86-6,10.5,10.5,0,0,1,10-10.49,34.15,34.15,0,0,0,.54-6C96.1,32.81,96.07,32.07,96,31.33ZM62.53,50.08A16.52,16.52,0,1,1,79.05,33.56,16.52,16.52,0,0,1,62.53,50.08Z" /><path className="cls-1" d="M0,99.19l33.45,29.36,9.09-5.62-2.23-3.61,46.18-13.51s10.76-7.87,14.81-16.2S125,47.71,125,47.71s1-8.3-9.64-1.73L95,77.89,66.25,92.63s-.13.21-1.43-.09L90.59,75.47a17,17,0,0,0,3.51-3.1c2.14-2.51,4.92-6.58,1.54-7.68C88.88,62.5,79.44,68,79.44,68S66.5,76.8,51.17,75.85c0,0-13.2,3.48-29.51,15.76l-4.59-3Z" /></g></g></svg>

                  {t('userFooter.services')}
                </Col>

              </Nav.Link>
            </Row>
          </Col>
          <Col xs={12} md={0} lg={1}></Col>

        </Row>


        <Row><Col> <p onClick={scrollTop} className="custom-Footer-Item2" > {t('userFooter.backToTop')}</p></Col></Row>

        <Row> <Col xs={2} /><Col xs={8}><hr style={{ color: "#fff", margin: "10px" }} /> </Col><Col xs={2} /> </Row>

        <Row><Col > <p className="custom-Footer-Item3">{t('userFooter.rights')} {moment().format('YYYY')}</p></Col></Row>

      </Container>
    </div>
  )
};
export default UserFooter;