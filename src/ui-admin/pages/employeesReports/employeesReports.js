import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import { connect } from 'react-redux'

import PaperInfoModal from "../../modals/paperInfoModal/paperInfoModal"
import { Col, Row, Dropdown, Container, NavDropdown, Nav } from 'react-bootstrap';

import html2canvas from "html2canvas";
import pdfConverter from "jspdf"
import Button from "../../components/button/button"
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class EmployeesReport extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;
        const token = 'Bearer '.concat(this.props.loginProps.token);
        axios.get(`${ApiURL.domain}${ApiURL.reportsEmployees}`, {
            'Content-Type': 'application/json',
            "headers": { Authorization: token }
        }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Employees: response.data,
                        EmployeesStatus: true
                    })
                }
            })
    }


    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        Employees: [],
        EmployeeId: 0,
        EmployeeNumber: "",
        EmployeeName: "اختر الموظف",
        EmployeeApplicationsNumber: "",
        EmployeesStatus: false,

        OrderBy: "تاريخ الانشاء",
        OrderType: "تصاعدي"
    }
    customSort = (applicationsArray) => {
        if (this.state.OrderType === "تصاعدي") {

            if (this.state.OrderBy === "اسم الخدمة") {
                const sortedArray = applicationsArray.sort(function (a, b) {
                    if (a.paperTemplateObject.title.toLowerCase() < b.paperTemplateObject.title.toLowerCase()) return -1;
                    if (a.paperTemplateObject.title.toLowerCase() > b.paperTemplateObject.title.toLowerCase()) return 1;
                    return 0;
                });
                return sortedArray
            }
            else if (this.state.OrderBy === "تاريخ الانشاء") { const sortedArray = applicationsArray.sort((a, b) => moment(a.created_at) - moment(b.created_at)); return sortedArray; }
            else if (this.state.OrderBy === "تاريخ التعيين") { const sortedArray = applicationsArray.sort((a, b) => moment(a.assigned_at) - moment(b.assigned_at)); return sortedArray; }
            else if (this.state.OrderBy === "حالة الطلب") { const sortedArray = applicationsArray.sort((a, b) => a.status - b.status); return sortedArray; }
            else { return [] }

        }
        else if (this.state.OrderType === "تنازلي") {
            if (this.state.OrderBy === "اسم الخدمة") {
                const sortedArray = applicationsArray.sort(function (a, b) {
                    if (a.paperTemplateObject.title.toLowerCase() < b.paperTemplateObject.title.toLowerCase()) return -1;
                    if (a.paperTemplateObject.title.toLowerCase() > b.paperTemplateObject.title.toLowerCase()) return 1;
                    return 0;
                }).reverse();
                return sortedArray
            }
            else if (this.state.OrderBy === "تاريخ الانشاء") { const sortedArray = applicationsArray.sort((a, b) => moment(a.created_at) - moment(b.created_at)).reverse(); return sortedArray; }
            else if (this.state.OrderBy === "تاريخ التعيين") { const sortedArray = applicationsArray.sort((a, b) => moment(a.assigned_at) - moment(b.assigned_at)).reverse(); return sortedArray; }
            else if (this.state.OrderBy === "حالة الطلب") { const sortedArray = applicationsArray.sort((a, b) => a.status - b.status).reverse(); return sortedArray; }
            else { return [] }
        }
        else { return [] }
    }

    div2PDF = e => {

        var elements = document.getElementsByClassName('forScale');
        var elements2 = document.getElementsByClassName('forScale2');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (window.innerWidth <= 500) {
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

            pdf.save(`employee report ${this.state.EmployeeName !== "اختر الموظف" ? this.state.EmployeeName : ""} ${moment().format('MMMM Do YYYY')}.pdf`);
            button.style.display = "block";

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.style.transform = "scale(1)";
                element.style.zIndex = "100";
            }

            for (var u = 0; u < elements2.length; u++) {
                var element2 = elements2[u];
                element2.style.transform = "scale(0.9)";
                element2.style.transformOrigin = "top center";
                element.style.zIndex = "10";

            }
        });

    };
    render() {

        let detailedEmployees = null;
        let employeesNames = null;

        detailedEmployees = this.state.Employees.filter(employee => employee.id === this.state.EmployeeId).map((employee, index) => {
            return (
                <React.Fragment key={index}>
                    {employee.employee_papers.length > 0
                        ? this.customSort(employee.employee_papers).map((application, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{application.id}</th>
                                    <td>
                                        ({application.paperTemplateObject.title})
                                        ({application.userObject.fullName})
                                    </td>
                                    <td>{moment(application.created_at).format('MMM Do YY, h:mm a')}</td>
                                    <td> {moment(application.assigned_at).format('MMM Do YY, h:mm a')}</td>
                                    <td>
                                        {application.accepted_at !== " " && application.accepted_at !== "" && application.accepted_at !== null
                                            ? moment(application.accepted_at).format('MMM Do YY, h:mm a')
                                            : "/"}
                                    </td>
                                    <td>
                                        {application.done_at !== " " && application.done_at !== "" && application.done_at !== null
                                            ? moment(application.done_at).format('MMM Do YY, h:mm a')
                                            : "/"}
                                    </td>
                                    <td>
                                        {application.status === 1
                                            ? " بانتظار الدفع" : application.status === 2
                                                ? " بانتظار استلام الموظف" : application.status === 3
                                                    ? "بانتظار القبول" : application.status === 4
                                                        ? "قيد العمل" : application.status === 5
                                                            ? "مرفوض" : application.status === 6
                                                                ? "منته" : null}
                                    </td>
                                    <td> <PaperInfoModal
                                        application={application}
                                        employees={this.state.Employees}

                                    ></PaperInfoModal></td>

                                </tr>
                            )

                        }) :
                        <tr>
                            <th colSpan="8" style={{ color: "red" }}> لايوجد طلبات لدى الموظف {employee.fullName}</th>
                        </tr>
                    }
                </React.Fragment>
            )
        })



        if (this.state.EmployeesStatus) {

            employeesNames = this.state.Employees.map((employee, index) => {

                return (<React.Fragment key={index}>
                    <Dropdown.Item className="rtl" onClick={() => {
                        this.setState({
                            EmployeeId: employee.id,
                            EmployeeName: employee.fullName,
                            EmployeeNumber: employee.phone,
                            EmployeeApplicationsNumber: employee.employee_papers.length,
                        });
                    }} >
                        {` ${employee.fullName} `}
                        <br />
                        <span style={{ fontSize: "smaller", color: "#b3b0b0" }}>{` ${employee.employee_papers.length} طلب `}</span>

                    </Dropdown.Item>
                </React.Fragment>)
            });
        }
        else {
            employeesNames = (<LoadingSpinner />)
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
                        table="reportTableEmployee"
                        filename={`employee report ${this.state.EmployeeName !== "اختر الموظف" ? this.state.EmployeeName : ""} ${moment().format('MMMM Do YYYY')}`}
                        sheet={`employee report ${this.state.EmployeeName !== "اختر الموظف" ? this.state.EmployeeName : ""} ${moment().format('MMMM Do YYYY')}`}
                        buttonText="طباعة XLS" />
                </Col>
            </Row>
            <Container className="div2PDF" style={{ padding: "0px" }} >
                <Row>
                    <Col xs={12} md={12} className=" text-center"  >
                        <h5 className="forScale"  >تقارير الموظفين</h5>
                    </Col>
                    <Col xs={12} md={12} className="forScale rtl"  >
                        <Nav variant="pills" >


                            <NavDropdown title={this.state.EmployeeName} id="nav-dropdown">
                                {employeesNames}
                            </NavDropdown>

                            <NavDropdown title={`ترتيب بحسب ${this.state.OrderBy}`} id="nav-dropdown">
                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderBy: "اسم الخدمة" }) }} >
                                    ترتيب بحسب اسم الخدمة
                                </Dropdown.Item>
                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderBy: "تاريخ الانشاء" }) }} >
                                    ترتيب بحسب تاريخ الانشاء
                                </Dropdown.Item>
                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderBy: "تاريخ التعيين" }) }} >
                                    ترتيب بحسب تاريخ التعيين
                                </Dropdown.Item>

                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderBy: "حالة الطلب" }) }} >
                                    ترتيب بحسب حالة الطلب
                                </Dropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={`ترتيب ${this.state.OrderType}`} id="nav-dropdown">
                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderType: "تصاعدي" }) }} >
                                    ترتيب تصاعدي
                                </Dropdown.Item>
                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderType: "تنازلي" }) }} >
                                    ترتيب تنازلي
                                </Dropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <Nav style={{ marginTop: "20px" }}>
                            <Nav.Item style={{ direction: "ltr" }}>
                                {this.state.EmployeeNumber !== "" ? " / " : ""}
                                {this.state.EmployeeNumber}
                            </Nav.Item>
                            <Nav.Item>
                                {this.state.EmployeeApplicationsNumber !== "" ? "عدد الطلبات " : ""}
                                {this.state.EmployeeApplicationsNumber}
                                {this.state.EmployeeApplicationsNumber !== "" ? " / " : ""}
                            </Nav.Item>
                        </Nav>
                    </Col>

                </Row>
                <Row className="rtl  " style={{ marginTop: "10px", padding: "0px " }}>
                    <Col xs={12} md={12} className="forScale forScale2" style={{ fontSize: "smaller", transform: "scale(0.9)", transformOrigin: "top center", display: "flex", justifyContent: "center" }}  >

                        <table className="table table-striped rtl  table-responsive-md" id="reportTableEmployee" >
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">(اسم الخدمة)(اسم مقدم الطلب)</th>
                                    <th scope="col">تاريخ الانشاء </th>
                                    <th scope="col">تاريخ التعيين</th>
                                    <th scope="col">تاريخ القبول</th>
                                    <th scope="col">تاريخ الانتهاء</th>
                                    <th scope="col">حالة الطلب</th>
                                    <th scope="col" className="text-center">...</th>
                                </tr>

                            </thead>
                            <tbody>
                                {detailedEmployees}
                            </tbody>

                        </table>


                    </Col>

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


export default connect(mapStateToProps)(EmployeesReport);