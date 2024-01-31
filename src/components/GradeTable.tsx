/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams, GridPagination} from "@mui/x-data-grid";
import { Pagination} from "@mui/material";
import { IGradeTableProps } from "../types/api_types";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//citation for data grid code

// Title: MUI X Data Grid
// Availability: https://mui.com/x/react-data-grid/

// Title: React & Material UI Data Grid Table Tutorial - Rendering Data Dynamically Using a REST API
// Author: The Code Angle
// Date: 2022
// Availability: https://www.youtube.com/watch?v=S_mgSHCWCmA 


// fetch data from api to calculate final grades and use fetched data and final grades for grade table display

/** 
export const GradeTable: React.FC<IGradeTableProps> = ({currClassID, classList, studentData}) => {
  const TableData = studentData
  const GradeTableData = studentData.map((student, index) => ({
    id: index,...student
  }));
  const columns = [
    {field: 'StudentID', headerName: 'Student ID', width: 160},
    {field: 'StudentName', headerName: 'Student Name', width: 160},
    {field: 'UniversityID', headerName: 'University ID', width: 160},
    {field: 'ClassName', headerName: 'Class Name', width: 160},
    {field: 'Semester', headerName: 'Semester', width: 160},
    // requires function that calculates final grade
    //{field: 'FinalGrade', headerName: 'Final Grade', width: 160}
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={TableData}
        columns={columns}
        initialState={{ 
          pagination: {
              page: 0, 
              pageSize: 5 ,
          },
        }}
        rowsPerPageOptions={[5, 10]}
      />
    </div>
  );};

  export default GradeTable;
*/

// example table for website


function createData(
  buid: string,
  name: string,
  studentid: string,
  classid: string,
  semester: string,
) {
  return { buid, name, studentid, classid, semester };
}

const rows = [
  createData('U1234', 'John', 'S123', 'ST519', 'fall2022'),
  createData('U2345', 'Joe', 'S234', 'ST519', 'fall2022'),
  createData('U3456', 'Jane', 'S345', 'ST519', 'fall2022'),
  createData('U4567', 'Jack', 'S456', 'ST519', 'fall2022'),
  createData('U5678', 'Jacob', 'S567', 'ST519', 'fall2022'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>University ID</TableCell>
            <TableCell align="right">Student Name</TableCell>
            <TableCell align="right">Student ID</TableCell>
            <TableCell align="right">Class ID</TableCell>
            <TableCell align="right">Semester</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.buid}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.studentid}</TableCell>
              <TableCell align="right">{row.classid}</TableCell>
              <TableCell align="right">{row.semester}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}