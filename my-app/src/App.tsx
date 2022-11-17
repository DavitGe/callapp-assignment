import React from "react";

function App() {
  fetch("http://localhost:3001/")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <div className="App">
      <p>Hello World</p>
    </div>
  );
}

export default App;
