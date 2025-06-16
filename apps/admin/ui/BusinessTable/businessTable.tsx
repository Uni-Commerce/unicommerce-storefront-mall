import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Table } from 'antd'
import type { FC } from 'react'
import type { PaginationProps, TableProps } from 'antd'

import ResizableTitle from './ResizableTitle'

const showTotal: PaginationProps['showTotal'] = (total: number) => (
  <FormattedMessage id="global.total" values={{ total }} />
)

const BusinessTable: FC<TableProps> = ({ ...props }) => {
  const { columns, tableLayout = 'fixed', pagination = {}, ...restProps } = props
  const [cols, setCols] = useState<any>(columns)

  const handleResize =
    (index: number) =>
    (__: any, { size }: any) => {
      const nextColumns = [...(cols || [])]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      }
      setCols(nextColumns)
    }

  const mergedColumns: any = (cols || []).map((col: any, index: number) => ({
    ...col,
    onHeaderCell: (column: any) => ({
      width: column.width,
      onResize: handleResize(index)
    })
  }))

  return (
    <Table
      {...restProps}
      size="small"
      bordered
      tableLayout={tableLayout}
      pagination={{
        pageSize: 20,
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
        showTotal
      }}
      columns={mergedColumns}
      components={{
        header: {
          cell: ResizableTitle
        }
      }}
    />
  )
}

export default BusinessTable
