import React from 'react';
import Button from "../ui-user/components/button/button"
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
} from 'formik';
import { FaDownload } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import EditorField from './RichEditor_draft_markdown';
import { TiDeleteOutline } from "react-icons/ti"


export function Form(props) {
    return (
        <Formik
            {...props}
            values
        >
            <FormikForm className="needs-validation " noValidate="">
                {props.children}
            </FormikForm>
        </Formik>)
}

export function TextField(props) {
    const { name, label, isRequired, placeholder, ...rest } = props
    return (
        < Col >
            {label && <label htmlFor={name} style={{ marginTop: "5px" }}>{label} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</label>}
            <Field required={isRequired ? true : false} style={{ border: "2px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "none" }}
                className="form-control"
                type="text"
                name={name}
                id={name}
                key={name}
                placeholder={placeholder || ""}
                {...rest}
            />

            <ErrorMessage name={name} render={msg => <div style={{ color: 'rgb(184, 148, 39)', fontSize: "smaller", textAlign: "center" }} >{msg}</div>} />
        </Col >
    )
}

export function TextAreaField(props) {
    const { name, label, isRequired, placeholder, ...rest } = props
    return (
        < Col >
            {label && <label htmlFor={name} style={{ marginTop: "5px" }}>{label} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</label>}
            <Field as="textarea" required={isRequired ? true : false} style={{ border: "2px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "none" }}
                className="form-control"
                type="text"
                name={name}
                id={name}
                key={name}
                placeholder={placeholder || ""}
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'rgb(184, 148, 39)', fontSize: "smaller", textAlign: "center" }} >{msg}</div>} />
        </Col >
    )
}
export function RichEditorField(props) {
    const { name, label, isRequired, ...rest } = props
    return (
        < Col >
            {label && <label htmlFor={name} style={{ marginTop: "5px" }}>{label} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</label>}
            <Field
                className="form-control "
                id={name}
                key={name}
                component={EditorField}
                name={name}
                label={`Write an ${name}`}
                placeholder="content here"
                {...rest}
            />
            <div style={{ height: "0px", overflow: "hidden" }}>
                <p id={`${name}RichVal`} ></p>
            </div>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'rgb(184, 148, 39)', fontSize: "smaller", textAlign: "center" }} >{msg}</div>} />
        </Col >
    )
}

export function FileField(props) {
    const { name, label, isRequired, attachment, imgval, handle_reset_img_value } = props
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    return (
        <Col >
            {label && <label htmlFor={name} style={{ marginTop: "5px" }}>{label} &nbsp; {isRequired ? <span style={{ color: "red" }}>*
            </span> : null}</label>}
            {!imgval
                ? null
                : imgval === ""
                    ? null
                    :typeof handle_reset_img_value !== 'function'
                        ? null
                        : <TiDeleteOutline type="button" onClick={() => {
                            document.getElementById(`${name}ImgVal`).innerText = ""
                            document.getElementById(`${name}ImgVal`).style.display = "none"
                            document.getElementById(name).value = "";
                            handle_reset_img_value(name)
                        }} />

            }

            {!attachment
                ? null
                : attachment === ""
                    ? null
                    : <a download={name} target="_blank" rel="noreferrer" href={attachment}><FaDownload style={{ color: "rgb(0, 27, 57)" }} /></a>
            }
            {imgval === ""
                ? <div style={{ fontSize: "16px" }}>
                    <a id={`${name}ImgVal`} download={`${name}.png`} target="_blank" rel="noreferrer" href="http://www.alrashidi.sy/"> </a>
                </div>
                : <div style={{ fontSize: "16px" }}>
                    <a id={`${name}ImgVal`} download={`${name}.png`} target="_blank" rel="noreferrer" href={imgval}>🗀</a>
                </div>

            }

            <Field name={name} id={name}>
                {({ field, form }) => {
                    return (<>
                        <input
                            required={isRequired ? true : false}
                            type={'file'}
                            accept="image/*"
                            placeholder="m"
                            id={field.name}
                            onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                if (file) {
                                    getBase64(file).then(
                                        (incodedData) => {
                                            form.setFieldValue(name, incodedData);
                                            document.getElementById(`${name}ImgVal`).style.display = "inline"
                                            document.getElementById(`${field.name}ImgVal`).href = incodedData;
                                        });
                                }
                            }}

                            className={'form-control  text-center uploadInputFile'}

                            name={name}
                            style={{ border: "2px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "none" }} />

                    </>)
                }}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'rgb(184, 148, 39)', fontSize: "smaller", textAlign: "center" }} >{msg}</div>} />
        </Col >
    )
}

