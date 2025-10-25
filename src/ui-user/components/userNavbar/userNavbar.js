import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { getToken, authLogout } from '../../../reduxFolder/action/auth'
import { Navbar, Container, Nav, NavDropdown, Col, Row } from 'react-bootstrap'
import Logo from "../../../assets/logo.png"
import "../../../styles/_userStyling/components/userNavbar.scss"
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import Search from '../search/search'
import { useLocation } from 'react-router';
import ProfileImage from "../../components/profileImage/profileImage"
import Meta from "../../../jsonFiles/meta/meta.json"



const UserNavbar = (props) => {

  const { t, i18n } = useTranslation();

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };
  const hundleSetLanguge = (lang) => {
    i18n.changeLanguage(lang);
  }


  const [navbar, setNavbar] = useState(true);

  const changeNavbarBackgroundColor = () => {
    if (window.scrollY <= 2) {
      if (window.location.pathname === "/home" || window.location.pathname === "/") { setNavbar(false) }
      else { setNavbar(true) }
    }
    else { setNavbar(true) }
  }

  window.addEventListener('scroll', changeNavbarBackgroundColor)

  const location = useLocation();
  useEffect(() => {
    changeNavbarBackgroundColor()
  }, [location.pathname]);


  function closeSideMenue() { document.getElementById("sideMenu").style.width = "0px"; }
  function openSideMenue() {

    let width = window.innerWidth
    width >= 0 && width <= 400
      ? document.getElementById("sideMenu").style.width = "94%"
      : width > 400 && width <= 600
        ? document.getElementById("sideMenu").style.width = "85%"
        : document.getElementById("sideMenu").style.width = "70%"
  }




  useEffect(() => {
    getToken();
  }, [])


  return (
    <div className={`userNavbar ${t("style.rtl")}`}  >
      <Navbar expand="md" variant="dark" fixed="top" className={navbar ? 'custom-Navbar HNav' : 'custom2-Navbar HNav'} >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="custom-Nav">
              <Nav.Link as={NavLink} to="/home" className="custom-Nav-Link">{t('userNavbar.home')}</Nav.Link>
              <Nav.Link as={NavLink} to="/collections" className="custom-Nav-Link">{t('userNavbar.services')}</Nav.Link>
              <Nav.Link as={NavLink} to="/contactUs" className="custom-Nav-Link">{t('userNavbar.contactUs')}</Nav.Link>

              {!props.isAuth
                ? <Nav.Link as={NavLink} to="/signin" className="custom-Nav-Link">{t('userNavbar.signup')}</Nav.Link>
                : props.loginProps.userType === "user"
                  ? <NavDropdown
                    title={<span> <ProfileImage /></span>}
                    id="basic-nav-dropdown" className="custom-NavDropdown">
                    <NavDropdown.Item as={NavLink} to="/profile" className="custom-NavDropdown-Item">{t('userNavbar.profile')}</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/my-applications" className="custom-NavDropdown-Item">{t('userNavbar.myapplications')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => props.authLogout()} className="custom-NavDropdown-Item">{t('userNavbar.logout')}</NavDropdown.Item>
                  </NavDropdown>
                  : props.loginProps.userType === "employee"
                    ? <NavDropdown
                      title={<span> <ProfileImage /></span>}
                      id="basic-nav-dropdown" className="custom-NavDropdown">
                      <NavDropdown.Item as={NavLink} to="/profile" className="custom-NavDropdown-Item">{t('userNavbar.profile')}</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/my-applications" className="custom-NavDropdown-Item">{t('userNavbar.myapplications')}</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/my-assigned-applications" className="custom-NavDropdown-Item">{t('userNavbar.assignedApplications')}</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={() => props.authLogout()} className="custom-NavDropdown-Item">{t('userNavbar.logout')}</NavDropdown.Item>
                    </NavDropdown>
                    : props.loginProps.userType === "admin"
                      ? <NavDropdown
                        title={<span> <ProfileImage /></span>}
                        id="basic-nav-dropdown" className="custom-NavDropdown">
                        <NavDropdown.Item as={NavLink} to="/profile" className="custom-NavDropdown-Item">{t('userNavbar.profile')}</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/admin/dashboard" className="custom-NavDropdown-Item">{t('userNavbar.dashboard')}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => props.authLogout()} className="custom-NavDropdown-Item">{t('userNavbar.logout')}</NavDropdown.Item>
                      </NavDropdown>
                      : null
              }
              <NavDropdown title={t('userNavbar.language')} id="basic-nav-dropdown" className="custom-NavDropdown">
                <NavDropdown.Item className="custom-NavDropdown-Item" value="arabic" onClick={e => hundleSetLanguge("ar")} >{t('userNavbar.languageAr')}</NavDropdown.Item>
                <NavDropdown.Item className="custom-NavDropdown-Item" value="english" onClick={e => hundleSetLanguge("en")}>{t('userNavbar.languageEn')}</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Search closeSideMenueHundler={closeSideMenue}></Search>


          </Navbar.Collapse>
          {/* {t('userNavbar.brandName')} */}
          <Navbar.Brand as={NavLink} to="/" className="custom-Navbar-Brand" style={{ fontSize: "10px" }}>
            <Row style={{padding:"0px"}}>
              
              <Col xs={10} style={{padding:"0px",paddingTop:"9px"}}>
                {t("style.rtl") === "rtl" ? Meta.websiteName1Ar : Meta.websiteName1En}
              </Col>
              <Col xs={2} style={{padding:"0px"}}>
                <img
                  alt=""
                  src={Logo}
                  height="auto"
                  width="40"
                  className="d-inline-block align-top "
                />
              </Col>
            </Row>


          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* mobile navbar */}
      <div className='row VNav'>
        <Navbar fixed="top" expand="lg" variant="dark" className='custom-Navbar'  >
          <Container>
            <Navbar.Toggle onClick={openSideMenue} className="custom-Navbar-toggle" />
           
            <Navbar.Brand as={NavLink} to="/home" className="custom-Navbar-Brand" style={{ fontSize: "12px" }}>

            <Row style={{padding:"0px", marginLeft:"5px"}}>
              
              <Col xs={10} style={{padding:"0px",paddingTop:"9px"}}>
              {t("style.rtl") === "rtl" ? Meta.websiteName1Ar : Meta.websiteName1En}
              </Col>
              <Col xs={2} style={{padding:"0px"}}>
              <img
                alt=""
                src={Logo}
                height="auto"
                width="40"
                className="d-inline-block align-top "
              /> </Col>
              </Row>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container className={` ${t("style.vNav.sideMenu")} text-center`} id="sideMenu">

          <Row>
            <Col xs={10}></Col>
            <Col xs={2}><AiOutlineClose onClick={closeSideMenue} className="custom-Navbar-close" /></Col>
          </Row>


          <Row >
            <Col>
              <Navbar.Brand as={NavLink} to="/home" className="custom-Navbar-Brand" onClick={closeSideMenue} >
                <img
                  alt=""
                  src={Logo}
                  height="auto"
                  width="120"
                  className="d-inline-block align-top "
                />
              </Navbar.Brand>
            </Col>
          </Row>
          {props.isAuth
            ? < Row >
              <Col xs={2} />
              <Col ><Nav.Link as={NavLink} to="/" onClick={closeSideMenue} className="custom-Nav-Link">{t('userNavbar.home')} </Nav.Link></Col>
              <Col >  <ProfileImage /></Col>
            </Row>
            : < Row >
              <Col ><Nav.Link as={NavLink} to="/" onClick={closeSideMenue} className="custom-Nav-Link">{t('userNavbar.home')} </Nav.Link></Col>
              <Col><Nav.Link as={NavLink} to="/signin" onClick={(e) => { scrollTop(e); closeSideMenue(e) }} className="custom-Nav-Link">{t('userNavbar.signup')}</Nav.Link></Col>
            </Row>
          }


          <Row><Col xs={1}></Col><Col xs={10}><NavDropdown.Divider /></Col> <Col xs={1}></Col></Row>

          <Row>
            <Col><Nav.Link as={NavLink} to="/collections" onClick={closeSideMenue} className="custom-Nav-Link">{t('userNavbar.services')} </Nav.Link></Col>
            <Col><Nav.Link as={NavLink} to="/aboutUs" onClick={closeSideMenue} className="custom-Nav-Link">{t('userNavbar.aboutUs')}</Nav.Link></Col>
            <Col><Nav.Link as={NavLink} to="/contactUs" onClick={closeSideMenue} className="custom-Nav-Link">{t('userNavbar.contactUs')}</Nav.Link></Col>
          </Row>

          <Row><Col xs={1}></Col><Col xs={10}><NavDropdown.Divider /></Col> <Col xs={1}></Col></Row>



          <Row>
            <Col></Col>
            <Col>
              <Nav.Link onClick={e => { closeSideMenue(); hundleSetLanguge("ar"); }} className="custom-Nav-Link">{t('userNavbar.languageAr')}</Nav.Link>
            </Col>
            <Col>
              <Nav.Link onClick={e => { closeSideMenue(); hundleSetLanguge("en"); }} className="custom-Nav-Link">{t('userNavbar.languageEn')}</Nav.Link>
            </Col>
            <Col></Col>
          </Row>

          <Row>
            <Col>
              <Search closeSideMenueHundler={closeSideMenue}></Search>
            </Col>
          </Row>
          <Row>
            <Col>
              {!props.isAuth
                ? null
                : props.loginProps.userType === "user"
                  ? <Row>
                    <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link as={NavLink} onClick={(e) => { scrollTop(e); closeSideMenue(e) }} to="/profile" className="custom-Nav-Link">{t('userNavbar.profile')}</Nav.Link></Col><br />
                    <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link as={NavLink} onClick={(e) => { scrollTop(e); closeSideMenue(e) }} to="/my-applications" className="custom-Nav-Link">{t('userNavbar.myapplications')}</Nav.Link></Col><br />
                    <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link onClick={() => props.authLogout()} className="custom-Nav-Link">{t('userNavbar.logout')}</Nav.Link></Col><br />
                  </Row>
                  : props.loginProps.userType === "employee"
                    ? <Row>
                      <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link as={NavLink} onClick={(e) => { scrollTop(e); closeSideMenue(e) }} to="/profile" className="custom-Nav-Link">{t('userNavbar.profile')}</Nav.Link></Col><br />
                      <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link as={NavLink} onClick={(e) => { scrollTop(e); closeSideMenue(e) }} to="/my-applications" className="custom-Nav-Link">{t('userNavbar.myapplications')}</Nav.Link></Col><br />
                      <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link as={NavLink} onClick={(e) => { scrollTop(e); closeSideMenue(e) }} to="/my-assigned-applications" className="custom-Nav-Link">{t('userNavbar.assignedApplications')}</Nav.Link></Col><br />
                      <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link onClick={() => props.authLogout()} className="custom-Nav-Link">{t('userNavbar.logout')}</Nav.Link></Col><br />
                    </Row>
                    : props.loginProps.userType === "admin"
                      ? <Row>
                        <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link as={NavLink} onClick={(e) => { scrollTop(e); closeSideMenue(e) }} to="/profile" className="custom-Nav-Link">{t('userNavbar.profile')}</Nav.Link></Col><br />
                        <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link as={NavLink} onClick={(e) => { scrollTop(e); closeSideMenue(e) }} to="/admin/dashboard" className="custom-Nav-Link">{t('userNavbar.dashboard')}</Nav.Link></Col><br />
                        <Col xs={12} style={{ marginBottom: "15px" }}> <Nav.Link onClick={() => props.authLogout()} className="custom-Nav-Link">{t('userNavbar.logout')}</Nav.Link></Col><br />
                      </Row>
                      : null
              }</Col>
          </Row>
        </Container>


      </div>
    </div >
  )
};
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token,
    loginProps: state.auth
  }
}
export default connect(mapStateToProps, { getToken, authLogout })(UserNavbar);
