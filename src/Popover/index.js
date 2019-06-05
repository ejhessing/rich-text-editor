import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const Pop = props => {
  const { popoverOpen, position, onClose } = props;
  const { top, left = 0, height } = position;

  const topPos = top + height || 0;

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
      <Typography>The content of the Popover.</Typography>
    </Popover>
  );
};

export default Pop;
