import React, { memo, useCallback } from "react";
import { json } from "@codemirror/lang-json";
import { bracketMatching } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day";
import CodeMirror from "@uiw/react-codemirror";

export interface EditorProps {
  setEditorContent: (doc: string) => void;
  initialContent: string;
  className?: string;
  theme?: string;
}

const Editor: React.FC<EditorProps> = ({
  setEditorContent,
  initialContent,
  className,
  theme = "dark",
}) => {
  const onEditorChange = useCallback((value: string) => {
    setEditorContent(value);
  }, []);
  const isDarkMode = theme === "dark";

  return (
    <CodeMirror
      className={className}
      value={initialContent}
      extensions={[bracketMatching(), json(), EditorView.lineWrapping]}
      height="100%"
      theme={isDarkMode ? tokyoNight : tokyoNightDay}
      onChange={onEditorChange}
    />
  );
};

export default memo(Editor);
