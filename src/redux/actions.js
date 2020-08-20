import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE } from './types';

export const tableResize = (data) => ({
  type: TABLE_RESIZE,
  data,
});

export const changeText = (text) => ({
  type: CHANGE_TEXT,
  data: text,
});

export const changeStyles = (data) => ({
  type: CHANGE_STYLES,
  data,
});

// value ids
export const applyStyle = (data) => ({
  type: APPLY_STYLE,
  data,
});
