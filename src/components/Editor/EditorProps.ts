import type { Dispatch, ReactNode, SetStateAction } from "react";
import type ReactQuill from "react-quill-new";
// import type { ReactQuillProps } from "react-quill";

export default interface QuilEditorProps  {
  editorLabel?: string | ReactNode;
  ref?: React.RefObject<ReactQuill>;
  withAiGenerator?: boolean;
  doubleInput?: boolean;
  errorMsg?: string;
  wrapperClassname?: string;
  extraQuilElement?: React.ReactNode;
  customComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  setIsEditorValid?: Dispatch<SetStateAction<boolean>>;
  onEditorChange: (value: string) => void | Dispatch<SetStateAction<string>>;
  placeholder?: string;
  id?: string;
  readOnly?: boolean;
}
