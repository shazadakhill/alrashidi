import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/heading/heading';
import "../../../styles/_userStyling/pages/servicesCollections.scss"
import Card1 from '../../components/card/card1';
import { Col, Row } from 'react-bootstrap';
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import Meta from "../../../jsonFiles/meta/meta.json"
import { withTranslation } from 'react-i18next';






class ServicesCollections extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;

    axios.get(`${ApiURL.domain}${ApiURL.collections}`).then(
      response => {
        if (this.mounted) {
          this.setState({
            Collections: response.data,
            CollectionStatus: true
          })
        }
      });


  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    Collections: [],
    CollectionStatus: false
  }
  render() {
    let collections = null;
    const { t } = this.props;

    if (this.state.CollectionStatus) {
      collections = (
        <div className="smallerCardsContainer">
          {this.state.Collections.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          }).map((collections, index) => {
            return (
              <span key={index}>
                {collections.paperTemplates.length === 0
                  ? null
                  : <Row className={`div ${t("style.rtl") === "rtl" ? "rtl" : ""} text-center`} >
                    <Col xs={12} >
                      <Heading type="h1" > {collections.title}</Heading>
                    </Col>
                    {
                      collections.paperTemplates.sort(function (a, b) {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                        return 0;
                      }).map((collectionsItems, index) => {
                        return (
                          <Col xs={12} sm={6} md={4} key={index} >
                            <Card1
                              collectionName={collections.title}
                              collectionId={collectionsItems.category}
                              name={collectionsItems.title}
                              imgURL={collectionsItems.image}
                              id={collectionsItems.id}
                              key={collectionsItems.id} >
                            </Card1>
                          </Col>
                        )
                      })

                    }
                  </Row>}
              </span>
            )
          })
          }
        </div>
      )
    } else {
      collections = (<LoadingSpinner />)
    }
    return (
      <div className="servicesCollections">

        <Helmet>
          <title>
            {Meta.servicesCollections.title}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={Meta.servicesCollections.description} />
        </Helmet>
        {collections}


      </div>
    )
  }
};
export default withTranslation()(ServicesCollections);