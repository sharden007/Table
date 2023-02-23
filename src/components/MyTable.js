import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core';

function MyTable() {
  const [data, setData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeColumn, setActiveColumn] = useState('');

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
                Field 1
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={activeColumn === 'field2'}
                direction={sortDirection}
                onClick={() => handleSortClick('field2')}
              >
                Field 2
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={activeColumn === 'field3'}
                direction={sortDirection}
                onClick={() => handleSortClick('field3')}
              >
                Field 3
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.field1}</TableCell>
              <TableCell>{row.field2}</TableCell>
              <TableCell>{row.field3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
