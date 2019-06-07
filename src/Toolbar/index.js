import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToolbarGroup from "@material-ui/core/Toolbar";
import ToolbarSeparator from "@material-ui/core/Toolbar";
import FontSize from "./FontSize/index.js";
import FontStyles from "./FontStyles/index.js";
import BlockStyles from "./BlockStyles/index.js";
import Hyperlink from "./Hyperlink/index.js";

const MyToolbar = ({ onChange, editorState, onDropdownChange }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ background: "lightblue", minHeight: "30px" }}>
        <ToolbarGroup>
          <FontSize
            editorState={editorState}
            onDropdownChange={onDropdownChange}
          />
          <ToolbarSeparator style={{ height: "25px" }} />
          <FontStyles onChange={onChange} editorState={editorState} />
          <ToolbarSeparator style={{ height: "25px" }} />
          <BlockStyles onChange={onChange} editorState={editorState} />
          <ToolbarSeparator style={{ height: "25px" }} />
          <Hyperlink onChange={onChange} editorState={editorState} />
        </ToolbarGroup>
      </Toolbar>
    </AppBar>
  );
};

export default MyToolbar;
