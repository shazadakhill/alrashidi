import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux'
import { getToken, authLogout } from '../../../reduxFolder/action/auth'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Logo from "../../../assets/logo.png"
import "../../../styles/_userStyling/components/userNavbar.scss"
import { NavLink } from 'react-router-dom';
import "../../../styles/_adminStyling/components/adminNavbar.scss"
import { AiOutlineSetting } from "react-icons/ai"
import ProfileImage from "../../components/profileImage/profileImage"


const AdminNavbar = (props) => {

  const [expanded, setExpanded] = useState(false);



  return (
    <div className="adminNavbar rtl"   >

      <Navbar expanded={expanded} collapseOnSelect expand="lg" className="fixed-top custom-Navbar navbar-dark" >
        <Navbar.Brand ><img alt="" className="img-fluid" style={{ width: "30px" }} src={Logo}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="responsive-navbar-nav " >
          <Nav className="mr-auto">
            <NavDropdown title=" لوحة الإدارة" id="navbarScrollingDropdown" style={{ margin: "auto" }}>
              <NavDropdown.Item as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link-dropdown" exact to="/admin/dashboard" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}> لوحة الإدارة</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link-dropdown" exact to="/admin/employees-reports" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}> تقارير الموظفين</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link-dropdown" exact to="/admin/applications-reports" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>  تقارير الطلبات </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link" exact to="/admin/settings" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}> <AiOutlineSetting /> الاعدادات</Nav.Link>
            <Nav.Link as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link" to="/admin/users/" onClick={() => setTimeout(() => { setExpanded(false) }, 150)} >المستخدمين </Nav.Link>
            <Nav.Link as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link" to="/admin/applications/" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>مجموعة الطلبات</Nav.Link>
            <Nav.Link as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link" to="/admin/services/" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}>الخدمات</Nav.Link>
            <Nav.Link style={{ margin: "auto" }} className="custom-Nav-Link"><ProfileImage /></Nav.Link>
            <Nav.Link style={{ margin: "auto" }} onClick={() => props.authLogout()} className="custom-Nav-Link">تسجيل الخروج</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} style={{ margin: "auto" }} className="custom-Nav-Link" to="/" onClick={() => setTimeout(() => { setExpanded(false) }, 150)}> العودة الى الموقع الرئيسي</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
};
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token,
    loginProps: state.auth
  }
}
export default connect(mapStateToProps, { getToken, authLogout })(AdminNavbar);