import React from "react";
import Navbar from "./components/NavBar";
import BasicRoutes from "./routes/BasicRoutes";
import "./styles/global.scss";

function App() {
  return (
    <>
      <Navbar />
      <BasicRoutes />
    </>
  );
}

export default App;
