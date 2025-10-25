
import React, { Component } from 'react';
import Card from '../../components/card/card3';
import { Col, Row, Nav, Container, NavDropdown, Dropdown } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import axios from 'axios'
import { connect } from 'react-redux'
import Moment from 'moment'




class AllApplications extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;

        const token = 'Bearer '.concat(this.props.loginProps.token);
        axios.get(`${ApiURL.domain}${ApiURL.accountsEmployee}`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Employees: response.data,
                        EmployeesStatus: true
                    })
                }
            });

        axios.get(`${ApiURL.domain}${ApiURL.applications}`, { "headers": { Authorization: token } }).then(
            response => {

                if (this.mounted) {
                    this.setState({
                        Applications: response.data,
                        ApplicationsStatus: true,
                        ApplicationsInTheCollectionNumber:response.data.length

                    })
                }
            });

        axios.get(`${ApiURL.domain}${ApiURL.collections}`).then(
            response => {
                if (this.mounted) {
                    this.setState({
                        Collections: response.data,
                        CollectionsStatus: true,
                    })
                }
            })

    }
    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        Applications: [],
        ApplicationsStatus: false,
        Employees: [],
        EmployeesStatus: false,
        Collections: [],
        CollectionsStatus: false,
        CollectionId: null,
        CollectionName: "الكل",
        ApplicationsInTheCollectionNumber: 0,
        Status: 0,
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
            else if (this.state.OrderBy === "تاريخ الانشاء") { const sortedArray = applicationsArray.sort((a, b) => Moment(a.created_at) - Moment(b.created_at)); return sortedArray; }
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
            else if (this.state.OrderBy === "تاريخ الانشاء") { const sortedArray = applicationsArray.sort((a, b) => Moment(a.created_at) - Moment(b.created_at)).reverse(); return sortedArray; }
            else if (this.state.OrderBy === "حالة الطلب") { const sortedArray = applicationsArray.sort((a, b) => a.status - b.status).reverse(); return sortedArray; }
            else { return [] }
        }
        else { return [] }
    }
    render() {
        let application = null;
        let collectionsDropdown = null;

        if (this.state.ApplicationsStatus &&this.state.CollectionsStatus ) {
            application = this.state.Status === 0
                ? this.customSort(this.state.Applications).filter(this.state.CollectionName==="الكل" ?()=>{return true} :applications => applications.paperTemplateObject.category === this.state.CollectionId).map((application, index) => {
                    return (
                        <Col xs={12} sm={6} md={4} key={index}>
                            <Card
                                application={application}
                                employees={this.state.Employees}
                                collection={this.state.Collections.filter(collection => collection.id === application.paperTemplateObject.category)}
                                newStatus={0}
                            >
                            </Card>
                        </Col>
                    )
                })
                : this.customSort(this.state.Applications).filter(applications => applications.paperTemplateObject.category === this.state.CollectionId).filter(applications => applications.status === this.state.Status ).map((application, index) => {
                    return (
                        <Col xs={12} sm={6} md={4} key={index}>
                            <Card
                                application={application}
                                employees={this.state.Employees}
                                collection={this.state.Collections.filter(collection => collection.id === application.paperTemplateObject.category)}
                                newStatus={application.status}
                            >
                            </Card>
                        </Col>
                    )
                })
        } 
        else {
            application = (<LoadingSpinner />)
        }

        if (this.state.CollectionsStatus) {

            collectionsDropdown = this.state.Collections.map((collection, index) => {

                return (<React.Fragment key={index}>
                    <Dropdown.Item className="rtl text-center" onClick={() => {
                        this.setState({
                            CollectionId: collection.id,
                            CollectionName: collection.title,
                            ApplicationsInTheCollectionNumber: this.state.Applications.filter(applications => applications.paperTemplateObject.category === collection.id).length,
                        });
                        
                    }
                    } >
                        {` ${collection.title} `}
                        <br />
                        <span style={{ fontSize: "smaller", color: "#b3b0b0" }}>{` ${this.state.Applications.filter(applications => applications.paperTemplateObject.category === collection.id).length} طلب `}</span>

                    </Dropdown.Item>
                </React.Fragment>)
            });
        }
        else {
            collectionsDropdown = (<LoadingSpinner />)
        }
        return (
            <div className="allApplications ">
                <Nav>
                    
                    <NavDropdown title={`القطاع الخدمي: ${this.state.CollectionName} ( ${this.state.ApplicationsInTheCollectionNumber} طلب)`} id="nav-dropdown" className="">
                    <Dropdown.Item className="rtl text-center" onClick={() => {
                        this.setState({
                            CollectionId: null,
                            CollectionName: "الكل",
                            ApplicationsInTheCollectionNumber: this.state.Applications.length,
                        });
                    }} >
                        الكل
                        <br />
                        <span style={{ fontSize: "smaller", color: "#b3b0b0" }}>{` ${this.state.Applications.length} طلب `}</span>

                    </Dropdown.Item>
                        {collectionsDropdown}
                    </NavDropdown>
                </Nav>
                <br />
                <Nav fill variant="tabs" style={{ color: "#000" ,fontSize:"small"}} >
                    <Nav.Item>
                        <Nav.Link onClick={() => { this.setState({ Status: 0 }) }} className={`${this.state.Status === 0 ? "active" : ""}`} >كل الطلبات</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { this.setState({ Status: 1 }) }} className={`${this.state.Status === 1 ? "active" : ""}`}  > الطلبات المعلقة بانتظار الدفع </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { this.setState({ Status: 2 }) }} className={`${this.state.Status === 2 ? "active" : ""}`} > الطلبات المعلقة بانتظار استلام الموظف </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { this.setState({ Status: 3 }) }} className={`${this.state.Status === 3 ? "active" : ""}`} > الطلبات المعلقة بانتظار القبول </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { this.setState({ Status: 4 }) }} className={`${this.state.Status === 4 ? "active" : ""}`} > الطلبات المقبولة و قيد العمل </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { this.setState({ Status: 5 }) }} className={`${this.state.Status === 5 ? "active" : ""}`} > الطلبات المرفوضة </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { this.setState({ Status: 6 }) }} className={`${this.state.Status === 6 ? "active" : ""}`} >الطلبات المنتهية</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Container className="text-center">
                    <Row style={{ marginTop: "10px" }}>
                        <Nav variant="pills" >
                            <NavDropdown title={`ترتيب بحسب ${this.state.OrderBy}`} id="nav-dropdown">
                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderBy: "اسم الخدمة" }) }} >
                                    ترتيب بحسب اسم الخدمة
                                </Dropdown.Item>
                                <Dropdown.Item className="rtl" onClick={() => { this.setState({ OrderBy: "تاريخ الانشاء" }) }} >
                                    ترتيب بحسب تاريخ الانشاء
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
                    </Row>
                </Container>
                <div className="smallerCardsContainer" >
                    <Row className="div">
                        {application}
                    </Row>
                </div>
            </div>
        )
    }
};
const mapStateToProps = state => {

    return {
        loginProps: state.auth
    }

}


export default connect(mapStateToProps)(AllApplications);