import React, { useMemo } from "react";
import { useFilters, useGlobalFilter, useTable, useSortBy } from "react-table";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, ImportExport } from "@mui/icons-material";

function DefaultColumnFilter({ column: { setFilter } }) {
  return (
    <SearchBar
      handleSearchChange={(value) => {
        setFilter(value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
}

const ReactTable = ({
  columns,
  data,
  setOpen,
  currencySign,
  action,
  isDeliveryView,
}) => {
  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, footerGroups, headerGroups, rows, prepareRow } =
    useTable(
      {
        defaultColumn,
        filterTypes,
        columns,
        data,
        initialState: {
          sortBy: [{ id: "delivery", desc: true }],
        },
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  return (
    <TableContainer
      style={{ height: "100vh - 200px", margin: "20px auto", width: "90%" }}
      component={Paper}
    >
      <Table stickyHeader aria-label="sticky table" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...(column.id === "action" || column.id === "title_0"
                    ? { ...column.getHeaderProps() }
                    : {
                        ...column.getHeaderProps(column.getSortByToggleProps()),
                      })}
                >
                  <span style={{ margin: "0 5px" }}>
                    {column.id === "action" || column.id === "title_0" ? (
                      <></>
                    ) : column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDropDown sx={{ fontSize: 20 }}/>
                      ) : (
                        <ArrowDropUp   sx={{ fontSize: 20 }}/>
                      )
                    ) : (
                      <ImportExport  sx={{ fontSize: 20 }}/>
                    )}
                  </span>
                  {column.render("Header", { setOpen, isDeliveryView })}
                  <div>{column.filter ? column.render("Filter") : ""}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell", {
                        currencySign,
                        action,
                        isDeliveryView,
                      })}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          {footerGroups.map((group) => (
            <TableRow {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <TableCell {...column.getFooterProps()}>
                  {column.render("Footer", { currencySign })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default connect(null, {})(ReactTable);
