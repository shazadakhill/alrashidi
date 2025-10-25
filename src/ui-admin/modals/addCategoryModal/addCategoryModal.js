
import React, { useState } from 'react';
import { Container, Col, Modal, Row } from 'react-bootstrap';
import AddCategoryModalForm from "../../../jsonFiles/staticForms/service/addCategoryForm.json"
import DynamicForm from '../../containers/dynamicForm/dynamicForm';


let formSchemaAddCategory = {}
for (var j = 0; j < AddCategoryModalForm.length; j++) { formSchemaAddCategory[AddCategoryModalForm[j].titleEn] = AddCategoryModalForm[j]; }



function AddCategoryModal(props) {

    const [showAddCategory, setShowAddCategory] = useState(false);
    const handleClose = () => {
        setShowAddCategory(false)
    };
    const handleShowAddCategory = () => {
        setShowAddCategory(true)
    };

    


    return (
        <Container className={`AddCategoryModal text-center rtl`}>


            <Row>
                <Col >
                    <br />
                    <span type="button" style={{ textDecoration: "underline" }} onClick={handleShowAddCategory}>
                       انشاء قطاع خدمي جديد
                    </span >
                </Col>
            </Row>




            <Modal
                show={showAddCategory}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
                size="lg"
                className={`rtl`}
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                    انشاء قطاع خدمي جديد
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div id="div1" style={{ height: "75vh", position: "relative" }}>
                        <div id="div2" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div id="div3" style={{ height: "100%", fontSize: "smaller" }}>
                                <span id="signupForm">
                                    <DynamicForm
                                        formSchema={formSchemaAddCategory}
                                        submitFunction={`onSubmit_AddCategory`}
                                        buttonName="انشاء"
                                        parentId={""}
                                        multilangual={true}
                                    ></DynamicForm>
                                </span>
                            </div></div></div>
                </Modal.Body>
            </Modal>
        </Container >
    );
}

export default AddCategoryModal;