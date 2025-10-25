import React, { Component } from 'react';
import axios from 'axios'
import ApiURL from "../../../jsonFiles/api/api.json"
import DynamicForm from "../../containers/dynamicForm/dynamicForm"
import PaperTemplateJson from "../../../jsonFiles/staticForms/service/paperTemplate"
import PaperTemplateInitilizeJson from "../../../jsonFiles/staticForms/service/PaperTemplateInitilize.json"
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';


class AddService extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.mounted = true;

    axios.get(`${ApiURL.domain}${ApiURL.collections}`).then(
      response => {
        if (this.mounted) {
          this.setState({
            Categories: response.data,
            FormSchemaPaperTemplate: PaperTemplateJson,
            Status: true
          })
          if (this.state.FormSchemaPaperTemplate["category"].options.length === 0) {
            this.state.Categories.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              return 0;
            }).map((category,index) => {
              return (<React.Fragment key={index}>
                {this.state.FormSchemaPaperTemplate["category"].options.push({
                  "label": category.title,
                  "value": category.id
                })}
              </React.Fragment>)
            })
          }
        }
      })
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  state = {
    Categories: [],
    FormSchemaPaperTemplate: {},
    FormDataPaperTemplate: PaperTemplateInitilizeJson,
    Status: false,
  }

  render() {
    let form = null;
    if (this.state.Status) {
      form = (<span id="DynamicFormforAddPaper">
        <DynamicForm
          formSchema={this.state.FormSchemaPaperTemplate}
          submitFunction={`onSubmit_addNewTemplate`}
          buttonName={"حفظ ومتابعة"}
          parentId={""}
        ></DynamicForm>
      </span>)
    } else {
      form = (<LoadingSpinner />)
    }

    return (
      <div className="AddService text-center">
        <h5 style={{ marginTop: "40px" }}>اضافة خدمة جديدة</h5>
        {form}
      </div>
    )
  }
};
export default AddService;