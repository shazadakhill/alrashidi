import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/heading/heading';
import Button from '../../components/button/button';
import "../../../styles/_userStyling/pages/servicesDetails.scss"
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import { Link } from 'react-router-dom';
import axios from 'axios'
import ApiURL from '../../../jsonFiles/api/api.json'
import ReactMarkdown from 'react-markdown';
import { withTranslation } from 'react-i18next';
import Text1 from '../../components/text1/text1';
import Meta from "../../../jsonFiles/meta/meta.json"





class ServicesDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;



    axios.get(`${ApiURL.domain}${ApiURL.services}${this.props.match.params.id}/`).then(
      response => {
        if (this.mounted) {
          this.setState({
            Services: response.data,
            ServiceStatus: true
          })
        }
      });


  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    Services: {},
    ServiceStatus: false
  }
  render() {
    const { t } = this.props;
    let services = null;

    if (this.state.ServiceStatus) {
      services = (
        <div  >
          <Container>
            <Row className="div">
              <Col xs={12}>
                <Heading type="h1" > {this.state.Services.title} </Heading>
              </Col>
            </Row>
            <Row className="div">
              <Col xs={12}>
                <Heading type="h4" > {t("serviceDetails.heading1")}</Heading>
                <Text1><ReactMarkdown>{this.state.Services.details}</ReactMarkdown></Text1>
              </Col>
            </Row>
            <Row className="div">
              <Col xs={12}>
                <Heading type="h4" > {t("serviceDetails.heading2")} </Heading>
                <Text1 > {this.state.Services.fileFieldTemplates.length === 0 ?  t("serviceDetails.nothinRequired") :
                  this.state.Services.fileFieldTemplates.sort(function (a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    return 0;
                  }).map((files,index) => {
                    return (<span key={index}>
                      &nbsp;&#8214;&nbsp;{files.title}
                    </span>
                    )
                  })
                }
                </Text1>
              </Col>
            </Row>
            <Row className="div">
              <Col xs={12}>
                <Heading type="h4" > {t("serviceDetails.heading3")} </Heading>
                <Text1>{this.state.Services.price}  {t("serviceDetails.coin")} </Text1>
              </Col>
            </Row>
            <Row>

              <Col xs={12}>
                <Link to={{ pathname: "/service-application/" + this.state.Services.id }}>
                  <Button style={{ marginTop: "10px" }}>{t("card.makeApplication")} </Button>
                </Link>
              </Col>

            </Row>
          </Container>
        </div >
      )
    } else {
      services = (<LoadingSpinner />)
    }
    return (
      <div className="servicesDetails">

        <Helmet>
          <title>
            {`${this.state.Services.title} ${Meta.servicesDetails.title}`}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={Meta.servicesDetails.description} />
        </Helmet>
        {services}


      </div>
    )
  }
};
export default (withTranslation()(ServicesDetails));