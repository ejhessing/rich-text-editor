import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import { removeLink, getLink } from "../Toolbar/Hyperlink/hyperlinkUtils";

const Pop = props => {
  const { popoverOpen, position, onClose, editorState, onChange } = props;
  const { top, left = 0, height } = position;

  const topPos = top + height || 0;
  const url = getLink({ editorState });

  const onRemoveLink = () => {
    const esWithoutLink = removeLink({ editorState });
    onChange(esWithoutLink);
    onClose();
  };

  return (
    <Popover
      id={"popover"}
      anchorReference="anchorPosition"
      anchorPosition={{ top: topPos, left }}
      open={popoverOpen}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <div>
        {url}
        <IconButton>
          <Icon>edit</Icon>
        </IconButton>
        <span style={{ borderRight: "0.1em solid black" }} />
        <IconButton onClick={onRemoveLink}>
          <Icon>link_off</Icon>
        </IconButton>
      </div>
    </Popover>
  );
};

export default Pop;
