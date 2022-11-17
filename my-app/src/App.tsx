import React, { useEffect } from "react";

import { User } from "./model/User";
import { useUserStore } from "./usersStore";

import Table from "./components/Table";
import Header from "./components/Header";

function App() {
  const { setUsers } = useUserStore((state) => ({
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
      <Header />
      <Table />
    </div>
  );
}

export default App;
