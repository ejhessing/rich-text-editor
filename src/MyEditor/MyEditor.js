import React, { useState } from "react";

import { Editor, EditorState } from "draft-js";

function MyEditor() {
  const emptyState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(emptyState);

  const onChange = editorState => {
    setEditorState(editorState);
  };

  return (
    <div style={{ background: "lightgray", minHeight: "250px" }}>
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
}

export default MyEditor;
