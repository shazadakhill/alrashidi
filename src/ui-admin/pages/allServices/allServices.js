import React, { Component } from 'react';
import Card from '../../components/card/card4';
import { Col, Row, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'





class AllServices extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;


    axios.get(`${ApiURL.domain}${ApiURL.collections}`).then(
      response => {
        if (this.mounted) {
          this.setState({
            Collections: response.data,
            CollectionStatus: true,
          })
        }
      });

    axios.get(`${ApiURL.domain}${ApiURL.services}`).then(
      response => {
        if (this.mounted) {
          this.setState({
            Services: response.data,
            ServicesStatus: true,
            ServicesInTheCollectionNumber: response.data.length

          })
        }
      });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    Services: [],
    ServicesStatus: false,
    Collections: [],
    CollectionStatus: false,
    CollectionId: null,
    CollectionName: "الكل",
    ServicesInTheCollectionNumber: 0,
    ShowConfirm: false

  }
  hundleOnClickDeleteSubmit = (id) => {

    const token = 'Bearer '.concat(this.props.loginProps.token);
    axios.delete(`${ApiURL.domain}${ApiURL.services}${id}/`, { headers: { Authorization: token } }).then(
      response => {
        alert("done")
        this.setState({
          CollectionStatus: false
        })
        axios.get(`${ApiURL.domain}${ApiURL.collections}`).then(
          response => {
            if (this.mounted) {
              this.setState({
                Collections: response.data,
                CollectionStatus: true
              })
            }
          });
      }).catch(err => {
        if (err.request) { }
        if (err.response) { }
      });
  }
  render() {
    let collections = null;
    let collectionsDropdown = null;

    if (this.state.CollectionStatus && this.state.ServicesStatus) {

      collectionsDropdown = this.state.Collections.map((collection, index) => {
        return (<React.Fragment key={index}>

          <Dropdown.Item className="rtl text-center" onClick={() => {
            this.setState({
              CollectionId: collection.id,
              CollectionName: collection.title,
              ServicesInTheCollectionNumber: collection.paperTemplates.length,
            });
          }
          } >
            {` ${collection.title} `}
            <br />
            <span style={{ fontSize: "smaller", color: "#b3b0b0" }}>{` ${collection.paperTemplates.length} خدمة `}</span>

          </Dropdown.Item>
        </React.Fragment>)
      });
      collections = (
        <>
          {this.state.Collections.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          }).filter(this.state.CollectionName==="الكل" ?()=>{return true} :collection => collection.id === this.state.CollectionId).map((collection, index) => {
            return (
              <React.Fragment key={index}>
                {collection.paperTemplates.sort(function (a, b) {
                  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                  return 0;
                }).map((service, index) => {
                  return (
                    <Col xs={12} sm={6} md={4} key={index}>
                      <Card
                        collectionName={collection.title}
                        collectionId={service.category}
                        name={service.title}
                        imgURL={service.image}
                        id={service.id}
                        key={service.id} >
                      </Card>
                      <div style={this.state.ShowConfirm === true ? { display: "inline" } : { display: "none" }}
                        type="button"
                        onClick={() => { this.hundleOnClickDeleteSubmit(service.id) }}> اضغط هنا لتأكيد الحذف</div>
                    </Col>
                  )
                })}
              </React.Fragment>
            )
          })
          }
        </>
      )
    } else {
      collections = (<LoadingSpinner />)
    }
    return (
      <div className="AllServices text-center">
        <br />
        <Nav>
          <NavDropdown title={`القطاع الخدمي: ${this.state.CollectionName} ( ${this.state.ServicesInTheCollectionNumber} خدمة)`} id="nav-dropdown" className="">
            <Dropdown.Item className="rtl text-center" onClick={() => {
              this.setState({
                CollectionId: null,
                CollectionName: "الكل",
                ServicesInTheCollectionNumber: this.state.Services.length,
              });
            }} >
              الكل
              <br />
              <span style={{ fontSize: "smaller", color: "#b3b0b0" }}>{` ${this.state.Services.length} خدمة `}</span>

            </Dropdown.Item>
            {collectionsDropdown}
          </NavDropdown>
        </Nav>
        <br />
        <span type="button"><Link style={{ color: "#212529", textDecoration: "underline" }} to="/admin/services/add-service">اضافة خدمة</Link></span>
        <div className="rtl" style={{ marginRight: "100px" }}
          type="button"
          onClick={() => { this.setState({ ShowConfirm: true }) }}
        >
          حذف خدمة
        </div>
        <Row className="smallerCardsContainer">   {collections}</Row>
      </div>
    )
  }
};
const mapStateToProps = state => {

  return {
    loginProps: state.auth
  }

}
export default connect(mapStateToProps)(AllServices);