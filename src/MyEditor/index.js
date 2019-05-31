import React, { useState } from "react";

import { Editor, EditorState } from "draft-js";
import Toolbar from "../Toolbar";

const MyEditor = props => {
  const emptyState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(emptyState);

  const onChange = editorState => {
    setEditorState(editorState);
  };

  return (
    <div style={{ background: "lightgray", minHeight: "250px" }}>
      <Toolbar onChange={onChange} editorState={editorState} />
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default MyEditor;
