import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { Editor, EditorState } from "draft-js";
import decorator from "../Decorators";
import Toolbar from "../Toolbar";
import Pop from "../Popover";
import { getPosition, getSelected } from "../Utils";
import { blockMap } from "../Constants/blocks";
import { styleMap } from "../Constants/styles";
import { keyBindingFn, handleKeyShortcuts } from "../Utils/keyBindings";

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

  const blockStyleFn = contentBlock => {
    const type = contentBlock.getType();
    return blockMap(type);
  };

  const onDropdownChange = editorState => {
    editorFocus();
    setTimeout(() => {
      onChange(editorState);
    }, 0);
  };

  const handleKeyCommand = (command, editorState) => {
    const updatedEditorState = handleKeyShortcuts({
      command,
      editorState
    });

    if (updatedEditorState) {
      onChange(updatedEditorState);
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Toolbar
          onChange={onChange}
          editorState={editorState}
          onDropdownChange={onDropdownChange}
        />
        <div onClick={editorFocus} className="editor">
          <Editor
            editorState={editorState}
            onChange={onChange}
            ref={myEditorRef}
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
            keyBindingFn={keyBindingFn}
            handleKeyCommand={handleKeyCommand}
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
