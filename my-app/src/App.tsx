import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { User } from "./model/User";
import { useUserStore } from "./usersStore";

import Table from "./components/Table";
import Header from "./components/Header";
import CitiesChart from "./components/CitiesChart";

import "dotenv/config";

function App() {
  const { setUsers } = useUserStore((state) => ({
    setUsers: state.setUsers,
  }));

  useEffect(() => {
    try {
      fetch(process.env.URL ? process.env.URL : "")
        .then((response) => response.json())
        .then((data: User[]) => setUsers(data));
    } catch (error) {
      console.log("error", error);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/chart" element={<CitiesChart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
