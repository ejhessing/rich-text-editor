import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";

import { fontFamily } from "../../Constants/Toolbar";
import { addInlineStyle } from "../../Utils/inlineStyles";

const FontSize = ({ editorState, onDropdownChange }) => {
  const [values, setValues] = useState({
    fontFamily: "FONT-ARIAL"
  });

  const type = "fontFamily";

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
    <Tooltip title="Font family" placement="top">
      <FormControl style={{ width: "120px", padding: "8px" }}>
        <Select
          value={values.fontFamily}
          onChange={handleChange}
          name="fontFamily"
        >
          {fontFamily.map(({ name, type }) => {
            return (
              <MenuItem key={type} value={type}>
                <span style={{ fontFamily: name }}>{name}</span>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default FontSize;
