import React, { useState } from "react";
import FontStyles from "./FontStyles.js";
import BlockStyles from "./BlockStyles/index.js";

const Toolbar = ({ onChange, editorState }) => {
  return (
    <div style={{ background: "blue", minHeight: "30px" }}>
      <FontStyles onChange={onChange} editorState={editorState} />
      <BlockStyles onChange={onChange} editorState={editorState} />
    </div>
  );
};

export default Toolbar;
