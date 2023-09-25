import React, { memo, useCallback } from "react";
import { json } from "@codemirror/lang-json";
import { bracketMatching } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";

export const themeOverwrite = EditorView.theme({
  ".cm-activeLine": {
    backgroundColor: "transparent!important",
  },
  ".cm-gutterElement.cm-activeLineGutter": {
    backgroundColor: "transparent!important",
    color: "#f15998",
  },
});

export interface EditorProps {
  setEditorContent: (doc: string) => void;
  initialContent: string;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({
  setEditorContent,
  initialContent,
  className,
}) => {
  const onEditorChange = useCallback((value: string) => {
    setEditorContent(value);
  }, []);

  return (
    <CodeMirror
      className={className}
      value={initialContent}
      extensions={[
        bracketMatching(),
        json(),
        themeOverwrite,
        EditorView.lineWrapping,
      ]}
      height="100%"
      theme={vscodeDark}
      onChange={onEditorChange}
    />
  );
};

export default memo(Editor);
