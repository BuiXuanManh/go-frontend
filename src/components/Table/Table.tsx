import React, { useState } from 'react';
interface Header {
  title: string;
  dataIndex: string;
  className?: string;
}

interface TableProps {
  headers: Header[];
  data: any[];
  className?: string;
  classNameTable?: string;
  classNameHeader?: string;
  classNameBody?: string;
  classNameRow?: string;
  classNameRowSelected?: string;
  noDivider?: boolean;
  classNameRowOdd?: string;
  canSelected?: boolean;
  onSelect?: (row: any) => void;
  selectedRow?: number;
  onRowClick?: (row: any) => void;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  className,
  classNameTable = 'w-full border-collapse table-auto bg-white text-left text-sm text-gray-500',
  classNameBody = 'divide-y divide-gray-100 border-t  border-gray-100',
  classNameHeader = 'bg-gray-100 font-bold text-gray-900',
  classNameRow = 'hover:bg-[#F7F6FE] cursor-pointer',
  classNameRowSelected = 'bg-primary/10',
  classNameRowOdd,
  canSelected,
  onSelect,
  selectedRow,
  noDivider,
  onRowClick
}) => {
  const [selected, setSelected] = useState(selectedRow || null);
  const handleRowClick = (row: any, index: number) => {
    setSelected(index);
    if (onRowClick) {
      onRowClick(row);
    }
    if (onSelect) {
      onSelect(row);
    }
  };

  console.log(data);
  return (
    <div className={className}>
      <table className={classNameTable}>
        <thead className={classNameHeader}>
          <tr>
            {headers?.map(header => (
              <th
                className={header.className ? header.className : 'px-4 py-4'}
                key={header.dataIndex}
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classNameBody}>
          {data?.map((row, index) => (
            <tr
              // if noDivider is true, then render the row with no divider
              className={
                canSelected
                  ? selected === index
                    ? classNameRowSelected
                    : noDivider
                    ? index % 2 === 0
                      ? classNameRow
                      : classNameRowOdd
                    : classNameRow
                  : index % 2 === 0
                  ? classNameRow
                  : classNameRowOdd
              }
              key={index}
              onClick={() => handleRowClick(row, index)}
            >
              {headers?.map(header => {
                if (row[header.dataIndex] !== undefined)
                  return (
                    <td
                      className={
                        row[header.dataIndex]?.className
                          ? row[header.dataIndex]?.className
                          : 'px-4 py-2'
                      }
                      colSpan={row['colSpan'] ? row['colSpan'] : 1}
                      key={header.dataIndex}
                    >
                      {
                        // If it's not a component, render the text
                        //row[header.dataIndex] !== undefined ? row[header.dataIndex] : 'N/A'
                        //{ Check if the cell value is a React component
                        typeof row[header.dataIndex] === 'object' ? (
                          // If it's a component, render it
                          <>{row[header.dataIndex]}</>
                        ) : (
                          // If it's not a component, render the text
                          row[header.dataIndex]
                        )
                      }
                    </td>
                  );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
