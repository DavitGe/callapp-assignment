import React, { useEffect } from "react";

import { User } from "./model/User";
import { useUserStore } from "./usersStore";

function App() {
  const { users, setUsers } = useUserStore((state) => ({
    users: state.users,
    setUsers: state.setUsers,
  }));

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  return (
    <div className="App">
      <p>Hello World</p>
    </div>
  );
}

export default App;
