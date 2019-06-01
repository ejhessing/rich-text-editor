import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToolbarGroup from "@material-ui/core/Toolbar";
import ToolbarSeparator from "@material-ui/core/Toolbar";
import FontStyles from "./FontStyles.js";
import BlockStyles from "./BlockStyles/index.js";

const MyToolbar = ({ onChange, editorState }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ background: "lightblue", minHeight: "30px" }}>
        <ToolbarGroup>
          <FontStyles onChange={onChange} editorState={editorState} />
          <ToolbarSeparator style={{ height: "25px" }} />
          <BlockStyles onChange={onChange} editorState={editorState} />
        </ToolbarGroup>
      </Toolbar>
    </AppBar>
  );
};

export default MyToolbar;
