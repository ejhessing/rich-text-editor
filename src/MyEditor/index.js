import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { Editor, EditorState } from "draft-js";
import decorator from "../Decorators";
import Toolbar from "../Toolbar";
import Pop from "../Popover";
import { getPosition, getSelected } from "../Utils";
import { styleMap } from "../Constants/Toolbar";

const MyEditor = props => {
  const [initialized, setInitialized] = useState(false);

  const myEditorRef = React.createRef();
  const emptyState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(emptyState);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [position, setPosition] = useState({});
  const onPopoverClose = () => {
    setPopoverOpen(false);
  };
  const onPopoverOpen = () => {
    const selected = getSelected();

    if (selected.rangeCount > 0) {
      setTimeout(() => {
        setPosition(getPosition(selected));
        setPopoverOpen(true);
      }, 1);
    }
  };

  useEffect(() => {
    if (!initialized) {
      setEditorState(
        EditorState.set(editorState, {
          decorator: decorator({
            clickLink: onPopoverOpen
          })
        })
      );

      setInitialized(true);
    }
  }, [editorState, initialized]);

  const onChange = editorState => {
    setEditorState(editorState);
  };
  const editorFocus = () => {
    myEditorRef.current.focus();
  };

  const onDropdownChange = editorState => {
    editorFocus();
    setTimeout(() => {
      onChange(editorState);
    }, 0);
  };

  return (
    <div
      style={{
        background: "lightgray",
        minHeight: "250px"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          onChange={onChange}
          editorState={editorState}
          onDropdownChange={onDropdownChange}
        />
        <div
          onClick={editorFocus}
          style={{ background: "white", minHeight: "250px", padding: "25px" }}
        >
          <Editor
            editorState={editorState}
            onChange={onChange}
            ref={myEditorRef}
            customStyleMap={styleMap}
          />
        </div>

        <Pop
          onClose={onPopoverClose}
          popoverOpen={popoverOpen}
          position={position}
          editorState={editorState}
          onChange={onChange}
        />
      </Container>
    </div>
  );
};

export default MyEditor;
