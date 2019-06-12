import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";

import { fontSizes } from "../../Constants/Toolbar";
import { addFontSizes } from "../../Utils/fonts.js";
import { forceSelection } from "../../Utils/selected.js";

const FontSize = ({ editorState, onDropdownChange }) => {
  const [values, setValues] = useState({
    fontSize: "FONTSIZE-12"
  });

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues(oldValues => ({
      ...oldValues,
      [name]: value
    }));
    if (values.fontSize === value) {
      const newEditorState = forceSelection({ editorState });
      onDropdownChange(newEditorState);
    } else {
      const newEditorState = addFontSizes({ editorState, value });
      onDropdownChange(newEditorState);
    }
  };

  return (
    <Tooltip title="Font size" placement="top">
      <FormControl style={{ minWidth: "60px", padding: "8px" }}>
        <Select value={values.fontSize} onChange={handleChange} name="fontSize">
          {fontSizes.map(({ name, size }) => {
            return (
              <MenuItem
                key={size}
                value={name}
                onMouseDown={e => e.preventDefault()}
              >
                {size}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default FontSize;
