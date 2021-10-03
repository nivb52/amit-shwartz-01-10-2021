import React, { useMemo, useState } from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useFilters, useGlobalFilter, useTable } from "react-table";
import { Paper, Table, TableContainer } from "@material-ui/core";
import { matchSorter } from "match-sorter";
import uniq from "lodash.uniq";
import { editAllVacationStatus } from "../../../../redux/actions/scheduleAction";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";

function DefaultColumnFilter({ column: { setFilter } }) {
  return (
    <SearchBar
      handleSearchChange={(value) => {
        setFilter(value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  let result = matchSorter(rows, filterValue, {
    keys: [(row) => row.values[id]],
  });
  result = [
    ...result,
    ...matchSorter(rows, filterValue, {
      keys: [(row) => row.values[["name"]]],
    }),
  ];

  return uniq(result);
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

const ReactTable = ({
  columns,
  data,
}) => {
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
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
 
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      defaultColumn,
      filterTypes,
      columns,
      data,
    },
    useFilters, 
    useGlobalFilter 
  );

  return (
    <TableContainer
      style={{ height: "100vh - 200px",margin: "2rem auto" }}
      component={Paper}
    >
      <Table stickyHeader aria-label="sticky table" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
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
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default connect(null, { editAllVacationStatus })(ReactTable);
