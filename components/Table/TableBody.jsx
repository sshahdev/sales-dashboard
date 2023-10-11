import { memo, useMemo } from 'react'
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";

const EnhancedTableBody = ({
  columns,
  data,
  isSelected,
  handleClick,
  page,
  rowsPerPage,
  isSelect
}) => {
  const emptyRows = useMemo(() =>
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0, [data.length, page, rowsPerPage]);
  return (
    <TableBody>
      {data.map((row, index) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, row.name)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.name}
            selected={isItemSelected}
          >
            {isSelect && <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </TableCell>}
            {columns.map((column, keyIndex) => (
              <TableCell {...column?.style} key={keyIndex}>
                {column?.cellRenderer
                  ? column?.cellRenderer(row)
                  : row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default memo(EnhancedTableBody);
