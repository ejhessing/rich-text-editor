export const fontStyles = [
  { type: "BOLD", icon: "format_bold", hint: "Bold (⌘B)" },
  { type: "ITALIC", icon: "format_italic", hint: "Italic (⌘I)" },
  { type: "UNDERLINE", icon: "format_underline", hint: "Underline (⌘U)" }
];

export const listStyles = [
  {
    type: "ordered-list-item",
    icon: "format_list_bulleted",
    hint: "Ordered list (⌘⇧7)"
  },
  {
    type: "unordered-list-item",
    icon: "format_list_numbered",
    hint: "Unordered list (⌘⇧8)"
  }
];

export const textAlignment = [
  {
    type: "LEFT-ALIGN",
    icon: "format_align_left",
    hint: "Left align (⌘+Shift+L)"
  },
  {
    type: "CENTER-ALIGN",
    icon: "format_align_center",
    hint: "Center align (⌘+Shift+E)"
  },
  {
    type: "RIGHT-ALIGN",
    icon: "format_align_right",
    hint: "Right align (⌘+Shift+R)"
  },
  {
    type: "JUSTIFY-ALIGN",
    icon: "format_align_justify",
    hint: "Justify (⌘+Shift+J)"
  }
];

export const fontSizes = [
  {
    size: "12",
    name: "FONTSIZE-12"
  },
  {
    size: "14",
    name: "FONTSIZE-14"
  },
  {
    size: "16",
    name: "FONTSIZE-16"
  },
  {
    size: "18",
    name: "FONTSIZE-18"
  },
  {
    size: "20",
    name: "FONTSIZE-20"
  }
];

export const styleMap = {
  "FONTSIZE-12": {
    fontSize: "12px"
  },
  "FONTSIZE-14": {
    fontSize: "14px"
  },
  "FONTSIZE-16": {
    fontSize: "16px"
  },
  "FONTSIZE-18": {
    fontSize: "18px"
  },
  "FONTSIZE-20": {
    fontSize: "20px"
  }
};

export const blockMap = type => {
  switch (type) {
    case "LEFT-ALIGN":
      return "leftAlign";
    case "RIGHT-ALIGN":
      return "rightAlign";
    case "CENTER-ALIGN":
      return "centerAlign";
    case "JUSTIFY-ALIGN":
      return "justifyAlign";
    default:
      return "";
  }
};
