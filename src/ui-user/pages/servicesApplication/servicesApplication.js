import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import "../../../styles/_userStyling/pages/servicesApplication.scss"
import ApiURL from '../../../jsonFiles/api/api.json'
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import { withTranslation } from 'react-i18next';
import Meta from "../../../jsonFiles/meta/meta.json"
import Heading from '../../components/heading/heading';





class ServicesApplication extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;


    axios.get(`${ApiURL.domain}${ApiURL.services}${this.props.match.params.id}/`).then(
      response => {
        if (this.mounted) {
          let formSchema = {}
          let fieldTemplates = response.data.fieldTemplates;
          let fileFieldTemplates = response.data.fileFieldTemplates;

          for (var i = 0; i < fieldTemplates.length; i++) {
            formSchema[fieldTemplates[i].title] = fieldTemplates[i];
            formSchema[fieldTemplates[i].title] = { ...formSchema[fieldTemplates[i].title], inputType: "text" }
          }
          for (var j = 0; j < fileFieldTemplates.length; j++) {
            formSchema[fileFieldTemplates[j].title] = fileFieldTemplates[j];
            formSchema[fileFieldTemplates[j].title] = { ...formSchema[fileFieldTemplates[j].title], inputType: "file" }
          }
          this.setState({
            NameOfService:response.data.title,
            Services: formSchema,
            ServiceStatus: true
          })
        }
      });





  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    NameOfService:"",
    Services: {},
    ServiceStatus: false
  }




  render() {
    let services = null;
    const { t } = this.props;
    if (this.state.ServiceStatus) {
      services = (
        <span id="applicationFormDiv">
          <DynamicForm
            formSchema={this.state.Services}
            submitFunction={`onSubmit_servicesApplication`}
            buttonName={t("form.submit")}
            parentId={this.props.match.params.id}
          ></DynamicForm>
        </span>
      )
    } else {
      services = (<LoadingSpinner />)
    }
    return (
      <div className="servicesApplication" style={{ display: "block" }}>

        <Helmet>
          <title>
            {Meta.servicesApplication.title}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={Meta.servicesApplication.description} />
        </Helmet>
        <Heading type="h3" > ({this.state.NameOfService})</Heading>
        
        {services}
        <div id="paymentCodeDiv" style={{ display: "none" }}>
          <p style={{ margin: "20px" }}>{t("servicesApplication.submitNote1")}</p>
          <h2 id="paymentCode"> </h2>
          <p>{t("servicesApplication.submitNote2")}</p>
          <p>{t("servicesApplication.submitNote3")}</p>
        </div>
      </div>
    )
  }
};
export default withTranslation()(ServicesApplication);