import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import LatestApplications from '../../containers/statistics/latestApplications'
import UsersByZones from '../../containers/statistics/usersByZones'
import ApplicationsNumber from '../../containers/statistics/applicationsNumber'
import html2canvas from "html2canvas";
import pdfConverter from "jspdf"
import Button from "../../components/button/button"
import moment from "moment"



class Dashboard extends Component {

  div2PDF = e => {
    const button = e.target;
    button.style.display = "none";
    let input = window.document.getElementsByClassName("div2PDF")[0];

    html2canvas(input, { letterRendering: true }).then(canvas => {
      const img = canvas.toDataURL("image/png");

      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var pdf = new pdfConverter('p', 'mm');
      pdf.text("Arabic Text", 200, 20, "right");
      var position = 10; // give some top padding to first page

      pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;


      while (heightLeft >= 0) {
        position = heightLeft - imgHeight; // top padding for other pages
        pdf.addPage();
        pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`statistics ${moment().format('MMMM Do YYYY')}.pdf`);
      button.style.display = "block";
    });

  };
  render() {
    return (
      <div>
        <Container >
          <Row >
            <Col className="text-center" xs={12}>
              <h1>
                لوحة الادارة
              </h1>
            </Col>

            <Col xs={12} md={12}>
              <Button onClick={(e) => this.div2PDF(e)}>طباعة الاحصائيات العامة</Button>
              <Container className="statistics text-right div2PDF" >
                <Row><Col className="text-center"><h5>الاحصائيات العامة</h5></Col></Row>
               
                <Row>
                  <Col xs={12} md={6} style={{ marginTop: "20px" }}>
                    <UsersByZones />
                  </Col>
                  <Col xs={12} md={6} style={{ marginTop: "20px" }}>
                    <ApplicationsNumber />
                  </Col>
                </Row>
                <Row >
                  <Col xs={12} md={12} style={{ marginTop: "20px" }}>
                    <LatestApplications />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>

    )
  }
}

export default Dashboard;