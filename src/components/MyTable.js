import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  Box,
} from '@material-ui/core';

function MyTable() {
  const [data, setData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeColumn, setActiveColumn] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios
      .get('/data.json')
      .then((response) => {
        const filteredData = response.data.filter((row) => {
          const rowValues = Object.values(row).join('').toLowerCase();
          return rowValues.includes(searchText.toLowerCase());
        });
        setData(filteredData);
      })
      .catch((error) => console.log(error));
  }, [searchText]);

  const handleSortClick = (column) => {
    const isAsc = activeColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setActiveColumn(column);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={activeColumn === 'AA'}
                  direction={sortDirection}
                  onClick={() => handleSortClick('AA')}
                >
                  AA
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={activeColumn === 'CAT'}
                  direction={sortDirection}
                  onClick={() => handleSortClick('CAT')}
                >
                  CAT
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={activeColumn === 'TN'}
                  direction={sortDirection}
                  onClick={() => handleSortClick('TN')}
                >
                  TN
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={activeColumn === 'ID'}
                  direction={sortDirection}
                  onClick={() => handleSortClick('ID')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.AA}</TableCell>
                <TableCell>{row.CAT}</TableCell>
                <TableCell>{row.TN}</TableCell>
                <TableCell>{row.ID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MyTable;
