import { TABLE_RESIZE, CHANGE_TEXT } from './types';

export const tableResize = (data) => ({
  type: TABLE_RESIZE,
  data
})

export const changeText = (text) => ({
  type: CHANGE_TEXT,
  data: text
})
