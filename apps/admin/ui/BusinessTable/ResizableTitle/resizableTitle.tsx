import { Resizable } from 'react-resizable'
import type { ResizableProps } from 'react-resizable'

const ResizableTitle = (props: ResizableProps) => {
  const { onResize, width, ...restProps } = props

  const clearSelection = () => {
    if (window.getSelection) {
      const selection = window.getSelection()
      if (selection) {
        if (selection.empty) {
          // Chrome
          selection.empty()
        } else if (selection.removeAllRanges) {
          // Firefox
          selection.removeAllRanges()
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (document.selection && document.selection.empty) {
      // IE
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.selection.empty()
    }
  }

  if (!width) return <td {...restProps} />

  return (
    <Resizable
      width={width}
      height={0}
      axis="x"
      handle={<span onClick={(e) => e.stopPropagation()} />}
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
        onMouseDown: () => {
          clearSelection()
        }
      }}>
      <td {...restProps} />
    </Resizable>
  )
}

export default ResizableTitle
