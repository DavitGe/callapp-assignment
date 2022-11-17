import React, { useEffect } from "react";

import { User } from "./model/User";
import { useUserStore } from "./usersStore";

import Table from "./components/Table";

function App() {
  const { users, setUsers } = useUserStore((state) => ({
    users: state.users,
    setUsers: state.setUsers,
  }));

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data));
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
