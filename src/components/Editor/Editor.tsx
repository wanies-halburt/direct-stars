"use client"

import "react-quill-new/dist/quill.snow.css";

import imageCompressor from "quill-image-compress";
import type { FC } from "react";
import ReactQuill, { Quill } from "react-quill-new";

import { quillFormatsLimited, quillToolbarLimited } from "./EditorConfig";
import type EditorProps from "./EditorProps";

Quill.register({ "modules/imageCompress": imageCompressor }, true);

const Editor: FC<EditorProps> = ({
  editorLabel,
  wrapperClassname,
  errorMsg,
  setIsEditorValid,
  onEditorChange,
  id,
  ref,
  customComponent,
  placeholder,
  readOnly,
  bottomComponent,
  ...rest
}) => {
  const inputId = placeholder?.split(" ").join("-");

  const customToolbar = (
    <div id="toolbar">
      <select className="ql-header" defaultValue="">
        <option value="1"></option>
        <option value="2"></option>
        <option value=""></option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-underline"></button>
      <button className="ql-italic"></button>
      <button className="ql-strike"></button>
      <button className="ql-link"></button>
      <button className="ql-align" value=""></button>
      <button className="ql-align" value="center"></button>
      <button className="ql-align" value="right"></button>
      <button className="ql-align" value="justify"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
    </div>
  );

  return (
    <fieldset
      className={`mep_editor_wrapper${wrapperClassname ? ` ${wrapperClassname}` : ""}${errorMsg ? " error_state" : ""}`}
    >
      {editorLabel ? (
        <label className="mep_editor_label txt-14" htmlFor={id ?? inputId}>
          {(editorLabel || id) ?? inputId}
        </label>
      ) : null}

        {customToolbar}
        {customComponent}
        <ReactQuill
          theme="snow"
          {...rest}
          modules={{
            toolbar: customComponent
              ? {
                  container: "#toolbar",
                }
              : quillToolbarLimited,
            imageCompress: {
              quality: 0.7, // default
              maxWidth: 700, // default
              maxHeight: 600, // default
              imageType: "image/jpeg", // default
              debug: true, // default
            },
          }}
          ref={ref}
          formats={quillFormatsLimited}
          preserveWhitespace
          bounds={".mep_editor"}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={(v, _d, _s, e) => {
            onEditorChange(v);
            if (setIsEditorValid) {
              const isEditorValid = e.getLength() > 1 && e.getText() !== "\n";
              setIsEditorValid(isEditorValid);
            }
          }}
        />
        {bottomComponent ?? null}

      {errorMsg ? <span className="mep_editor_errormsg txt-14">{errorMsg}</span> : null}
    </fieldset>
  );
};

export default Editor;
