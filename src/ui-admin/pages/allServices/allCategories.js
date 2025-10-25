import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import EditCategoryModal from '../../modals/editCategoryModal/editCategoryModal';
import AddCategoryModal from '../../modals/addCategoryModal/addCategoryModal';
import { connect } from 'react-redux'




class AllCategories extends Component {
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
    TextNumber: 0,
    FileNumber: 0,
    Collections: [],
    CollectionStatus: false,
    ShowConfirm: false
  }
  hundleOnClickDeleteSubmit = (id) => {
    let categoryId = id;

    const token = 'Bearer '.concat(this.props.loginProps.token);
    axios.delete(`${ApiURL.domain}${ApiURL.collections}${categoryId}/`, { headers: { Authorization: token } }).then(
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
        if (err.request) {
        }
        if (err.response) {
        }
      });
  }
  render() {
    let collections = null;

    if (this.state.CollectionStatus) {
      collections = (
        <Row style={{marginTop:"30px"}}>
          {this.state.Collections.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          }).map((collections, index) => {
            return (
                  <Col xs={12} md={8} style={{ margin: "auto"}} key={index}>
                    <Row>
                      <Col >
                        <div style={{ padding: "10px", marginTop: "10px" }}>
                          {collections.title}
                        </div>
                      </Col>
                      <Col >
                        <div style={this.state.ShowConfirm === true ? { display: "inline" } : { display: "none" }}
                          type="button"
                          onClick={() => { this.hundleOnClickDeleteSubmit(collections.id) }}> اضغط هنا لتأكيد الحذف</div>
                      </Col>
                      <Col >
                        <div style={{ padding: "10px", marginTop: "10px" }}>
                          <EditCategoryModal
                            collection={collections}
                            payload={collections.id}
                          ></EditCategoryModal>
                        </div>
                      </Col>

                    </Row>

                    <hr />
                  </Col>
             
            )
          })
          }
        </Row>
      )
    } else {
      collections = (<LoadingSpinner />)
    }
    return (
      <div className="AllCategories text-center">

        <AddCategoryModal />

        <div className="rtl" style={{ marginRight: "100px" }}
          type="button"
          onClick={() => { this.setState({ ShowConfirm: true }) }}
        >
          حذف قطاع خدمي
        </div>

        {collections}

      </div>
    )
  }
};
const mapStateToProps = state => {

  return {
    loginProps: state.auth
  }

}


export default connect(mapStateToProps)(AllCategories);