"use client";

import "@wangeditor-next/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-react";
import { useIsMobile } from "@/hooks/useIsMobile";

import {
  IDomEditor,
  IToolbarConfig,
  IEditorConfig,
  i18nChangeLanguage,
} from "@wangeditor-next/editor";

const WYSIWYGEditor = ({
  editorState,
  setEditorState,
  fullList = true,
}: {
  editorState: IDomEditor | null;
  setEditorState: (val: IDomEditor) => void;
  fullList?: boolean;
}) => {
  const toolbarConfig: Partial<IToolbarConfig> = {};
  const { isMobile } = useIsMobile();
  i18nChangeLanguage("en-us");

  const getToolbarConfig = () => {
    const newToolbarConfig = [
      // menu key
      "bold",
      "numberedList",
      "emotion",
      {
        key: "group-more-style",
        title: "More",
        iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
        menuKeys: ["through", "code", "sup", "sub", "clearStyle"],
      },
      "underline",
      "italic",
      "bulletedList",
    ];
    if (fullList) {
      newToolbarConfig.push(
        "todo",
        "fontSize",
        "lineHeight",
        "headerSelect",
        "blockquote",
        {
          key: "group-image",
          title: "Image",
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
          menuKeys: ["insertImage"],
        },
        {
          key: "group-video",
          title: "Video",
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>',
          menuKeys: ["insertVideo"],
        },
        "insertLink",
        {
          key: "group-justify",
          title: "Justify",
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
          menuKeys: [
            "justifyLeft",
            "justifyRight",
            "justifyCenter",
            "justifyJustify",
          ],
        },
        {
          key: "group-indent",
          title: "Indent",
          iconSvg:
            '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
          menuKeys: ["indent", "delIndent"],
        }
      );
    }
    return newToolbarConfig;
  };

  toolbarConfig.toolbarKeys = getToolbarConfig();

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "Enter text here",
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        width: "auto",
        overflowY: "auto",
        zIndex: "10",
        marginBottom: "20px",
      }}
    >
      <Toolbar
        editor={editorState}
        defaultConfig={toolbarConfig}
        style={{
          borderBottom: "1px solid #ccc",
          maxHeight: "100%",
          overflowY: "none",
        }}
      />
      <Editor
        onCreated={setEditorState}
        defaultConfig={editorConfig}
        mode="default"
        // onChange={(editor) => setChatContent(editor.getHtml())}
        style={{
          height: fullList ? "130px" : "100px",
          width: isMobile ? "86vw" : fullList ? "71vw" : "320px",
        }}
      />
    </div>
  );
};

export default WYSIWYGEditor;
