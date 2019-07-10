import React, { useEffect, useState } from "react";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import HyperlinkPopover from "./HyperlinkPopover.js";

import { removeLink, getLinkDetails } from "../Utils/hyperlink";

const Pop = props => {
  const { popoverOpen, position, onClose, editorState, onChange } = props;

  const [values, setValues] = useState({
    linkValue: "",
    linkTitle: "",
    editMode: false
  });

  const { top, left = 0, height } = position;

  const topPos = top + height || 0;

  useEffect(() => {
    if (!values.linkTitle) {
      const { link, title } = getLinkDetails({ editorState });

      setValues({
        ...values,
        linkValue: values.linkValue || link,
        linkTitle: values.linkTitle || title
      });
    }
  }, [editorState, values]);

  const onRemoveLink = () => {
    const esWithoutLink = removeLink({ editorState });
    onChange(esWithoutLink);
    resetAndClose();
  };

  const onEditClick = e => {
    setValues({ ...values, editMode: true });
  };

  const resetAndClose = () => {
    onClose();
    setValues({
      ...values,
      linkValue: "",
      linkTitle: "",
      editMode: false
    });
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
      <Grid container alignItems="center">
        {values.linkValue && !values.editMode && (
          <Grid item style={{ width: "150px" }}>
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
                href={values.linkValue}
                rel="noopener noreferrer"
                target="_blank"
                style={{ paddingLeft: "10px" }}
                className="align-middle"
              >
                {values.linkValue}
              </a>
            </React.Fragment>
          </Grid>
        )}
        {values.editMode && (
          <Grid item>
            <HyperlinkPopover
              onChange={onChange}
              editorState={editorState}
              values={values}
              setValues={setValues}
            />
          </Grid>
        )}
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
      </Grid>
    </Popover>
  );
};

export default Pop;
