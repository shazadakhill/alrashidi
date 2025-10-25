
import React, { useState, useEffect } from 'react';
import { Form, TextField, TextAreaField, SubmitButton, FileField, SelectField, DateField, NumberField, RichEditorField } from '../../../hooks/FormElements';
import * as Yup from 'yup';
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import ApiURL from '../../../jsonFiles/api/api.json'
import * as actions from '../../../reduxFolder/action/auth'
import { connect } from 'react-redux'


const DynamicForm = (props) => {
  const SubmitName = props.submitFunction;
  const multilangual = props.multilangual;
  const payload = props.payload;
  const formSchema = props.formSchema;

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
      // imgval: formData[elementName],
    };
    const fileProps = {
      name: elementName,
      label: elementSchema.title,
      options: elementSchema.options,
      size: elementSchema.size,
      attachment: elementSchema.attachment,
      isRequired: elementSchema.required,
      // imgval: formData[elementName],
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

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {

    switch (SubmitName) {
      ///////////1///////
      case "onSubmit_servicesApplication": {
        const inputData = values;
        let data = {
          "paperTemplate": parseInt(props.parentId),
          "status": 1,
          "paperFields": [],
          "paperFileFields": []
        }
        for (let index = 0; index < Object.values(inputData).length; index++) {
          if (formSchema[Object.keys(inputData)[index]].inputType === "text") {
            data.paperFields.push(
              {
                "fieldTemplate": formSchema[Object.keys(inputData)[index]].id,
                "data": Object.values(inputData)[index]
              })
          }
          else if (formSchema[Object.keys(inputData)[index]].inputType === "file") {
            data.paperFileFields.push(
              {
                "fileFieldTemplate": formSchema[Object.keys(inputData)[index]].id,
                "data": Object.values(inputData)[index]
              })
          }
        }
        const token = 'Bearer '.concat(props.loginProps.token);
        axios.post(`${ApiURL.domain}${ApiURL.applications}`, data, {
          'Content-Type': 'application/json',
          "headers": { Authorization: token }
        })
          .then(response => {

            document.getElementById('applicationFormDiv').style.display = "none"
            document.getElementById('paymentCodeDiv').style.display = "block"
            document.getElementById('paymentCode').innerHTML = `${response.data.payment_code}`

            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            document.getElementById('submitNote').innerHTML = `${t("form.submitted")} ✓`
          }).catch(err => {
            setSubmitting(false);
          })
        break;
      }


      ////////////2/////////
      case "onSubmit_signup": {
        const inputData = values;
        inputData.zone = parseInt(inputData.zone)
        axios.post(`${ApiURL.domain}${ApiURL.accounts}`, inputData)
          .then(res => {
            document.getElementById('resendActivation').style.display = "block";
            document.getElementById('signupForm').style.display = "none";
            document.getElementById('reActivationNumber').innerHTML = inputData["phone"];
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
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

      ////////3////////////
      case "onSubmit_editSignup": {
        const inputData = values;
        inputData.zone = parseInt(inputData.zone)

        const token = 'Bearer '.concat(props.loginProps.token);
        axios.put(`${ApiURL.domain}${ApiURL.myUser}`, inputData, {
          'Content-Type': 'application/json',
          "headers": { Authorization: token }
        })
          .then(res => {
            refreshPage();
            resetForm();
            resetFormAdditional();
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
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
      ////////4////////
      case "onSubmit_login": {
        const inputData = values;
        props.onAuth(inputData["phone"], inputData["password"]);
        setSubmitting(false);
        break;
      }

      /////////5///////////
      case "onSubmit_resetPasswordRequest": {
        const inputData = values;
        axios.post(`${ApiURL.domain}${ApiURL.resetPasswordRequest}`, inputData)
          .then(response => {
            alert(`code is sent to ${inputData.phone} successfully`)
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            document.getElementById('resetPasswordNumber').style.display = "none";
            document.getElementById('goToResetPassword').style.display = "block";
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              if (typeof errors === "object") {
                Object.keys(errors).map(function (keyName, keyIndex) {
                  return (<React.Fragment key={keyIndex}> {errors[keyName].map((error, index) => {
                    return (<React.Fragment key={index}>
                      {document.getElementsByClassName('additionalErrors')[1].innerHTML = `<p> ${error}</p>`}
                    </React.Fragment>)
                  })}
                  </React.Fragment>)
                })
              } else { document.getElementsByClassName('additionalErrors')[1].innerHTML = `<p> ${errors}</p>` }
            }
          });
        break;
      }

      ////////////6///////////
      case "onSubmit_resetPassword_confirm": {
        const inputData = values;

        axios.post(`${ApiURL.domain}${ApiURL.resetPasswordConfirm}`, inputData)
          .then(response => {
            alert(`new password ${inputData.password} is set successfully`)
            document.getElementById('beforPasswordChange').style.display = "none";
            document.getElementById('afterPasswordChange').style.display = "block";
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              if (typeof errors === "object") {
                Object.keys(errors).map(function (keyName, keyIndex) {
                  return (<React.Fragment key={keyIndex}>
                    {errors[keyName].map((error, index) => {
                      return (<React.Fragment key={index}>
                        {document.getElementById('additionalErrors').innerHTML = `<p> ${error}</p>`}
                      </React.Fragment>)
                    })}
                  </React.Fragment>)
                })
              } else { document.getElementsByClassName('additionalErrors')[0].innerHTML = `<p> ${errors}</p>` }
            }
          });
        break;
      }


      /////////7///////////....
      case "onSubmit_activate_resend": {
        const inputData = values;

        axios.post(`${ApiURL.domain}${ApiURL.reSendActivation}`, inputData)
          .then(response => {
            alert(`activation resent to ${inputData.phone} successfully`)
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {errors[keyName].map((error, index) => {
                    return (<React.Fragment key={index}>
                      {document.getElementsByClassName('additionalErrors')[1].innerHTML = `<p> ${error}</p>`}
                    </React.Fragment>)
                  })}
                </React.Fragment>)
              })
            }
          });
        break;
      }
      /////////8///////////
      case "onSubmit_activate_confirm": {
        const inputData = values;

        axios.post(`${ApiURL.domain}${ApiURL.activation}`, inputData)
          .then(response => {
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            document.getElementById('beforActivation').style.display = "none";
            document.getElementById('afterActivation').style.display = "block";
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              if (typeof errors === "object") {
                Object.keys(errors).map(function (keyName, keyIndex) {
                  return (<React.Fragment key={keyIndex}> {errors[keyName].map((error, index) => {
                    return (<React.Fragment key={index}>
                      {document.getElementsByClassName('additionalErrors')[0].innerHTML = `<p> ${error}</p>`}
                    </React.Fragment>)
                  })}
                  </React.Fragment>)
                })
              } else { document.getElementsByClassName('additionalErrors')[0].innerHTML = `<p> ${errors}</p>` }
            }
          });
        break;
      }






      ///////////9////////
      case "onSubmit_updateStatus": {
        let inputData = values;
        inputData.status = parseInt(inputData.status)

        const token = 'Bearer '.concat(props.loginProps.token);
        axios.post(`${ApiURL.domain}${ApiURL.applications}${payload}/update_status/`,
          inputData,
          {
            'Content-Type': 'application/json',
            "headers": { Authorization: token }
          })
          .then(response => {
            alert("تم تعديل الحالة")
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            refreshPage();
          }).catch(err => {
            if (err.request) {
              setSubmitting(false);
            }
          });
        break;
      }

      //////////10/////
      case "onSubmit_Delete_MyAccount": {
        const inputData = values;
        const token = 'Bearer '.concat(props.loginProps.token);
        axios.delete(`${ApiURL.domain}${ApiURL.myUser}`, { headers: { Authorization: token }, inputData }).then(
          response => {
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            refreshPage();
            props.onAuthLogout()
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

      /////////////11//////
      case "onSubmit_Change_MyPassword": {
        const inputData = values;
        const token = 'Bearer '.concat(props.loginProps.token);
        axios.post(`${ApiURL.domain}${ApiURL.setPassword}`, inputData, { headers: { Authorization: token } }).then(
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
                  {errors[keyName].map((error, index) => {
                    return (<React.Fragment key={index}>
                      {document.getElementsByClassName('additionalErrors')[1].innerHTML = `<p> ${error}</p>`}
                    </React.Fragment>)
                  })}
                </React.Fragment>)
              })
            }
          });
        break;
      }

      /////////////12/////////
      case "onSubmit_Change_MyPhone": {
        const inputData = values;
        const token = 'Bearer '.concat(props.loginProps.token);

        axios.post(`${ApiURL.domain}${ApiURL.setUsername}`, inputData, { headers: { Authorization: token } }).then(
          response => {
            setSubmitting(false);
            resetForm();
            resetFormAdditional();
            refreshPage();
            props.onAuthLogout()
          }).catch(err => {
            setSubmitting(false);
            if (err.request) {
              let errors = JSON.parse(err.request.responseText)
              Object.keys(errors).map(function (keyName, keyIndex) {
                return (<React.Fragment key={keyIndex}>
                  {errors[keyName].map((error, index) => {
                    return (<React.Fragment key={index}>
                      {document.getElementsByClassName('additionalErrors')[1].innerHTML = `<p> ${error}</p>`}
                    </React.Fragment>)
                  })}
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
                <div key={ind} >
                  {getFormElement(key, formSchema[key])}
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

    </div>
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
    onAuth: (email, password) => dispatch(actions.authUser(email, password)),
    onAuthLogout: () => dispatch(actions.authLogout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);

