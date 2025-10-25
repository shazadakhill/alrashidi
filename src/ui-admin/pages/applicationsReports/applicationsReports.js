import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import { connect } from 'react-redux'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { Col, Row, Container } from 'react-bootstrap';
import moment from "moment"
import PaperInfoModal from "../../modals/paperInfoModal/paperInfoModal"
import html2canvas from "html2canvas";
import pdfConverter from "jspdf"
import Button from "../../components/button/button"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class ApplicationsReport extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;
        const token = 'Bearer '.concat(this.props.loginProps.token);

        axios.get(`${ApiURL.domain}${ApiURL.reportsApplications}?page=1`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Count: response.data.count,
                        Next: response.data.next,
                        Previous: response.data.previous,
                        Applications: response.data.results,
                        ApplicationsStatus: true
                    })
                }

            });

        axios.get(`${ApiURL.domain}${ApiURL.accountsEmployee}`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Employees: response.data,
                    })
                }
            });

    }


    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        Count: 0,
        Next: "",
        Previous: "",
        Applications: [],
        ApplicationsStatus: true,
        Employees: [],
        PageNumber: 1
    }

    rightClickHundler = () => {
        const token = 'Bearer '.concat(this.props.loginProps.token);

        axios.get(`${this.state.Next}`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Count: response.data.count,
                        Next: response.data.next,
                        Previous: response.data.previous,
                        Applications: response.data.results,
                        ApplicationsStatus: true,
                        PageNumber: this.state.PageNumber + 1
                    })
                }

            });
    }
    leftClickHundler = () => {
        const token = 'Bearer '.concat(this.props.loginProps.token);
        if (this.state.Previous.endsWith("/events/")) {

        }
        axios.get(`${this.state.Previous}${this.state.Previous.endsWith("/events/") ? "?page=1" : ""}`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Count: response.data.count,
                        Next: response.data.next,
                        Previous: response.data.previous,
                        Applications: response.data.results,
                        ApplicationsStatus: true,
                        PageNumber: this.state.PageNumber - 1

                    })
                }

            });

    }
    div2PDF = e => {

        var elements = document.getElementsByClassName('forScale');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (window.innerWidth <= 576) {
                element.style.transform = "scale(0.8)";
                element.style.transformOrigin = "top center";
                element.style.fontSize = "smaller";
            }
            else { }
        }

        const button = e.target;
        button.style.display = "none";
        let input = window.document.getElementsByClassName("div2PDF")[0];

        html2canvas(input, { letterRendering: true }).then(canvas => {
            const img = canvas.toDataURL("image/png");

            var imgWidth = 210;
            var pageHeight = 297;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var pdf = new pdfConverter('p', 'mm', [297, 210]);
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

            pdf.save(`applications report page${this.state.PageNumber} ${moment().format('MMMM Do YYYY')}.pdf`);
            button.style.display = "block";

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.style.transform = "scale(0.9)";
                element.style.transformOrigin = "top center";
            }

        });

    };
    render() {

        let detailedApplications = null;
        if (this.state.ApplicationsStatus) {
            if (this.state.Applications) {
                detailedApplications = this.state.Applications.map((application, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{application.id}</th>
                            <td>
                                {/* حالة الحدث */}
                                {application.status === 1
                                    ? "تم انشاء طلب "
                                    : application.status === 2
                                        ? "تم دفع طلب "
                                        : application.status === 3
                                            ? "تم اسناد طلب "
                                            : application.status === 4
                                                ? "تم قبول طلب "
                                                : application.status === 5
                                                    ? "تم رفض طلب "
                                                    : application.status === 6
                                                        ? "تم الانتهاء من طلب " : null
                                }

                            </td>
                            <td> ({application.paper.paperTemplateObject.title})
                                ({application.paper.userObject.fullName})
                            </td>
                            <td>من قبل 
                                {this.state.Employees.filter(employee => employee.id === application.paper.employee).map((employee, ind) => {
                                    return (<React.Fragment key={ind}>{employee.fullName !== null ?` ${employee.fullName}`  : "لايوجد بعد"}</React.Fragment>)
                                })}
                            </td>
                            <td> في:
                                {moment(application.happened_at).format('MMM Do YY, h:mm a')}
                            </td>

                            <td>
                                {/* حالة الطلب الحالية */}
                                {application.paper.status === 1
                                    ? " بانتظار الدفع"
                                    : application.paper.status === 2
                                        ? " بانتظار استلام الموظف"
                                        : application.paper.status === 3
                                            ? "بانتظار القبول"
                                            : application.paper.status === 4
                                                ? "قيد العمل"
                                                : application.paper.status === 5
                                                    ? "مرفوض"
                                                    : application.paper.status === 6
                                                        ? "منته" : null
                                }
                            </td>
                            <td className="rtl text-right">
                                <PaperInfoModal
                                    application={application.paper}
                                    employees={this.state.Employees}

                                ></PaperInfoModal>
                            </td>
                        </tr>
                    )
                })
            } else { }
        }
        else {
            detailedApplications = (<LoadingSpinner />)
        }


        return (<>
            <Row className="text-center">
                <Col xs={6} sm={4} md={3} lg={2} style={{ padding: "0px" }}>
                    <Button onClick={(e) => this.div2PDF(e)} style={window.innerWidth <= 576 ? { display: "none" } : { display: "inline" }}>طباعة pdf  </Button>

                </Col>
                <Col xs={6} sm={4} md={3} lg={2} style={{ padding: "0px" }}>
                    <ReactHTMLTableToExcel
                        id="table-xls-button"
                        className="download-table-xls-button"
                        table="reportTableApplications"
                        filename={`applications report page${this.state.PageNumber} ${moment().format('MMMM Do YYYY')}`}
                        sheet={`applications report page${this.state.PageNumber} ${moment().format('MMMM Do YYYY')}`}
                        buttonText="طباعة XLS" />
                </Col>
            </Row>
            <Container className="div2PDF" style={{ padding: "0px" }} >
                <Row>
                    <Col xs={12} md={12} className=" text-center"  >
                        <h5 className="forScale"  >تقارير الطلبات صفحة {this.state.PageNumber}</h5>
                    </Col>
                </Row>
                <Row className="rtl  " style={{ marginTop: "10px", padding: "0px " }}>
                    <Col xs={12} md={12} className="forScale " style={{ fontSize: "smaller", transform: "scale(0.9)", transformOrigin: "top center", display: "flex", justifyContent: "center" }} >

                        <table className="table table-striped rtl  table-responsive-md" id="reportTableApplications">
                            <thead>
                                <tr>
                                    <th scope="col">.</th>
                                    <th scope="col"> الحدث</th>
                                    <th scope="col">(اسم الخدمة)(اسم مقدم الطلب)</th>
                                    <th scope="col">الموظف </th>
                                    <th scope="col">تاريخ الحدث </th>
                                    <th scope="col">الحالة الحالية</th>
                                    <th scope="col" className="text-center">...</th>

                                </tr>
                            </thead>
                            <tbody>
                                {detailedApplications}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col><span onClick={this.rightClickHundler} style={!this.state.Next ? { display: "none" } : { display: "inline" }} type="button"> <AiOutlineArrowRight /></span></Col>
                    <Col style={!this.state.Next && !this.state.Previous ? { display: "none" } : { display: "inline" }}>{this.state.Count}</Col>
                    <Col><span onClick={this.leftClickHundler} style={!this.state.Previous ? { display: "none" } : { display: "inline" }} type="button"> <AiOutlineArrowLeft /></span></Col>
                </Row>
            </Container>
        </>
        )
    }
};
const mapStateToProps = state => {
    return {
        loginProps: state.auth
    }
}


export default connect(mapStateToProps)(ApplicationsReport);