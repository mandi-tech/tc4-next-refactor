export interface Dimensions {
  height?: string;
  width?: string;
  margin?: string;
  padding?: string;
}

export interface Colors {
  backgroundColor?: string;
  color?: string;
}

export interface Border {
  border?: string;
  borderRadius?: string;
}

export interface Fonts {
  fontSize?: string;
  fontWeight?: string | number;
  fontFamily?: string;
  textAlign?: "left" | "right" | "center" | "justify";
}

export interface Styles extends Dimensions, Colors, Fonts, Border {}
