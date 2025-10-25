import React from "react";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichEditor_draft_html = ({
  field,
  form,
  placeholder,
}) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  React.useEffect(() => {
    if (form.dirty) {
      return;
    }
    if (!field.value) {
      return;
    }
    if (typeof field.value=== 'object') {
        return;
      }

    const contentBlock = htmlToDraft(field.value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [field.value, form.dirty]);

  const onEditorStateChange = editorState => {
    changeValue(editorState);
  };

  const changeValue = editorState => {
    setEditorState(editorState);
    form.setFieldValue(
      field.name,
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };
  return (
      <div style={{ border: "2px solid rgb(0, 27, 57)", borderRadius: "0px", color: "rgb(0, 27, 57)", background: "none" }}>
        <Editor
          editorState={editorState}
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={editorState => onEditorStateChange(editorState)}
          placeholder={placeholder}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "link",
              "embedded",
              "remove",
              "history"
            ]
          }}
          name={field.name}
          id={field.name}
          onFocus={() =>{}}
          onBlur={e => {
            field.onBlur(e);
          }}
        />
      </div>
  );
};

export default RichEditor_draft_html;
