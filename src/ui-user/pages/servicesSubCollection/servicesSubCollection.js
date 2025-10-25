import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/heading/heading';
import "../../../styles/_userStyling/pages/servicesSubCollection.scss"
import Card1 from '../../components/card/card1';
import { Col, Row } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import Meta from "../../../jsonFiles/meta/meta.json"
import { withTranslation } from 'react-i18next';



class ServicesSubCollection extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;



    axios.get(`${ApiURL.domain}${ApiURL.collections}${this.props.match.params.id}/`).then(
      response => {
        if (this.mounted) {
          this.setState({
            Collection: response.data,
            CollectionStatus: true
          })
        }
      });


  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    Collection: {},
    CollectionStatus: false
  }
  render() {
    let collection = null;
    const { t } = this.props;

    if (this.state.CollectionStatus) {
      collection = (
        <div  >
          <span>
            <Row  className={`div ${t("style.rtl")==="rtl" ?"rtl" :""} text-center`}>
              <Col xs={12}>
                <Heading type="h1" > {this.state.Collection.title}</Heading>
              </Col>
              <Col className="smallerCardsContainer">
                <Row>
                {this.state.Collection.paperTemplates.sort(function (a, b) {
                  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                  return 0;
                }).map((collectionItems, index) => {
                  return (
                    <Col xs={12} sm={6} md={4} key={index}>
                      <Card1
                        collectionName={this.state.Collection.title}
                        collectionId={collectionItems.category}
                        name={collectionItems.title}
                        imgURL={collectionItems.image}
                        id={collectionItems.id}
                        key={collectionItems.id} >
                      </Card1>
                    </Col>
                  )
                })}
                </Row>
              </Col>
            </Row>
          </span>
        </div>
      )
    } else {
      collection = (<LoadingSpinner />)
    }
    return (
      <div className="servicesSubCollection">

        <Helmet>
          <title>
            {`${this.state.Collection.title} ${Meta.servicesSubCollection.title}`}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={Meta.servicesSubCollection.description} />
        </Helmet>
        {collection}
      </div>
    )
  }
};
export default  withTranslation()(ServicesSubCollection);