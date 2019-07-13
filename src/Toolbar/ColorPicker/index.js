import React from "react";

import Popover from "@material-ui/core/Popover";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import { colors } from "../../Constants/Toolbar";
import { addInlineStyle, removeInlineStyle } from "../../Utils/inlineStyles";
import { forceSelection } from "../../Utils/selected.js";

const ColorPicker = ({ editorState, onDropdownChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    color: ""
  });
  const type = "textColor";

  const onRemoveColor = () => {
    const newEditorState = removeInlineStyle({ editorState, type });
    onDropdownChange(newEditorState);
    setValues({
      color: ""
    });
    handleClose();
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateColor = value => {
    if (values.color === value) {
      const newEditorState = forceSelection({ editorState });
      onDropdownChange(newEditorState);
    } else {
      const newEditorState = addInlineStyle({
        editorState,
        value,
        type
      });
      onDropdownChange(newEditorState);
      setValues({ ...values, color: value });
    }
    handleClose();
  };
  const colorDivs = colors.map(({ name, type }) => {
    var currentStyle = editorState.getCurrentInlineStyle();
    const isActive = currentStyle.has(type);
    const size = "25px";
    const shadow = isActive ? "0px 0px 0px 3px white inset" : "0px";
    return (
      <div
        onClick={() => updateColor(type)}
        key={type}
        style={{
          background: name,
          height: size,
          width: size,
          display: "inline-flex",
          boxShadow: shadow,
          margin: "1px"
        }}
      />
    );
  });

  return (
    <React.Fragment>
      <Tooltip title="Text color" placement="top">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Icon>{"format_color_text"}</Icon>
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
        <div style={{ padding: "20px", background: "#f5f5f5" }}>
          <div className="center">
            <Button onClick={onRemoveColor}>none</Button>
          </div>
          <div
            style={{
              width: "135px",
              padding: "4px"
            }}
          >
            {colorDivs}
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default ColorPicker;
