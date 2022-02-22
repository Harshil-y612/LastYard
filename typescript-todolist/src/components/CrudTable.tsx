import React from "react";
import { TableProps } from "./Types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CrudTable = (props: TableProps) => {
  // delete function calling the parent function
  const handleClickDelete = (id: number) => {
    console.log(id);
    props.handleDelete(id);
  };

  const handleClickEdit = (id: number) => {
    props.handleEdit(id);
  };
  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Email</TableCell>

              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.array.map((list) => (
              <TableRow key={list.id}>
                <TableCell align="left">{list.firstName}</TableCell>
                <TableCell align="left">{list.lastName}</TableCell>
                <TableCell align="left">{list.age}</TableCell>
                <TableCell align="left">{list.email}</TableCell>

                <TableCell align="center">
                  <EditIcon onClick={() => handleClickEdit(list.id)} />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleClickDelete(list.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CrudTable;
