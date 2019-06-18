import React from "react";

import Popover from "@material-ui/core/Popover";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import { colors } from "../../Constants/Toolbar";
import { addColor, removeColor } from "../../Utils/colors.js";
import { forceSelection } from "../../Utils/selected.js";

const ColorPicker = ({ editorState, onDropdownChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    color: ""
  });

  const onRemoveColor = () => {
    const newEditorState = removeColor({ editorState });
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
      const newEditorState = addColor({ editorState, value });
      onDropdownChange(newEditorState);
      setValues({ ...values, color: value });
    }
    handleClose();
  };
  const colorDivs = colors.map(({ name, type }) => {
    const isActive = values.color === name;
    const size = "25px";
    const shadow = isActive ? "0px 0px 0px 3px white inset" : "0px";
    return (
      <div
        onClick={() => updateColor(name)}
        key={type}
        style={{
          background: type,
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
        <React.Fragment>
          <div className="center">
            <Button onClick={onRemoveColor}>none</Button>
          </div>
          <div
            style={{
              width: "125px",
              paddingTop: "4px",
              paddingRight: "4px",
              paddingLeft: "4px"
            }}
          >
            {colorDivs}
          </div>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
};

export default ColorPicker;
