import React, { useState } from "react";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";
import styled from "styled-components";

import { useUserStore } from "../usersStore";
import { User } from "../model/User";
import ChangePerson from "./ChangePerson";

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
  const [modal, setModal] = useState({ isOpen: false, id: "" });
  const openModal = (row: User) => {
    setModal({ id: row.id, isOpen: true });
  };
  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };
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

  const onRowClicked = (row: User): void => {
    openModal(row);
    console.log("row.id", typeof row.id);
  };

  return (
    <div>
      <ChangePerson
        modal={modal.isOpen}
        userId={modal.id}
        toggle={closeModal}
      />

      <DataTable
        data={users}
        columns={columns}
        theme="theme"
        onRowDoubleClicked={onRowClicked}
      />
    </div>
  );
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