export function DateField(props) {
    const { name, label, isRequired, ...rest } = props

    return (
        <Col >
            {label && <label htmlFor={name} style={{ marginTop: "5px" }}>{label} &nbsp; {isRequired ? <span style={{ color: "red" }}>*</span> : null}</label>}
            <Field
                className="form-control"
                name={name}
                id={name}
                key={name}
                {...rest}>
                {({ field, form }) => {
                    return (
                        <input
                            type={'date'}
                            onChange={(e) => { form.setFieldValue(name, e.currentTarget.value); }}
                            value={field.value}
                            required={isRequired ? true : false}
                            className={'form-control  text-center dateField'}
                            style={{ border: "2px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "none" }} />
                    )
                }}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'rgb(184, 148, 39)', fontSize: "smaller", textAlign: "center" }} >{msg}</div>} />
        </Col>
    )
}
export function NumberField(props) {
    const { name, label, isRequired, ...rest } = props
    return (
        <Col >
            {label && <label htmlFor={name} style={{ marginTop: "5px" }}>{label} &nbsp; {isRequired ? <span style={{ color: "red" }}>*</span> : null}</label>}

            <Field
                className="form-control"
                name={name}
                id={name}
                key={name}
                {...rest}
            >
                {({ field, form }) => {
                    return (
                        <input
                            type={'number'}
                            id={name}
                            onChange={(e) => { form.setFieldValue(name, e.currentTarget.value); }}
                            value={field.value}
                            required={isRequired ? true : false}
                            className={'form-control  numberField'}
                            style={{ border: "2px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "none" }}
                        />
                    )
                }}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'rgb(184, 148, 39)', fontSize: "smaller", textAlign: "center" }} >{msg}</div>} />
        </Col>
    )
}
export function SelectField(props) {
    const { t } = useTranslation();
    const { name, label, isRequired, options } = props
    return (
        <Col >
            {label && <label htmlFor={name} style={{ marginTop: "5px" }} >{label} {isRequired ? <span style={{ color: "red" }}>*</span> : null}</label>}
            <Field style={{ border: "2px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "none", width: "100%", padding: "7px" }}
                as="select"
                id={name}
                key={name}
                name={name}
                required={isRequired ? true : false}
            >
                <option value="" >{t("form.choose")}</option>
                {options.map((optn, index) => <option value={optn.value} key={index} label={optn.label || optn.value} />)}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'rgb(184, 148, 39)', fontSize: "smaller", textAlign: "center" }} >{msg}</div>} />
        </Col>
    )
}

export function SubmitButton(props) {
    const { title, ...rest } = props;
    const [isButtonLoading, setIsButtonLoading] = React.useState(false);

    const { isSubmitting } = useFormikContext();
    return (
        <div style={{ clear: 'both' }}>
            <div id="additionalErrors" className="additionalErrors" style={{ color: 'rgb(184, 148, 39)', margin: "10px" }}></div>
            <Button
                type="submit"
                onClick={() => {
                    setIsButtonLoading(true);
                    setTimeout(() => {
                        setIsButtonLoading(false);
                    }, 1000);
                }}
                isLoading={isButtonLoading}
                disabled={isSubmitting}
                {...rest}
                style={{ marginTop: "20px" }} >{title} </Button>
            <div id="submitNote"></div>
        </div>
    )
}
