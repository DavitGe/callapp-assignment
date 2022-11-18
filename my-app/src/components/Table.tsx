import React from "react";
import DataTable, {
  TableColumn,
  createTheme,
} from "react-data-table-component";

import { useUserStore } from "../usersStore";
import { User } from "../model/User";
// interface DataRow {
//   id: string;
//   name: string;
//   email: string;
//   gender: "male" | "female";
// }

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
];

function Table(): JSX.Element {
  createTheme("theme", {
    background: {
      default: "transparent",
    },
  });
  const users = useUserStore((state) => state.users);
  console.log(users);

  return <DataTable data={users} columns={columns} theme="theme" />;
}

export default Table;
