import React, { Component } from 'react';
import { connect } from 'react-redux'
import "../../../styles/_userStyling/pages/profile.scss"
import { Col, Row } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import { AiOutlineEdit } from 'react-icons/ai'
import EditSettingsForm from "../../../jsonFiles/staticForms/editSettingsForm.json"

import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import CollapsedText from '../../components/collapsedText/collapsedText';
import ReactMarkdown from 'react-markdown'

class Settings extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;
    axios.get(`${ApiURL.domain}${ApiURL.settings}`).then(
      response => {
        if (this.mounted) {
          this.setState({
            MySettings: response.data,
            MySettingsStatus: true
          })
        }
      })
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    MySettings: null,
    MySettingsStatus: false,
    editSettings: false,
  }
  render() {
    let mySettings = null;
    let editForm = null;

    const style1 = {
    }

    if (this.state.MySettingsStatus) {
      mySettings = (
        <Row>
          {this.state.MySettings.privacyPoilicy
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="سياسة الخصوصية (باللغة العربية)" content={<ReactMarkdown>{this.state.MySettings.privacyPoilicy}</ReactMarkdown>}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="سياسة الخصوصية (باللغة العربية)" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.privacyPoilicyEnglish
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="سياسة الخصوصية (باللغة الانكليزية)" content={<ReactMarkdown>{this.state.MySettings.privacyPoilicyEnglish}</ReactMarkdown>}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="سياسة الخصوصية (باللغة الانكليزية)" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.aboutUs
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="من نحن (باللغة العربية)" content={<ReactMarkdown>{this.state.MySettings.aboutUs}</ReactMarkdown>}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="من نحن (باللغة العربية)" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.aboutUsEnglish
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="من نحن (باللغة الانكليزية)" content={<ReactMarkdown>{this.state.MySettings.aboutUsEnglish}</ReactMarkdown>}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="من نحن (باللغة الانكليزية)" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.address
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="عنوان أول" content={this.state.MySettings.address}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="عنوان أول" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.address2
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="عنوان ثاني" content={this.state.MySettings.address2}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="عنوان ثاني" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.email
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="ايميل أول" content={this.state.MySettings.email}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="ايميل أول" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.email2
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="إيميل ثاني" content={this.state.MySettings.email2}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="إيميل ثاني" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.number
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="رقم أول" content={this.state.MySettings.number}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="رقم أول" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.number2
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="رقم ثاني" content={this.state.MySettings.number2}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="رقم ثاني" content={"/"}></CollapsedText><hr/></Col>}
       {this.state.MySettings.androidAppLink
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="رابط تطبيق الاندرويد" content={this.state.MySettings.androidAppLink}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="رابط تطبيق الاندرويد" content={"/"}></CollapsedText><hr/></Col>}
          {this.state.MySettings.iosAppLink
            ? <Col style={style1} xs={12} md={6}><CollapsedText heading="رابط تطبيق ال ios" content={this.state.MySettings.iosAppLink}></CollapsedText><hr /></Col>
            : <Col style={style1} xs={12} md={6}><CollapsedText heading="رابط تطبيق ال ios" content={"/"}></CollapsedText><hr/></Col>}

        </Row >
      )

    } else {
      mySettings = (<LoadingSpinner />)
    }
    if (this.state.MySettingsStatus) {

      editForm = (<DynamicForm
        formSchema={EditSettingsForm}
        formData={this.state.MySettings}
        submitFunction={`onSubmit_editSettings`}
        buttonName={"تأكيد"}
        parentId={""}
      ></DynamicForm>)
    } else {
      editForm = (<LoadingSpinner />)
    }
    return (
      <>
        <Row className="div settings text-center">

          <Col xs={12} md={12}>
            {mySettings}
          </Col>
          <Col xs={12} md={12}>
            <Row>
              <Col style={style1} xs={12} onClick={() => { this.setState({ editSettings: true }) }} type="button">تعديل المعلومات <AiOutlineEdit /></Col>
              <Col xs={12}>
                <span style={{ display: `${this.state.editSettings === true ? "block" : "none"}` }}>
                  {editForm}
                </span>
              </Col>
            </Row>
          </Col>

        </Row>

      </>
    )
  }
};
const mapStateToProps = state => {

  return {
    loginProps: state.auth
  }

}


export default connect(mapStateToProps)(Settings);