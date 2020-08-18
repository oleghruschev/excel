import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES } from './types';

export const tableResize = (data) => ({
  type: TABLE_RESIZE,
  data
})

export const changeText = (text) => ({
  type: CHANGE_TEXT,
  data: text
})

export const changeStyles = (data) => ({
  type: CHANGE_STYLES,
  data
})
