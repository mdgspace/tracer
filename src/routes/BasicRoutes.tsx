import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import ProjectPage from "../pages/ProjectPage";

const BasicRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/projects/:projectid"} element={<ProjectPage />} />
      <Route path={"/*"} element={<Error />} />
    </Routes>
  );
};

export default BasicRoutes;
