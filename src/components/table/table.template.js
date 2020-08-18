import {defaultStyles} from '@/constants'
import {camelToDashCase} from '@/core/utils'

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id] || ''
    const styles = Object.keys(defaultStyles)
        .map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
        .join(';')

    return `
      <div
        class="cell"
        data-type="cell"
        data-col="${col}"
        data-id=${id}
        contenteditable
        style="${styles}; width: ${width}px"
      >${data}</div>
    `;
  }
}

function toColumn({ col, index, width }) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}px"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div> 
    
  `;
}

function createRow(content, state, index) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = state ? state[index] : DEFAULT_HEIGHT

  return `
    <div
      class="row" data-type="resizable"
      data-row="${index}"
      style="height: ${height}px"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));


  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(cells, state.rowState, row + 1));
  }

  return rows.join('');
}

function getWidth(state = {}, index) {
  return state[index] || DEFAULT_WIDTH
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}
