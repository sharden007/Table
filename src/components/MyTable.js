import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TextField } from '@material-ui/core';

function MyTable() {
  const [data, setData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeColumn, setActiveColumn] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    axios.get('/data.json')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSortClick = (column) => {
    const isAsc = activeColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setActiveColumn(column);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const sortedData = data.sort((a, b) => {
    const column = activeColumn.toLowerCase();
    const valueA = a[column];
    const valueB = b[column];

    if (valueA < valueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={activeColumn === 'field1'}
                direction={sortDirection}
                onClick={() => handleSortClick('field1')}
              >
                AA
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={activeColumn === 'cat'}
                direction={sortDirection}
                onClick={() => handleSortClick('cat')}
              >
                Cat
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={activeColumn === 'tn'}
                direction={sortDirection}
                onClick={() => handleSortClick('tn')}
              >
                TN
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={activeColumn === 'id'}
                direction={sortDirection}
                onClick={() => handleSortClick('id')}
              >
                ID
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow key={index} onClick={() => handleRowClick(row)}>
              <TableCell>{row.field1}</TableCell>
              <TableCell>{row.cat}</TableCell>
              <TableCell>{row.tn}</TableCell>
              <TableCell>{row.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRow && (
        <TextField
          label="Time Stamp"
          value={selectedRow.ts}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    </TableContainer>
  );
}

export default MyTable;

