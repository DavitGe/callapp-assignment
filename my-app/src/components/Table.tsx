import React from "react";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
import styled from "styled-components";

import { useUserStore } from "../usersStore";
import { User } from "../model/User";

function Table(): JSX.Element {
  createTheme("theme", {
    background: {
      default: "transparent",
    },
  });
  const { users, removeUser } = useUserStore((state) => ({
    users: state.users,
    removeUser: state.removeUser,
  }));

  const columns: TableColumn<User>[] = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "gender",
      selector: (row) => row.gender,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
    },
    {
      name: "address",
      selector: (row) => row.address.city + ", " + row.address.street,
    },
    {
      cell: (row) => <Button onClick={() => removeUser(row.id)}>Delete</Button>,
    },
  ];

  return <DataTable data={users} columns={columns} theme="theme" />;
}

const Button = styled.button`
  border: none;
  outline: none;
  background-color: #d04243;
  color: #f6f5f2;
  border-radius: 8px;
  font-size: 12px;
  padding: 4px 8px;
`;
export default Table;
