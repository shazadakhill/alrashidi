import React, { Component } from 'react';
import { connect } from 'react-redux'
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from 'axios'
import EditSignUpEmployeeForm from "../../../jsonFiles/staticForms/accounts/editSignup_Employee.json"
import DynamicForm from '../../containers/dynamicForm/dynamicForm';
import { Col, Container, Row, Modal } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai'

class EditEmployeeAccountModal extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        this.mounted = true;

        const token = 'Bearer '.concat(this.props.loginProps.token);
        axios.get(`${ApiURL.domain}${ApiURL.accountsEmployee}${this.props.payload}/`, { "headers": { Authorization: token } }).then(
            response => {
                if (this.mounted) {
                    let user=response.data;
                    delete user["phone"]
                    this.setState({
                        User: user,
                    })
                    if (response.data.zone !== null) {
                        axios.get(`${ApiURL.domain}${ApiURL.zone}${response.data.zone}/`).then(
                            response => {
                                this.setState({
                                    zone: response.data.name,
                                })
                                axios.get(`${ApiURL.domain}${ApiURL.governorate}${response.data.governorate}/`).then(
                                    response => {
                                        if (this.mounted) {
                                            this.setState({
                                                governorate: response.data.name,
                                                UserStatus: true
                                            })
                                        }
                                    }
                                )
                            }
                        );
                    }
                }
            })
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    state = {
        User: {},
        UserStatus: false,
        zone: 0,
        governorate: 0,
        showEditSignup: false
    }

    handleClose = () => {
        this.setState({
            showEditSignup: false
        })
    };
    handleShowEditSignup = e => {
        e.preventDefault()
        this.setState({
            showEditSignup: true
        })
    };


    render() {


        let formSchemaEditSignupEmployee = {}
        for (var y = 0; y < EditSignUpEmployeeForm.length; y++) { formSchemaEditSignupEmployee[EditSignUpEmployeeForm[y].titleEn] = EditSignUpEmployeeForm[y]; }

        let governorates = [];

        axios.get(`${ApiURL.domain}${ApiURL.governorate}`).then(
            response => {
                formSchemaEditSignupEmployee["zone"].options = []

                governorates = response.data
                governorates.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                }).map((governorate, index) => {
                    return (<React.Fragment key={index}>
                        {governorate.zones.sort(function (a, b) {
                            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                            return 0;
                        }).map((zone, indexx) => {
                            return (<React.Fragment key={indexx}>

                                {formSchemaEditSignupEmployee["zone"].options.push(
                                    {
                                        "label": `${governorate.name} _ ${zone.name}`,
                                        "value": zone.id
                                    }
                                )}
                            </React.Fragment>)
                        })}
                    </React.Fragment>)
                })
            }
        )




        return (
            <Container className={`EditEmployeeAccountModal text-center rtl`}>


                <Row>
                    <Col >
                        <br />
                        <span type="button" onClick={this.handleShowEditSignup}>
                            <AiOutlineEdit /> تعديل الموظف
                        </span >
                    </Col>
                </Row>




                <Modal
                    show={this.state.showEditSignup}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    animation={false}
                    size="lg"
                    className={`rtl`}
                >
                    <Modal.Header closeButton >
                        <Modal.Title>
                            <AiOutlineEdit /> تعديل الموظف
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div id="div1" style={{ height: "75vh", position: "relative" }}>
                            <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                                <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>
                                    <DynamicForm
                                        formSchema={formSchemaEditSignupEmployee}
                                        formData={this.state.User}
                                        submitFunction={`onSubmit_edit_employee`}
                                        buttonName=" تعديل الموظف "
                                        parentId={""}
                                        payload={this.props.payload}
                                    ></DynamicForm>

                                </div></div></div>
                    </Modal.Body>
                </Modal>
            </Container >
        )
    }

};
const mapStateToProps = state => {

    return {
        loginProps: state.auth
    }

}


export default connect(mapStateToProps)(EditEmployeeAccountModal);