import React from "react";
import { useParams } from "react-router-dom";
import ButtonBar from "../components/ButtonBar";
import Contributors from "../components/Contributors";
import "../styles/projectPage.scss";
const ProjectPage = () => {
  const { projectid } = useParams();

  return (
    <>
      <div className="project-page">
        <ButtonBar />
      </div>
      <Contributors />
    </>
  );
};

export default ProjectPage;
