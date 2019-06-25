import React from "react";

import Popover from "@material-ui/core/Popover";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import { highlights } from "../../Constants/Toolbar";
import { addInlineStyle, removeInlineStyle } from "../../Utils/inlineStyles";
import { forceSelection } from "../../Utils/selected.js";

const Highlight = ({ editorState, onDropdownChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    highlight: ""
  });
  const type = "highlightColor";

  const onRemoveHighlight = () => {
    const newEditorState = removeInlineStyle({ editorState, type });
    onDropdownChange(newEditorState);
    setValues({
      highlight: ""
    });
    handleClose();
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateHighlight = value => {
    if (values.highlight === value) {
      const newEditorState = forceSelection({ editorState });
      onDropdownChange(newEditorState);
    } else {
      const newEditorState = addInlineStyle({
        editorState,
        value,
        type
      });
      onDropdownChange(newEditorState);
      setValues({ ...values, highlight: value });
    }
    handleClose();
  };

  const highlightDivs = highlights.map(({ name, type }) => {
    var currentStyle = editorState.getCurrentInlineStyle();
    const isActive = currentStyle.has(type);
    const size = "25px";
    const shadow = isActive ? "0px 0px 0px 3px white inset" : "0px";
    return (
      <div
        onClick={() => updateHighlight(type)}
        key={type}
        style={{
          background: name,
          height: size,
          width: size,
          display: "inline-flex",
          boxShadow: shadow
        }}
      />
    );
  });

  return (
    <React.Fragment>
      <Tooltip title="Highlight color" placement="top">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Icon>{"border_color"}</Icon>
        </IconButton>
      </Tooltip>
      <Popover
        id={"popover-color"}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <React.Fragment>
          <div className="center">
            <Button onClick={onRemoveHighlight}>none</Button>
          </div>
          <div
            style={{
              width: "125px",
              paddingTop: "4px",
              paddingRight: "4px",
              paddingLeft: "4px"
            }}
          >
            {highlightDivs}
          </div>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
};

export default Highlight;
