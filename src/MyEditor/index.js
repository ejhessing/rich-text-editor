import React, { useState } from "react";
import Container from "@material-ui/core/Container";
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
      <Container maxWidth="lg">
        <Toolbar onChange={onChange} editorState={editorState} />
        <div
          style={{ background: "white", minHeight: "250px", padding: "25px" }}
        >
          <Editor editorState={editorState} onChange={onChange} />
        </div>
      </Container>
    </div>
  );
};

export default MyEditor;
