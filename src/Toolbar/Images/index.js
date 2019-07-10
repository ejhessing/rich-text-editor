import React from "react";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";

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
      <Popover
        id={"popover-images"}
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
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            <Grid item>
              <TextField
                label="Image url"
                placeholder="https://..."
                margin="normal"
                value={values.src}
                onChange={handleChange("src")}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Alt text"
                placeholder=""
                onChange={handleChange("altText")}
                onKeyDown={onInputKeyDown}
                value={values.altText}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <TextField
              label="Height"
              placeholder="auto"
              onChange={handleChange("height")}
              value={values.height}
              margin="normal"
              style={{ width: "80px", marginRight: "20px" }}
            />
            <TextField
              label="Width"
              placeholder="auto"
              onChange={handleChange("width")}
              value={values.width}
              margin="normal"
              style={{ width: "80px" }}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{
              paddingRight: "20px",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          >
            <Button
              variant="contained"
              onClick={handleClose}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onAddImage}>
              Save
            </Button>
          </Grid>
        </React.Fragment>
      </Popover>
    </React.Fragment>
  );
};

export default Images;
