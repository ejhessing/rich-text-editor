export const fontStyles = [
  { type: "BOLD", icon: "format_bold", hint: "Bold (⌘B)" },
  { type: "ITALIC", icon: "format_italic", hint: "Italic (⌘I)" },
  { type: "UNDERLINE", icon: "format_underline", hint: "Underline (⌘U)" }
];

export const listStyles = [
  {
    type: "ordered-list-item",
    icon: "format_list_numbered",
    hint: "Ordered list (⌘⇧7)"
  },
  {
    type: "unordered-list-item",
    icon: "format_list_bulleted",
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
    size: "16",
    name: "FONTSIZE-16"
  },

  {
    size: "20",
    name: "FONTSIZE-20"
  },
  {
    size: "24",
    name: "FONTSIZE-24"
  },
  {
    size: "30",
    name: "FONTSIZE-30"
  }
];

export const fontFamily = [
  {
    name: "FONT-ARIAL",
    type: "Arial"
  },
  {
    name: "FONT-TIMES-NEW-ROMAN",
    type: "Times New Roman"
  },
  {
    name: "FONT-COMIC-SANS-MS",
    type: "Comic Sans MS"
  },
  {
    name: "FONT-COURIER-NEW",
    type: "Courier New"
  },
  {
    name: "FONT-IMPACT",
    type: "Impact"
  }
];

export const colors = [
  {
    name: "COLOR-BLACK",
    type: "black"
  },
  {
    name: "COLOR-RED",
    type: "red"
  },
  {
    name: "COLOR-BLUE",
    type: "blue"
  },
  {
    name: "COLOR-PURPLE",
    type: "purple"
  },
  {
    name: "COLOR-PINK",
    type: "pink"
  },
  {
    name: "COLOR-YELLOW",
    type: "yellow"
  },
  {
    name: "COLOR-GOLD",
    type: "gold"
  },
  {
    name: "COLOR-ORANGE",
    type: "orange"
  },
  {
    name: "COLOR-TEAL",
    type: "teal"
  },
  {
    name: "COLOR-GREEN",
    type: "green"
  }
];

export const styleMap = {
  "FONTSIZE-12": {
    fontSize: "12px"
  },
  "FONTSIZE-16": {
    fontSize: "16px"
  },
  "FONTSIZE-20": {
    fontSize: "20px"
  },
  "FONTSIZE-24": {
    fontSize: "24px"
  },
  "FONTSIZE-30": {
    fontSize: "30px"
  },
  "FONT-ARIAL": {
    fontFamily: "Arial"
  },
  "FONT-TIMES-NEW-ROMAN": {
    fontFamily: "Times New Roman"
  },
  "FONT-COMIC-SANS-MS": {
    fontFamily: "Comic Sans MS"
  },
  "FONT-COURIER-NEW": {
    fontFamily: "Courier New"
  },
  "FONT-IMPACT": {
    fontFamily: "Impact"
  },
  "COLOR-BLACK": {
    color: "black"
  },
  "COLOR-RED": {
    color: "red"
  },
  "COLOR-BLUE": {
    color: "blue"
  },
  "COLOR-GREEN": {
    color: "green"
  },
  "COLOR-YELLOW": {
    color: "yellow"
  },
  "COLOR-PURPLE": {
    color: "purple"
  },
  "COLOR-ORANGE": {
    color: "orange"
  },
  "COLOR-PINK": {
    color: "pink"
  },
  "COLOR-TEAL": {
    color: "teal"
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
