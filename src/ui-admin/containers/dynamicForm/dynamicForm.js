
import React, { useState, useEffect } from 'react';
import { Form, TextField, TextAreaField, SubmitButton, FileField, SelectField, DateField, NumberField, RichEditorField } from '../../../hooks/FormElements';
import * as Yup from 'yup';
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import * as actions from '../../../reduxFolder/action/auth'
import { connect } from 'react-redux'
import { RiAddCircleLine } from "react-icons/ri"
import { TiDeleteOutline } from "react-icons/ti"
import ServiceDefaultimage from '../../../assets/ServiceDefaultmage.json'

const DynamicForm = (props) => {
  const SubmitName = props.submitFunction;
  const multilangual = props.multilangual;
  const payload = props.payload;
  const formSchema = props.formSchema;
  const handle_reset_img_value = props.handle_reset_img_value
  const { t } = useTranslation();


  const [formData, setFormData] = useState(formSchema);
  const [validationSchema, setValidationSchema] = useState({
    ...formData
  });

  useEffect(() => {
    const initForm = (formSchema) => {
      let _formData = props.formData ? props.formData : {};
      let _validationSchema = {};

      for (var key of Object.keys(formSchema)) {
        _formData[key] = props.formData
          ? props.formData[key]
            ? props.formData[key]
            : ""
          : "";


        if (key === "fieldTemplates") {
          for (let index = 0; index < formSchema[key].length; index++) {
            const element = formSchema[key][index];
            for (var key2 of Object.keys(element)) {

              if (formSchema[key][index][key2].inputType === "email") {
                _validationSchema[`${key2}${index}`] = Yup.string().email(`${t("form.emailError")}`);
              }
              else if (formSchema[key][index][key2].inputType === "select") {
                _validationSchema[`${key2}${index}`] = Yup.string();
              }
              else if (formSchema[key][index][key2].inputType === "richText") {
                _validationSchema[`${key2}${index}`] = Yup.string();
              }
              else if (formSchema[key][index][key2].inputType === "file") {
                _validationSchema[`${key2}${index}`] = Yup.mixed()
              }
              else {
                // const phoneRegex = RegExp(/^[\w.@+-]+$/)
                // .matches(phoneRegex, "Invalid phone.")
                if (formSchema[key][index][key2].type === 1) { _validationSchema[`${key2}${index}`] = Yup.string().max(255, `${t("form.maxCharactersError")} 255`) }
                else if (formSchema[key][index][key2].type === 2) { _validationSchema[`${key2}${index}`] = Yup.string() }
                else if (formSchema[key][index][key2].type === 3) { _validationSchema[`${key2}${index}`] = Yup.number().typeError(`${t("form.numberError")}`) }
                else if (formSchema[key][index][key2].type === 4) { _validationSchema[`${key2}${index}`] = Yup.date() }
                else { _validationSchema[`${key2}${index}`] = Yup.string() }

                if (formSchema[key][index][key2].maxLength) {
                  _validationSchema[key][index][key2] = Yup.string().max(formSchema[key][index][key2].maxLength, `${t("form.maxCharactersError")} ${formSchema[key][index][key2].maxLength}`)
                }
                if (formSchema[key][index][key2].minLength) {
                  _validationSchema[key][index][key2] = Yup.string().max(formSchema[key][index][key2].minLength, `${t("form.minCharactersError")} ${formSchema[key][index][key2].minLength}`)
                }
              }

              if (formSchema[key][index][key2].required) {
                _validationSchema[`${key2}${index}`] = _validationSchema[`${key2}${index}`].required(`${t("form.emptyError")}`);
              }
              // end
            }
          }
        } else if (key === "fileFieldTemplates") {
          for (let index = 0; index < formSchema[key].length; index++) {
            const element = formSchema[key][index];
            for (var key3 of Object.keys(element)) {


              if (formSchema[key][index][key3].inputType === "email") {
                _validationSchema[`${key3}${index}`] = Yup.string().email(`${t("form.emailError")}`);
              }
              else if (formSchema[key][index][key3].inputType === "select") {
                _validationSchema[`${key3}${index}`] = Yup.string();
              }
              else if (formSchema[key][index][key3].inputType === "richText") {
                _validationSchema[`${key3}${index}`] = Yup.string();
              }
              else if (formSchema[key][index][key3].inputType === "file") {
                _validationSchema[`${key3}${index}`] = Yup.mixed()
              }
              else {
                // const phoneRegex = RegExp(/^[\w.@+-]+$/)
                // .matches(phoneRegex, "Invalid phone.")
                if (formSchema[key][index][key3].type === 1) { _validationSchema[`${key3}${index}`] = Yup.string().max(255, `${t("form.maxCharactersError")} 255`) }
                else if (formSchema[key][index][key3].type === 2) { _validationSchema[`${key3}${index}`] = Yup.string() }
                else if (formSchema[key][index][key3].type === 3) { _validationSchema[`${key3}${index}`] = Yup.number().typeError(`${t("form.numberError")}`) }
                else if (formSchema[key][index][key3].type === 4) { _validationSchema[`${key3}${index}`] = Yup.date() }
                else { _validationSchema[`${key3}${index}`] = Yup.string() }

                if (formSchema[key][index][key3].maxLength) {
                  _validationSchema[key][index][key3] = Yup.string().max(formSchema[key][index][key3].maxLength, `${t("form.maxCharactersError")} ${formSchema[key][index][key3].maxLength}`)
                }
                if (formSchema[key][index][key3].minLength) {
                  _validationSchema[key][index][key3] = Yup.string().max(formSchema[key][index][key3].minLength, `${t("form.minCharactersError")} ${formSchema[key][index][key3].minLength}`)
                }
              }
              if (formSchema[key][index][key3].required) {
                _validationSchema[`${key3}${index}`] = _validationSchema[`${key3}${index}`].required(`${t("form.emptyError")}`);
              }
              // end
            }
          }
        } else {

          if (formSchema[key].inputType === "email") {
            _validationSchema[key] = Yup.string().email(`${t("form.emailError")}`);
          }
          else if (formSchema[key].inputType === "select") {
            _validationSchema[key] = Yup.string();
          }
          else if (formSchema[key].inputType === "richText") {
            _validationSchema[key] = Yup.string();
          }
          else if (formSchema[key].inputType === "file") {
            _validationSchema[key] = Yup.mixed()
          }
          else {
            // const phoneRegex = RegExp(/^[\w.@+-]+$/)
            // .matches(phoneRegex, "Invalid phone.")
            if (formSchema[key].type === 1) { _validationSchema[key] = Yup.string().max(255, `${t("form.maxCharactersError")} 255`) }
            else if (formSchema[key].type === 2) { _validationSchema[key] = Yup.string() }
            else if (formSchema[key].type === 3) { _validationSchema[key] = Yup.number().typeError(`${t("form.numberError")}`) }
            else if (formSchema[key].type === 4) { _validationSchema[key] = Yup.date() }
            else { _validationSchema[key] = Yup.string() }

            if (formSchema[key].maxLength) {
              _validationSchema[key] = Yup.string().max(formSchema[key].maxLength, `${t("form.maxCharactersError")} ${formSchema[key].maxLength}`)
            }
            if (formSchema[key].minLength) {
              _validationSchema[key] = Yup.string().max(formSchema[key].minLength, `${t("form.minCharactersError")} ${formSchema[key].minLength}`)
            }
          }
          if (formSchema[key].required) {
            _validationSchema[key] = _validationSchema[key].required(`${t("form.emptyError")}`);
          }
        }
      }
      setFormData(_formData);
      setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }
    initForm(formSchema);
  }, [formSchema, t, props.formData]);



  const getFormElement = (elementName, elementSchema) => {

    const props = {
      name: elementName,
      label: multilangual !== true
        ? elementSchema.title
        : t("style.language") === "en" ? elementSchema.titleEn : elementSchema.titleAr,
      options: elementSchema.options,
      size: elementSchema.size,
      isRequired: elementSchema.required,
      type: elementSchema.type,
      imgval: typeof formData[elementName] === "object" ? "" : formData[elementName],
      handle_reset_img_value: handle_reset_img_value

    };
    const fileProps = {
      name: elementName,
      label: elementSchema.title,
      options: elementSchema.options,
      size: elementSchema.size,
      attachment: elementSchema.attachment,
      isRequired: elementSchema.required,
      imgval: typeof formData[elementName] === "object" ? "" : formData[elementName],
      handle_reset_img_value: handle_reset_img_value
    };

    if (elementSchema.inputType === "email") {
      return <TextField {...props} />
    }
    else if (elementSchema.inputType === "select") {
      return <SelectField {...props} />
    }
    else if (elementSchema.inputType === "richText") {
      return <RichEditorField {...props} />
    }
    else if (elementSchema.inputType === "file") {
      if (elementSchema.attachment)
        return <FileField {...fileProps} />
      else if (!elementSchema.attachment)
        return <FileField {...props} />
    }
    else if (elementSchema.inputType === "text") {
      if (elementSchema.type === 1) {
        return <TextField {...props} />
      }
      else if (elementSchema.type === 2) {
        return <TextAreaField {...props} />
      }
      else if (elementSchema.type === 3) {
        return <NumberField {...props} />
      }
      else if (elementSchema.type === 4) {
        return <DateField {...props} />
      }
      else return <TextField {...props} />
    }
    else { }

  }
  const resetFormAdditional = () => {
    const uploadInputFileArray = document.getElementsByClassName("uploadInputFile");
    for (var i = 0; i < uploadInputFileArray.length; i++) { document.getElementsByClassName('uploadInputFile')[i].value = ""; }
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const redirectPage = (url) => {
    window.location = url;

  }

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {

    switch (SubmitName) {
      //////////1///////
      case "onSubmit_Delete_User": {
        const inputData = values;
        let id = payload;

        const token = 'Bearer '.concat(props.loginProps.token);
        axios.delete(`${ApiURL.domain}${ApiURL.accounts}${id}/`, { headers: { Authorization: token }, data: { current_password: values[Object.keys(inputData)[0]] } }).then(
          response => {
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            refreshPage();
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {document.getElementById('additionalErrors').innerHTML = `<p> ${errors[keyName]}</p>`}
                </React.Fragment>)
              })
            }
          });
        break;
      }

      //////2//////////
      case "onSubmit_signup_employee": {
        const inputData = values;
        inputData.zone = parseInt(inputData.zone)

        const token = 'Bearer '.concat(props.loginProps.token);
        axios.post(`${ApiURL.domain}${ApiURL.accountsEmployee}`, inputData, {
          'Content-Type': 'application/json',
          "headers": { Authorization: token }
        })
          .then(res => {
            document.getElementById('submitNote').innerHTML = `${t("form.submitted")} ✓`
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
          }).catch(err => {
            if (err.request) {
              setSubmitting(false);
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {errors[keyName].map((error, index) => {
                    return (<React.Fragment key={index}>
                      {document.getElementById('additionalErrors').innerHTML = `<p> ${error}</p>`}
                    </React.Fragment>)
                  })}
                </React.Fragment>)
              })
            }
          });
        break;
      }
      ///////////3///////
      case "onSubmit_edit_employee": {
        const inputData = values;
        inputData.zone = parseInt(inputData.zone)
        if (inputData.phone.startsWith("+963")) {
          inputData.phone = inputData.phone.substring(4);
        }

        if (inputData["password"] === "" || inputData["password"] === " ") {
          delete inputData["password"];
        }
        if (inputData["phone"] === "" || inputData["phone"] === " ") {
          delete inputData["phone"];
        }
        if (inputData["fullName"] === "" || inputData["fullName"] === " ") {
          delete inputData["fullName"];
        }
        const token = 'Bearer '.concat(props.loginProps.token);
        axios.post(`${ApiURL.domain}${ApiURL.accountsEmployee}${props.payload}/patch/`, inputData, {
          "headers": { Authorization: token }
        }).then(res => {
          document.getElementById('submitNote').innerHTML = `${t("form.submitted")} ✓`
          setSubmitting(false);
          resetForm();
          resetFormAdditional();
          refreshPage();
        }).catch(err => {
          if (err.request) {
            setSubmitting(false);
            let errors = JSON.parse(err.request.responseText)
            Object.keys(errors).map(function (keyName, keyIndex) {
              return (<React.Fragment key={keyIndex}>
                {errors[keyName].map((error, index) => {
                  return (<React.Fragment key={index}>
                    {document.getElementById('additionalErrors').innerHTML = `<p> ${error}</p>`}
                  </React.Fragment>)
                })}
              </React.Fragment>)
            })
          } if (err.response) {
            setSubmitting(false);
            let errors = JSON.parse(err.response.responseText)
            Object.keys(errors).map(function (keyName, keyIndex) {
              return (<React.Fragment key={keyIndex}>
                {errors[keyName].map((error, index) => {
                  return (<React.Fragment key={index}>
                    {document.getElementById('additionalErrors').innerHTML = `<p> ${error}</p>`}
                  </React.Fragment>)
                })}
              </React.Fragment>)
            })
          }
        });

        break;
      }
      ////////////4///////
      case "onSubmit_editSettings": {
        const inputData = values;
        const token = 'Bearer '.concat(props.loginProps.token);
        axios.put(`${ApiURL.domain}${ApiURL.settings}`, inputData, {
          'Content-Type': 'application/json',
          "headers": { Authorization: token }
        })
          .then(res => {
            refreshPage();
            resetForm();
            resetFormAdditional();
            setSubmitting(false);
          }).catch(err => {
            setSubmitting(false);
            if (err.request) { }
          });
        break;
      }
      /////////5////////
      case "onSubmit_addNewTemplate": {

        const inputData = values;

        let defaultimage = ServiceDefaultimage.img

        inputData["category"] = parseInt(inputData["category"])
        inputData["price"] = parseInt(inputData["price"])

        let data = {
          "category": inputData["category"],
          "title": inputData["title"],
          "details": inputData["details"],
          "price": inputData["price"],
          "image": inputData["image"] === "" ? defaultimage : inputData["image"],
          "fieldTemplates": [],
          "fileFieldTemplates": []
        }
        setSubmitting(false)


        const token = 'Bearer '.concat(props.loginProps.token);
        axios.post(`${ApiURL.domain}${ApiURL.services}`, data, { headers: { Authorization: token } }).then(
          response => {
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            redirectPage(`/admin/services/edit-service/${response.data.id}/`)
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {document.getElementById('additionalErrors').innerHTML = `<p> ${errors[keyName]}</p>`}
                </React.Fragment>)
              })
            }
          });


        break;
      }

      ////////////6///////
      case "onSubmit_updatePaper": {
        const inputData = values;
        let paperId = parseInt(inputData["id"])
        let defaultimage = ServiceDefaultimage.img

        let data = {
          "category": parseInt(inputData["category"]),
          "title": inputData["title"],
          "details": inputData["details"],
          "price": parseInt(inputData["price"]),
          "image": inputData["image"] === "" ? defaultimage : inputData["image"],
          "fieldTemplates": [],
          "fileFieldTemplates": []
        };

        for (var keey of Object.keys(inputData)) {

          if (keey.startsWith("fieldTitle")) {
            let end = keey.substring(10);
            let requiredBool = (inputData[`fieldRequired${end}`] === 'true' || inputData[`fieldRequired${end}`] === true);
            data["fieldTemplates"].push(
              {
                "title": inputData[`fieldTitle${end}`] ? inputData[`fieldTitle${end}`] : "",
                "required": inputData[`fieldRequired${end}`] ? requiredBool : false,
                "type": inputData[`fieldType${end}`] ? parseInt(inputData[`fieldType${end}`]) : 1,
                "paperTemplate": paperId,
                "priority": inputData[`fieldPriority${end}`] ? parseInt(inputData[`fieldPriority${end}`]) : 1
              })
          }
          else if (keey.startsWith("fileTitle")) //fileTitle0
          {
            let end = keey.substring(9);
            let requiredBool = (inputData[`fileRequired${end}`] === 'true' || inputData[`fileRequired${end}`] === true);
            data["fileFieldTemplates"].push(
              {
                "title": inputData[`fileTitle${end}`] ? inputData[`fileTitle${end}`] : "",
                "required": inputData[`fileRequired${end}`] ? requiredBool : false,
                "paperTemplate": paperId,
                "priority": inputData[`filePriority${end}`] ? parseInt(inputData[`filePriority${end}`]) : 1,
                "attachment": inputData[`fileAttachment${end}`] ? inputData[`fileAttachment${end}`] : ""
              })
          }
        }

        const token = 'Bearer '.concat(props.loginProps.token);
        axios.put(`${ApiURL.domain}${ApiURL.services}${paperId}/`, data, { headers: { Authorization: token } }).then(
          response => {
            document.getElementById('submited').innerHTML = "تم الحفظ بنجاح";
            document.getElementById('DynamicFormforUpdatePaper').style.display = "none";
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {document.getElementById('additionalErrors').innerHTML = `<p> ${errors[keyName]}</p>`}
                </React.Fragment>)
              })
            }
          });

        break;
      }





      /////////7///////
      case "onSubmit_AddCategory": {

        const inputData = values;
        const data = {
          ...inputData,
          "paperTemplates": []
        }
        const token = 'Bearer '.concat(props.loginProps.token);
        axios.post(`${ApiURL.domain}${ApiURL.collections}`, data, { headers: { Authorization: token } }).then(
          response => {
            document.getElementById('submitNote').innerHTML = `${t("form.submitted")} ✓`
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
          }).catch(err => {
            setSubmitting(false);

            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {document.getElementById('additionalErrors').innerHTML = `<p> ${errors[keyName]}</p>`}
                </React.Fragment>)
              })
            }
          });

        break;
      }

      /////////8/////////
      case "onSubmit_EditCategory": {

        const inputData = values;
        const token = 'Bearer '.concat(props.loginProps.token);
        axios.put(`${ApiURL.domain}${ApiURL.collections}${props.payload}/`, inputData, { headers: { Authorization: token } }).then(
          response => {
            document.getElementById('submitNote').innerHTML = `${t("form.submitted")} ✓`
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            refreshPage();
          }).catch(err => {
            setSubmitting(false);

            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {document.getElementById('additionalErrors').innerHTML = `<p> ${errors[keyName]}</p>`}
                </React.Fragment>)
              })
            }
          });

        break;
      }

      /////////9///////
      case "onSubmit_AssignPaperToEmployee": {


        const inputData = values;

        const token = 'Bearer '.concat(props.loginProps.token);
        axios.get(`${ApiURL.domain}${ApiURL.applications}${payload}/assign/${inputData.employee}/`, { "headers": { Authorization: token } })
          .then(response => {
            alert("تم اسناد الطلب للموظف")
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            refreshPage();
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {document.getElementById('additionalErrors').innerHTML = `<p> ${errors[keyName]}</p>`}
                </React.Fragment>)
              })
            }
          });

        break;
      }


      default: break;
    }
  }


  return (
    <div className="DynamicForm text-left">
      <Container className={` ${t("style.rtl")}`}>
        <Row>
          <Col xs={0} md={2}></Col>
          <Col xs={12} md={8}>
            <Form
              enableReinitialize
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >

              {Object.keys(formSchema).map((key, ind) => (
                <div key={key} >
                  {getFormElement(key, formSchema[key])}

                  {key === "fieldTemplates"
                    ? <><hr /><Container className=""> <Row><p> الحقول النصية</p></Row> </Container> </>
                    : null}

                  {key === "fieldTemplates"
                    ? formSchema[key].map((subFormSchema, index) => {
                      return (
                        <Container key={index} id={`fieldsContainer${index}`} style={{ boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.5)", backgroundColor: "#fff", marginBottom: "20px", paddingBottom: "20px" }}>
                          <TiDeleteOutline type="button" onClick={() => { props.handleDeleteFieldTemplate(index) }} />
                          <Row className="text-center" >
                            {Object.keys(subFormSchema).map((key2, ind) => (
                              <Col xs={12} sm={6} md={3} key={ind} style={{ margin: "0px", padding: "0px" }}>
                                {getFormElement(`${key2}${index}`, subFormSchema[key2])}
                              </Col>
                            ))}
                          </Row>
                        </Container>
                      )
                    })
                    : null}
                  {key === "fieldTemplates"
                    ? <>
                      <Container className="text-center">
                        <Row><span type="button" onClick={() => { props.handleAddFieldTemplate(); }}><RiAddCircleLine /> اضافة حقل</span>
                        </Row>
                      </Container>
                    </>
                    : null}
                  {key === "fileFieldTemplates"
                    ? <><hr /><Container className=""> <Row><p> حقول الملفات </p></Row> </Container> </>
                    : null}
                  {key === "fileFieldTemplates"
                    ? formSchema[key].map((subFormSchema, index) => {
                      return (
                        <Container key={index} style={{ boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.5)", backgroundColor: "#fff", marginBottom: "20px", paddingBottom: "20px" }}>
                          <TiDeleteOutline type="button" onClick={() => { props.handleDeleteFileFieldTemplate(index) }} />
                          <Row className="text-center">
                            {Object.keys(subFormSchema).map((key2, ind) => (
                              <Col xs={12} sm={6} md={3} key={ind} style={{ margin: "0px", padding: "0px" }}>
                                {getFormElement(`${key2}${index}`, subFormSchema[key2])}
                              </Col>
                            ))}
                          </Row>
                        </Container>
                      )
                    })
                    : null}
                  {key === "fileFieldTemplates"
                    ? <>
                      <Container className="text-center">
                        <Row><span type="button" onClick={props.handleAddFileFieldTemplate}><RiAddCircleLine /> اضافة حقل</span></Row>
                      </Container>
                    </>
                    : null}
                </div>
              ))}
              <div className="text-center">
                <SubmitButton className="text-center"
                  title={props.buttonName}
                />
              </div>
            </Form>
          </Col>
          <Col xs={0} md={2}></Col>
        </Row>
      </Container>

    </div >
  )
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    loginProps: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.authUser(email, password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);