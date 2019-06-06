import React from "react";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { insertLink } from "./hyperlinkUtils";

const Hyperlink = ({ editorState, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    linkTitle: "",
    linkValue: ""
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
      linkValue: "",
      linkTitle: ""
    });
  };

  const onAddLink = e => {
    e.preventDefault();
    const { linkValue, linkTitle } = values;
    const newEditorState = insertLink({ editorState, linkValue, linkTitle });
    onChange(newEditorState);
    setValues({
      linkValue: "",
      linkTitle: ""
    });
    setAnchorEl(null);
  };

  const onInputKeyDown = e => {
    const enterKey = 13;
    if (e.which === enterKey) {
      e.preventDefault();
      onAddLink(e);
    }
  };

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
            label="Link title"
            placeholder="Title"
            margin="normal"
            value={values.linkTitle}
            onChange={handleChange("linkTitle")}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            label="Link"
            placeholder="https://"
            onChange={handleChange("linkValue")}
            onKeyDown={onInputKeyDown}
            value={values.linkValue}
            margin="normal"
          />
        </MenuItem>
        <MenuItem>
          <Button variant="contained" color="primary" onClick={onAddLink}>
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

export default Hyperlink;
