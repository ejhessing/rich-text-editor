import React from "react";
import { isEmpty } from "lodash";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";

import { insertLink } from "../../Utils/hyperlink";

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
      <Tooltip title="Insert link...(⌘K)" placement="top">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Icon>{"insert_link"}</Icon>
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
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <TextField
                label="Link title"
                placeholder="Title"
                margin="normal"
                value={values.linkTitle}
                onChange={handleChange("linkTitle")}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Link"
                placeholder="https://"
                onChange={handleChange("linkValue")}
                onKeyDown={onInputKeyDown}
                value={values.linkValue}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={onAddLink}
              disabled={isEmpty(values.linkValue)}
            >
              Save
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
};

export default Hyperlink;
