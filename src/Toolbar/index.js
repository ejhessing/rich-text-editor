import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ToolbarGroup from "@material-ui/core/Toolbar";

import FontFamily from "./FontFamily/index.js";
import FontSize from "./FontSize/index.js";
import FontStyles from "./FontStyles/index.js";
import ListStyles from "./ListStyles/index.js";
import Hyperlink from "./Hyperlink/index.js";
import Images from "./Images/index.js";
import TextAlignment from "./TextAlignment/index.js";
import ColorPicker from "./ColorPicker/index.js";
import Highlight from "./Highlight/index.js";

const Separator = () => (
  <div
    style={{
      paddingRight: "25px"
    }}
  />
);

const MyToolbar = ({ onChange, editorState, onDropdownChange }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar className="toolbar">
        <ToolbarGroup>
          <FontFamily
            editorState={editorState}
            onDropdownChange={onDropdownChange}
          />
          <FontSize
            editorState={editorState}
            onDropdownChange={onDropdownChange}
          />
          <Separator />
          <FontStyles onChange={onChange} editorState={editorState} />
          <Separator />
          {/* </Separator> */}
          <ColorPicker
            editorState={editorState}
            onDropdownChange={onDropdownChange}
          />
          <Highlight
            editorState={editorState}
            onDropdownChange={onDropdownChange}
          />
          <Separator />

          <ListStyles onChange={onChange} editorState={editorState} />
          <Separator />

          <Hyperlink onChange={onChange} editorState={editorState} />
          <Images onChange={onChange} editorState={editorState} />
          <Separator />

          <TextAlignment onChange={onChange} editorState={editorState} />
        </ToolbarGroup>
      </Toolbar>
    </AppBar>
  );
};

export default MyToolbar;
