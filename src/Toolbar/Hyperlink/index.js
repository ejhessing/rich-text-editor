import React from "react";
import { RichUtils } from "draft-js";

import { fontStyles } from "../../Constants/Toolbar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const Hyperlink = ({ editorState, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    linkTitle: "",
    url: ""
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const insertLink = () => {};

  const removeLink = () => {};

  return (
    <React.Fragment>
      <IconButton
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>{"insert_link"}</Icon>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <TextField
            id="standard-uncontrolled"
            label="Link title"
            placeholder="Title"
            margin="normal"
            value={values.linkTitle}
            onChange={handleChange("linkTitle")}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="standard-uncontrolled"
            label="Link"
            placeholder="https://"
            onChange={handleChange("url")}
            value={values.url}
            margin="normal"
          />
        </MenuItem>
        <MenuItem>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button variant="contained" style={{ margin: "20px" }}>
            Cancel
          </Button>{" "}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Hyperlink;
