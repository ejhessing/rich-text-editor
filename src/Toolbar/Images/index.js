import React from "react";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
import { insertImage } from "../../Utils/image";

const Images = ({ editorState, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    src: "",
    altText: "",
    height: "auto",
    width: "auto"
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValues({
      altText: "",
      src: "",
      height: "auto",
      width: "auto"
    });
  };

  const onAddImage = e => {
    e.preventDefault();
    const { altText, src, width = "auto", height = "auto" } = values;
    const newEditorState = insertImage({
      editorState,
      altText,
      src,
      width,
      height
    });
    onChange(newEditorState);
    handleClose();
  };

  const onInputKeyDown = e => {
    const enterKey = 13;
    if (e.which === enterKey) {
      e.preventDefault();
      onAddImage(e);
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Image" placement="top">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Icon>{"image"}</Icon>
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Input
            label="Image url"
            placeholder="https://..."
            margin="normal"
            value={values.src}
            onChange={handleChange("src")}
          />
        </MenuItem>
        <MenuItem>
          <Input
            label="Alt text"
            placeholder=""
            onChange={handleChange("altText")}
            onKeyDown={onInputKeyDown}
            value={values.height}
            margin="normal"
          />
        </MenuItem>
        <MenuItem>
          <Input
            label="Height"
            placeholder="auto"
            onChange={handleChange("height")}
            value={values.altText}
            margin="normal"
            style={{ width: "80px", marginRight: "15px" }}
          />
          <Input
            label="Width"
            placeholder="auto"
            onChange={handleChange("width")}
            value={values.width}
            margin="normal"
            style={{ width: "80px" }}
          />
        </MenuItem>
        <MenuItem>
          <Button variant="contained" color="primary" onClick={onAddImage}>
            Save
          </Button>
          <Button
            variant="contained"
            style={{ margin: "20px" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Images;
