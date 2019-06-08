import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import { insertLink, removeLink, getLinkDetails } from "../Utils/hyperlink";

const Pop = props => {
  const { popoverOpen, position, onClose, editorState, onChange } = props;
  const { link, title } = getLinkDetails({ editorState });
  const [values, setValues] = useState({
    newLink: "",
    editMode: false
  });

  const { top, left = 0, height } = position;

  const topPos = top + height || 0;

  const onRemoveLink = () => {
    const esWithoutLink = removeLink({ editorState });
    onChange(esWithoutLink);
    resetAndClose();
  };

  const onEditClick = () => {
    setValues({ ...values, newLink: link, editMode: true });
  };

  const onSaveClick = () => {
    const linkValue = values.newLink;
    const linkTitle = title;
    const newEditorState = insertLink({ editorState, linkValue, linkTitle });
    onChange(newEditorState);
    resetAndClose();
  };
  const resetAndClose = () => {
    onClose();
    setValues({ ...values, newLink: link, editMode: false });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Popover
      id={"popover"}
      anchorReference="anchorPosition"
      anchorPosition={{ top: topPos, left }}
      open={popoverOpen}
      onClose={resetAndClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <div style={{ width: "300px" }}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            {link && !values.editMode && (
              <React.Fragment>
                <Icon
                  style={{
                    display: "inline-flex",
                    verticalAlign: "middle",
                    padding: "5px"
                  }}
                >
                  web
                </Icon>
                <a
                  href={link}
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ paddingLeft: "10px" }}
                  class="align-middle"
                >
                  {link}
                </a>
              </React.Fragment>
            )}
            {values.editMode && (
              <TextField
                value={values.newLink}
                onChange={handleChange("newLink")}
              />
            )}
          </Grid>
          {!values.editMode && (
            <Grid item>
              <IconButton onClick={onEditClick}>
                <Icon>edit</Icon>
              </IconButton>
              <IconButton onClick={onRemoveLink}>
                <Icon>link_off</Icon>
              </IconButton>
            </Grid>
          )}
          {values.editMode && (
            <Grid item>
              <IconButton onClick={onSaveClick}>
                <Icon>save</Icon>
              </IconButton>
              <IconButton onClick={resetAndClose}>
                <Icon>cancel</Icon>
              </IconButton>
            </Grid>
          )}
        </Grid>
      </div>
    </Popover>
  );
};

export default Pop;
