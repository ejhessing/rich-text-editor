import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { CompositeDecorator, Editor, EditorState } from "draft-js";
import hyperlinkDecorator from "../Decorators/Hyperlinks";
import Toolbar from "../Toolbar";

const setDecorators = () => {
  return new CompositeDecorator([hyperlinkDecorator]);
};

const MyEditor = props => {
  const emptyState = EditorState.createEmpty(setDecorators());
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
