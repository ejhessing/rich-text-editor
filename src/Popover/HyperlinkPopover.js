import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { insertLink } from "../Utils/hyperlink";

const HyperlinkPopover = ({ editorState, onChange, setValues, values }) => {
  const [initialized, setInitialized] = useState(false);
  const [state, setState] = useState({
    linkValue: "",
    linkTitle: ""
  });

  useEffect(() => {
    if (!initialized) {
      setState({
        linkValue: values.linkValue,
        linkTitle: values.linkTitle
      });

      setInitialized(true);
    }
  }, [initialized, values]);

  const handleChange = name => e => {
    setState({ ...state, [name]: e.target.value });
  };

  const handleClose = () => {
    setValues({
      editMode: false
    });
  };

  const onAddLink = e => {
    e.preventDefault();
    const { linkValue, linkTitle } = state;
    const newEditorState = insertLink({ editorState, linkValue, linkTitle });
    onChange(newEditorState);

    setValues({
      linkValue: linkValue,
      linkTitle: linkTitle,
      editMode: false
    });
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
              label="Link title"
              placeholder="Title"
              margin="normal"
              value={state.linkTitle}
              onChange={handleChange("linkTitle")}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Link"
              placeholder="https://"
              onChange={handleChange("linkValue")}
              onKeyDown={onInputKeyDown}
              value={state.linkValue}
              margin="normal"
            />
          </Grid>
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
          <Button
            variant="contained"
            color="primary"
            onClick={onAddLink}
            disabled={isEmpty(values.linkValue)}
            style={{ paddingLeft: "20px" }}
          >
            Save
          </Button>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  );
};

export default HyperlinkPopover;
