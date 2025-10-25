import React from "react";
import { Editor } from "react-draft-wysiwyg";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichEditor_draft_markdown = ({
    field,
    form,
}) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    React.useEffect(() => {
        if (form.dirty) {
            return;
        }
        // if (!field.value) {
        //     return;
        // }
        if (typeof field.value === 'object') {
            return;
        }

        const rawData = markdownToDraft(field.value);

        if (rawData) {
            const contentState = convertFromRaw(rawData)

            const editorState = EditorState.createWithContent(contentState);
            document.getElementById(`${field.name}RichVal`).innerText = field.value
            setEditorState(editorState);

        }
    }, [field.value, form.dirty,field.name]);

    const onEditorStateChange = editorState => {
        changeValue(editorState);
    };

    const changeValue = editorState => {
        setEditorState(editorState);

        form.setFieldValue(
            field.name,
            draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
        );





    };
    return (
        <div className="rtl" style={{ border: "1px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "#fff" }}>

            <Editor
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={editorState => {
                    onEditorStateChange(editorState)
                }}
                placeholder={"اكتب هنا"}

                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "list",
                        "link",
                        "remove",
                        "history"
                    ],
                    inline: {
                        options: ["bold", "italic", "strikethrough", "monospace"]
                    },
                }}
                id={field.name}
                name={field.name}
                onFocus={() => { }}
                onBlur={e => { document.getElementById(`${field.name}RichVal`).innerText = field.value}}
            />

        </div>

    );
};

export default RichEditor_draft_markdown;












