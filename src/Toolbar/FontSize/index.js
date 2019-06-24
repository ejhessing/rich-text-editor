import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";

import { fontSizes } from "../../Constants/Toolbar";
import { addInlineStyle } from "../../Utils/inlineStyles";

const FontSize = ({ editorState, onDropdownChange }) => {
  const [values, setValues] = useState({
    fontSize: "FONTSIZE-12"
  });
  const type = "fontSizes";

  const handleChange = event => {
    const { name, value } = event.target;
    setValues(oldValues => ({
      ...oldValues,
      [name]: value
    }));

    const newEditorState = addInlineStyle({ editorState, value, type });
    onDropdownChange(newEditorState);
  };

  return (
    <Tooltip title="Font size" placement="top">
      <FormControl style={{ minWidth: "60px", padding: "8px" }}>
        <Select value={values.fontSize} onChange={handleChange} name="fontSize">
          {fontSizes.map(({ name, type }) => {
            return (
              <MenuItem key={type} value={type}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default FontSize;
