import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import "../../../styles/_userStyling/pages/profile.scss"
import { Col, Container, Row, NavDropdown, } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import ProfileImage from '../../components/profileImage/profileImage';
import { AiOutlineEdit } from 'react-icons/ai'
import EditSignUpForm from "../../../jsonFiles/staticForms/accounts/editSignup_Me.json"
import EditSignUpEmployeeForm from "../../../jsonFiles/staticForms/accounts/editSignup_Me_Employee.json"
import { AiOutlineSetting } from "react-icons/ai"

import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import ConfirmPasswordModal from "../../modals/confirmPasswordModal/confirmPasswordModal"
import ChangePasswordModal from "../../modals/changePasswordModal/changePasswordModal"
// import ChangeNumberModal from "../../modals/ChangeNumberModal/ChangeNumberModal"
import { AiOutlineDelete } from "react-icons/ai"
class Profile extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;

    const token = 'Bearer '.concat(this.props.loginProps.token);
    axios.get(`${ApiURL.domain}${ApiURL.myUser}`, { "headers": { Authorization: token } }).then(
      response => {
        if (this.mounted) {
          this.setState({
            MyUser: response.data,
            MyUserStatus: true
          })
          axios.get(`${ApiURL.domain}${ApiURL.zone}${response.data.zone}/`).then(
            response => {
              this.setState({
                zone: response.data.name,
              })
              axios.get(`${ApiURL.domain}${ApiURL.governorate}${response.data.governorate}/`).then(
                response => {
                  if (this.mounted) {
                    this.setState({
                      governorate: response.data.name,
                      MyUserStatus: true
                    })
                  }
                })
            });
        }
      })
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    MyUser: null,
    MyUserStatus: false,
    zone: null,
    governorate: null,
    editSignup: false,
  }
  render() {
    let myUser = null;
    const { t } = this.props;
    const style1 = {
      marginBottom: "15px",
    }

    let formSchemaEditSignup = {}
    for (var z = 0; z < EditSignUpForm.length; z++) { formSchemaEditSignup[EditSignUpForm[z].titleEn] = EditSignUpForm[z]; }

    let formSchemaEditSignupEmployee = {}
    for (var y = 0; y < EditSignUpEmployeeForm.length; y++) { formSchemaEditSignupEmployee[EditSignUpEmployeeForm[y].titleEn] = EditSignUpEmployeeForm[y]; }

    let governorates = [];

    axios.get(`${ApiURL.domain}${ApiURL.governorate}`).then(
      response => {
        formSchemaEditSignup["zone"].options = []
        formSchemaEditSignupEmployee["zone"].options = []

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
            }).map((zone,index) => {
              return (<React.Fragment key={index}>
                {formSchemaEditSignup["zone"].options.push(
                  {
                    "label": `${governorate.name} _ ${zone.name}`,
                    "value": zone.id
                  }
                )}
                {formSchemaEditSignupEmployee["zone"].options.push(
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




    if (this.state.MyUserStatus) {
      myUser = (
        <Row>
          {this.state.MyUser.fullName
            ? <Col xs={12} md={4} style={style1}> <span><h6>{t("profile.fullName")} </h6> <p>{this.state.MyUser.fullName}</p></span></Col>
            : null}
          {this.state.MyUser.nationalId
            ? <Col xs={12} md={4} style={style1}> <span><h6>{t("profile.nationalId")} </h6> <p>{this.state.MyUser.nationalId}</p></span></Col>
            : null}
          {this.state.MyUser.phone
            ? <Col xs={12} md={4} style={style1}> <span><h6>{t("profile.phone")} </h6> <p  style={{direction:"ltr"}}>{this.state.MyUser.phone}</p></span></Col>
            : null}
          {this.state.zone
            ? <Col xs={12} md={4} style={style1}> <span><h6>{t("profile.zone")} </h6> <p>{this.state.governorate} ,{this.state.zone}</p></span></Col>
            : null}

          {this.props.loginProps.userType === "admin"
            ? null
            : <Col xs={12} md={4}>
              <NavDropdown
                title={<span><AiOutlineSetting /></span>}
                id="basic-nav-dropdown" className="custom-NavDropdown">
                <div style={{ marginRight: "20px", marginLeft: "20px" }}>
                  <ChangePasswordModal
                    submitFunction={`onSubmit_Change_MyPassword`}
                    buttonName={<>{t("profile.changePassword")}</>}
                  ></ChangePasswordModal>
                </div>
                {/* <NavDropdown.Divider />
                <div style={{ marginRight: "20px", marginLeft: "20px" }}>
                  <ChangeNumberModal
                    submitFunction={`onSubmit_Change_MyPhone`}
                    buttonName={<> {t("profile.changePhone")}</>}
                  ></ChangeNumberModal>
                </div> */}
                <NavDropdown.Divider />
                <div style={{ marginRight: "20px", marginLeft: "20px" }}>
                  <ConfirmPasswordModal
                    submitFunction={`onSubmit_Delete_MyAccount`}
                    buttonName={<><AiOutlineDelete />{t("profile.deleteAccount")}</>}
                  ></ConfirmPasswordModal>
                </div>

              </NavDropdown>
            </Col>}
          {this.props.loginProps.userType === "admin"
            ? null
            : <Col xs={12} md={4} style={style1} onClick={() => { this.setState({ editSignup: true }) }} type="button"> <AiOutlineEdit /></Col>
          }
        </Row>
      )
    } else {
      myUser = (<LoadingSpinner />)
    }
    return (
      <>
        <div className="profile ">
          <Container className={`${t("style.rtl")} text-center`}>

            <Row className="div">

              <Col xs={12} md={3} >
                <h2> {this.props.loginProps.userName}</h2>
                <ProfileImage size="170px"></ProfileImage>

              </Col>

              <Col xs={12} md={9}>
                {myUser}
              </Col>

            </Row>
          </Container>
        </div >
        <span style={{ display: `${this.state.editSignup === true ? "block" : "none"}` }}>
          <DynamicForm
            formSchema={this.props.loginProps.userType === "user" ? formSchemaEditSignup : formSchemaEditSignupEmployee}
            formData={this.state.MyUser}
            submitFunction={`onSubmit_editSignup`}
            buttonName={t("form.confirm")}
            parentId={""}
            multilangual={true}
          ></DynamicForm>
        </span>
      </>
    )
  }
};
const mapStateToProps = state => {

  return {
    loginProps: state.auth
  }

}


export default withTranslation()(connect(mapStateToProps)(Profile));