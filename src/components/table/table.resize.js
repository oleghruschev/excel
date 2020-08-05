import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const type = event.target.dataset.resize;
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value = 0

    $resizer.css({
      opacity: 1,
      [sideProp]: -3000 + 'px'
    })

    const cells = $root
        .findAll(`[data-col="${$parent.data.col}`)


    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
          right: `${-delta}px`
        })
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({ bottom: `${-delta}px`})
      }
    };


    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null
      const isColResize = type === 'col'

      if (isColResize) {
        $parent.css({ width: `${value}px` });
        cells.forEach((el) => {
          el.style.width = `${value}px`;
        });
        $resizer.css({
          opacity: 0,
          right: 0,
          bottom: 0
        })
      } else {
        $parent.css({ height: `${value}px` });
      }

      resolve({type, value, id: $parent.data[type]})

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
      })
    };
  })
}
