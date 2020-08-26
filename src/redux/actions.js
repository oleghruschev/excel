import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE
} from './types';

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

export const setTitle = (data) => ({
  type: CHANGE_TITLE,
  data
})

export const updateDate = () => ({
  type: UPDATE_DATE
})
