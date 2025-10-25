import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import DynamicForm from "../../containers/dynamicForm/dynamicForm"
import PaperTemplateJson from "../../../jsonFiles/staticForms/service/paperTemplate"
import PaperTemplateInitilizeJson from "../../../jsonFiles/staticForms/service/PaperTemplateInitilize.json"
import FieldTemplateJson from "../../../jsonFiles/staticForms/service/paperFieldTemplate.json"
import FileFieldTemplateJson from "../../../jsonFiles/staticForms/service/paperFileFieldTemplate.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';


class EditService extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;

    axios.get(`${ApiURL.domain}${ApiURL.collections}`).then(
      response => {
        if (this.mounted) {
          this.setState({
            Categories: response.data,
            FormSchemaPaperTemplate: {
              ...PaperTemplateJson, "fieldTemplates": [],
              "fileFieldTemplates": []
            },
            Status: true
          })
          if (this.state.FormSchemaPaperTemplate["category"].options.length === 0) {
            this.state.Categories.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              return 0;
            }).map((category, index) => {
              return (<React.Fragment key={index}>
                {this.state.FormSchemaPaperTemplate["category"].options.push({
                  "label": category.title,
                  "value": category.id
                })}
              </React.Fragment>)
            })
          }

          axios.get(`${ApiURL.domain}${ApiURL.services}${this.props.match.params.id}/`).then(
            response => {

              this.setState({
                NameOfTheService: response.data.title,
                FormDataPaperTemplate:
                {
                  "id": response.data.id,
                  "category": response.data.category,
                  "title": response.data.title,
                  "details": response.data.details,
                  "price": response.data.price,
                  "image": response.data.image,
                  "fieldTemplates": [],
                  "fileFieldTemplates": []
                }
              })
              for (let index = 0; index < response.data.fieldTemplates.length; index++) {

                let newFieldData = {}
                newFieldData[`fieldTitle${index}`] = response.data.fieldTemplates[index]["title"];
                newFieldData[`fieldRequired${index}`] = response.data.fieldTemplates[index]["required"];
                newFieldData[`fieldType${index}`] = response.data.fieldTemplates[index]["type"];
                newFieldData[`fieldPriority${index}`] = response.data.fieldTemplates[index]["priority"];

                let newFieldTemplates = this.state.FormSchemaPaperTemplate["fieldTemplates"];
                newFieldTemplates.push(FieldTemplateJson)

                this.setState(prevState => ({
                  FormSchemaPaperTemplate: {
                    ...prevState.FormSchemaPaperTemplate,
                    fieldTemplates: newFieldTemplates
                  },
                  FormDataPaperTemplate: {
                    ...prevState.FormDataPaperTemplate,
                    ...newFieldData
                  }

                }))
              }
              for (let index = 0; index < response.data.fileFieldTemplates.length; index++) {

                let newFileFieldData = {}
                newFileFieldData[`fileTitle${index}`] = response.data.fileFieldTemplates[index]["title"];
                newFileFieldData[`fileRequired${index}`] = response.data.fileFieldTemplates[index]["required"];
                newFileFieldData[`filePriority${index}`] = response.data.fileFieldTemplates[index]["priority"];
                newFileFieldData[`fileAttachment${index}`] = response.data.fileFieldTemplates[index]["attachment"];


                let newFileFieldTemplates = this.state.FormSchemaPaperTemplate["fileFieldTemplates"];
                newFileFieldTemplates.push(FileFieldTemplateJson)

                this.setState(prevState => ({
                  FormSchemaPaperTemplate: {
                    ...prevState.FormSchemaPaperTemplate,
                    fileFieldTemplates: newFileFieldTemplates
                  },
                  FormDataPaperTemplate: {
                    ...prevState.FormDataPaperTemplate,
                    ...newFileFieldData
                  }
                }))
              }
            }
          )
        }
      }
    )
  }



  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    NameOfTheService: "",
    Categories: [],
    FormSchemaPaperTemplate: {},
    FormDataPaperTemplate: PaperTemplateInitilizeJson,
    Status: false,
    fieldsNumper: 1
  }


  constructor(props) {
    super(props)
    
    this.addPaperhandler = this.addPaperhandler.bind(this)
    this.addFieldTemplate = this.addFieldTemplate.bind(this)
    this.addFileFieldTemplate = this.addFileFieldTemplate.bind(this)
    this.deleteFieldTemplate = this.deleteFieldTemplate.bind(this)
    this.deleteFileFieldTemplate = this.deleteFileFieldTemplate.bind(this)
    this.resetImgValue = this.resetImgValue.bind(this)
  }
  

  addPaperhandler(formData) {
    this.setState({
      FormDataPaperTemplate: formData,
      FormSchemaPaperTemplate: {
        ...this.state.FormSchemaPaperTemplate, "fieldTemplates": [],
        "fileFieldTemplates": []
      }
    })
  }
  
  resetImgValue(nameOfField) {

    let newFormDataPaperTemplate = {
      "id": this.state.FormDataPaperTemplate["id"],
      "category": document.getElementById(`category`).value,
      "title": document.getElementById(`title`).value,
      "details": document.getElementById(`${`details`}RichVal`).innerText,
      "price": document.getElementById(`price`).value,
      "image": document.getElementById(`${`image`}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`${`image`}ImgVal`).href,
      "fieldTemplates": [],
      "fileFieldTemplates": []

    }

    for (let index = 0; index < this.state.FormSchemaPaperTemplate["fileFieldTemplates"].length; index++) {
      newFormDataPaperTemplate[`fileTitle${index}`] = document.getElementById(`fileTitle${index}`).value;
      newFormDataPaperTemplate[`fileRequired${index}`] = document.getElementById(`fileRequired${index}`).value;
      newFormDataPaperTemplate[`filePriority${index}`] = document.getElementById(`filePriority${index}`).value;
      newFormDataPaperTemplate[`fileAttachment${index}`] = document.getElementById(`fileAttachment${index}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`fileAttachment${index}ImgVal`).href;
    }
    for (let indexx = 0; indexx < this.state.FormSchemaPaperTemplate["fieldTemplates"].length; indexx++) {
      newFormDataPaperTemplate[`fieldTitle${indexx}`] = document.getElementById(`fieldTitle${indexx}`).value;
      newFormDataPaperTemplate[`fieldRequired${indexx}`] = document.getElementById(`fieldRequired${indexx}`).value;
      newFormDataPaperTemplate[`fieldType${indexx}`] = document.getElementById(`fieldType${indexx}`).value;
      newFormDataPaperTemplate[`fieldPriority${indexx}`] = document.getElementById(`fieldPriority${indexx}`).value;
    }


    newFormDataPaperTemplate[nameOfField] = ""
    this.setState(prevState => ({
      FormDataPaperTemplate: newFormDataPaperTemplate
    }))

  }


  deleteFieldTemplate(fieldIndex,) {
    let newFieldTemplates = [...this.state.FormSchemaPaperTemplate["fieldTemplates"]]
    newFieldTemplates.splice(fieldIndex, 1)

    let newFormDataPaperTemplate = {
      "id": this.state.FormDataPaperTemplate["id"],
      "category": document.getElementById(`category`).value,
      "title": document.getElementById(`title`).value,
      "details": document.getElementById(`${`details`}RichVal`).innerText,
      "price": document.getElementById(`price`).value,
      "image": document.getElementById(`${`image`}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`${`image`}ImgVal`).href,
      "fieldTemplates": [],
      "fileFieldTemplates": []
    }
    for (var key of Object.keys(this.state.FormDataPaperTemplate)) {
      if (key.startsWith("fieldTitle")) {
        let end = key.substring(10);
        if (end < fieldIndex) {
          newFormDataPaperTemplate[`fieldTitle${end}`] = document.getElementById(`fieldTitle${end}`).value;
          newFormDataPaperTemplate[`fieldRequired${end}`] = document.getElementById(`fieldRequired${end}`).value;
          newFormDataPaperTemplate[`fieldType${end}`] = document.getElementById(`fieldType${end}`).value;
          newFormDataPaperTemplate[`fieldPriority${end}`] = document.getElementById(`fieldPriority${end}`).value;
        }
        else if (end > fieldIndex) {
          newFormDataPaperTemplate[`fieldTitle${end - 1}`] = document.getElementById(`fieldTitle${end}`).value;
          newFormDataPaperTemplate[`fieldRequired${end - 1}`] = document.getElementById(`fieldRequired${end}`).value;
          newFormDataPaperTemplate[`fieldType${end - 1}`] = document.getElementById(`fieldType${end}`).value;
          newFormDataPaperTemplate[`fieldPriority${end - 1}`] = document.getElementById(`fieldPriority${end}`).value;
        }
      }
      else if (key.startsWith("fileTitle")) {
        let end = key.substring(9);
        newFormDataPaperTemplate[`fileTitle${end}`] = document.getElementById(`fileTitle${end}`).value;
        newFormDataPaperTemplate[`fileRequired${end}`] = document.getElementById(`fileRequired${end}`).value;
        newFormDataPaperTemplate[`filePriority${end}`] = document.getElementById(`filePriority${end}`).value;
        newFormDataPaperTemplate[`fileAttachment${end}`] = document.getElementById(`fileAttachment${end}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`fileAttachment${end}ImgVal`).href;
      }
    }
    this.setState(prevState => ({
      FormSchemaPaperTemplate: {
        ...prevState.FormSchemaPaperTemplate,
        fieldTemplates: newFieldTemplates,
      },
      FormDataPaperTemplate: newFormDataPaperTemplate
    }))
  }


  deleteFileFieldTemplate(fieldIndex,) {
    let newFileFieldTemplates = [...this.state.FormSchemaPaperTemplate["fileFieldTemplates"]]
    newFileFieldTemplates.splice(fieldIndex, 1)

    let newFormDataPaperTemplate = {
      "id": this.state.FormDataPaperTemplate["id"],
      "category": document.getElementById(`category`).value,
      "title": document.getElementById(`title`).value,
      "details": document.getElementById(`${`details`}RichVal`).innerText,
      "price": document.getElementById(`price`).value,
      "image": document.getElementById(`${`image`}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`${`image`}ImgVal`).href,
      "fieldTemplates": [],
      "fileFieldTemplates": []
    }
    for (var key of Object.keys(this.state.FormDataPaperTemplate)) {
      if (key.startsWith("fieldTitle")) {
        let end = key.substring(10);
        newFormDataPaperTemplate[`fieldTitle${end}`] = document.getElementById(`fieldTitle${end}`).value;
        newFormDataPaperTemplate[`fieldRequired${end}`] = document.getElementById(`fieldRequired${end}`).value;
        newFormDataPaperTemplate[`fieldType${end}`] = document.getElementById(`fieldType${end}`).value;
        newFormDataPaperTemplate[`fieldPriority${end}`] = document.getElementById(`fieldPriority${end}`).value;
      }
      else if (key.startsWith("fileTitle")) {

        let end = key.substring(9);


        if (end < fieldIndex) {
          newFormDataPaperTemplate[`fileTitle${end}`] = document.getElementById(`fileTitle${end}`).value;
          newFormDataPaperTemplate[`fileRequired${end}`] = document.getElementById(`fileRequired${end}`).value;
          newFormDataPaperTemplate[`filePriority${end}`] = document.getElementById(`filePriority${end}`).value;
          newFormDataPaperTemplate[`fileAttachment${end}`] = document.getElementById(`fileAttachment${end}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`fileAttachment${end}ImgVal`).href;
          //for removing name of file input
          document.getElementById(`fileAttachment${end}`).value = "";

        }
        else if (end > fieldIndex) {
          newFormDataPaperTemplate[`fileTitle${end - 1}`] = document.getElementById(`fileTitle${end}`).value;
          newFormDataPaperTemplate[`fileRequired${end - 1}`] = document.getElementById(`fileRequired${end}`).value;
          newFormDataPaperTemplate[`filePriority${end - 1}`] = document.getElementById(`filePriority${end}`).value;
          newFormDataPaperTemplate[`fileAttachment${end - 1}`] = document.getElementById(`fileAttachment${end}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`fileAttachment${end}ImgVal`).href;

          //for removing name of file input
          document.getElementById(`fileAttachment${end - 1}`).value = "";

        }

      }
    }
    this.setState(prevState => ({
      FormSchemaPaperTemplate: {
        ...prevState.FormSchemaPaperTemplate,
        fileFieldTemplates: newFileFieldTemplates,
      },
      FormDataPaperTemplate: newFormDataPaperTemplate
    }))
  }

  addFieldTemplate() {
    let newFieldTemplates = [...this.state.FormSchemaPaperTemplate["fieldTemplates"]]
    let lastIndex = newFieldTemplates.push(FieldTemplateJson) - 1
    let newFormDataPaperTemplate = {
      "id": this.state.FormDataPaperTemplate["id"],
      "category": document.getElementById(`category`).value,
      "title": document.getElementById(`title`).value,
      "details": document.getElementById(`${`details`}RichVal`).innerText,
      "price": document.getElementById(`price`).value,
      "image": document.getElementById(`${`image`}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`${`image`}ImgVal`).href,
      "fieldTemplates": [],
      "fileFieldTemplates": []
    }
    for (let index = 0; index < lastIndex; index++) {
      newFormDataPaperTemplate[`fieldTitle${index}`] = document.getElementById(`fieldTitle${index}`).value;
      newFormDataPaperTemplate[`fieldRequired${index}`] = document.getElementById(`fieldRequired${index}`).value;
      newFormDataPaperTemplate[`fieldType${index}`] = document.getElementById(`fieldType${index}`).value;
      newFormDataPaperTemplate[`fieldPriority${index}`] = document.getElementById(`fieldPriority${index}`).value;
    }
    newFormDataPaperTemplate[`fieldTitle${lastIndex}`] = '';
    newFormDataPaperTemplate[`fieldRequired${lastIndex}`] = '';
    newFormDataPaperTemplate[`fieldType${lastIndex}`] = "";
    newFormDataPaperTemplate[`fieldPriority${lastIndex}`] = 1;

    for (let index = 0; index < this.state.FormSchemaPaperTemplate["fileFieldTemplates"].length; index++) {
      newFormDataPaperTemplate[`fileTitle${index}`] = document.getElementById(`fileTitle${index}`).value;
      newFormDataPaperTemplate[`fileRequired${index}`] = document.getElementById(`fileRequired${index}`).value;
      newFormDataPaperTemplate[`filePriority${index}`] = document.getElementById(`filePriority${index}`).value;
      newFormDataPaperTemplate[`fileAttachment${index}`] = document.getElementById(`fileAttachment${index}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`fileAttachment${index}ImgVal`).href;
    }


    this.setState(prevState => ({
      FormSchemaPaperTemplate: {
        ...prevState.FormSchemaPaperTemplate, fieldTemplates: newFieldTemplates
      },
      FormDataPaperTemplate: newFormDataPaperTemplate

    }))
  }

  addFileFieldTemplate() {
    let newFileFieldTemplates = [...this.state.FormSchemaPaperTemplate["fileFieldTemplates"]]
    let lastIndex = newFileFieldTemplates.push(FileFieldTemplateJson) - 1
    let newFormDataPaperTemplate = {
      "id": this.state.FormDataPaperTemplate["id"],
      "category": document.getElementById(`category`).value,
      "title": document.getElementById(`title`).value,
      "details": document.getElementById(`${`details`}RichVal`).innerText,
      "price": document.getElementById(`price`).value,
      "image": document.getElementById(`${`image`}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`${`image`}ImgVal`).href,
      "fieldTemplates": [],
      "fileFieldTemplates": []
    }
    for (let index = 0; index < lastIndex; index++) {
      newFormDataPaperTemplate[`fileTitle${index}`] = document.getElementById(`fileTitle${index}`).value;
      newFormDataPaperTemplate[`fileRequired${index}`] = document.getElementById(`fileRequired${index}`).value;
      newFormDataPaperTemplate[`filePriority${index}`] = document.getElementById(`filePriority${index}`).value;
      newFormDataPaperTemplate[`fileAttachment${index}`] = document.getElementById(`fileAttachment${index}ImgVal`).href === "http://www.alrashidi.sy/" ? "" : document.getElementById(`fileAttachment${index}ImgVal`).href;
    }
    newFormDataPaperTemplate[`fileTitle${lastIndex}`] = '';
    newFormDataPaperTemplate[`fileRequired${lastIndex}`] = '';
    newFormDataPaperTemplate[`filePriority${lastIndex}`] = 1;
    newFormDataPaperTemplate[`fileAttachment${lastIndex}`] = "";

    for (let index = 0; index < this.state.FormSchemaPaperTemplate["fieldTemplates"].length; index++) {
      newFormDataPaperTemplate[`fieldTitle${index}`] = document.getElementById(`fieldTitle${index}`).value;
      newFormDataPaperTemplate[`fieldRequired${index}`] = document.getElementById(`fieldRequired${index}`).value;
      newFormDataPaperTemplate[`fieldType${index}`] = document.getElementById(`fieldType${index}`).value;
      newFormDataPaperTemplate[`fieldPriority${index}`] = document.getElementById(`fieldPriority${index}`).value;
    }


    this.setState(prevState => ({
      FormSchemaPaperTemplate: {
        ...prevState.FormSchemaPaperTemplate, fileFieldTemplates: newFileFieldTemplates
      },
      FormDataPaperTemplate: newFormDataPaperTemplate

    }))
  }




  render() {
    let form = null;
    if (this.state.Status) {
      form = (
        <span id="DynamicFormforUpdatePaper" style={{ display: "inline" }}>
          <DynamicForm
            formSchema={this.state.FormSchemaPaperTemplate}
            formData={this.state.FormDataPaperTemplate}
            submitFunction={`onSubmit_updatePaper`}
            buttonName={"حفظ"}
            parentId={""}
            handleAddFieldTemplate={this.addFieldTemplate}
            handleAddFileFieldTemplate={this.addFileFieldTemplate}
            handleDeleteFieldTemplate={this.deleteFieldTemplate}
            handleDeleteFileFieldTemplate={this.deleteFileFieldTemplate}
            handle_reset_img_value={this.resetImgValue}
          ></DynamicForm>
        </span>
      )
    } else {
      form = (<LoadingSpinner />)
    }

    return (
      <div className="EditService text-center">
        <h5 style={{ marginTop: "40px" }}>تعديل خدمة {this.state.NameOfTheService}</h5>
        {form}
        <div id="submited"></div>
      </div>
    )
  }
};
export default EditService;