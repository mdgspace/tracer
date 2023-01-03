import React from "react";
import { useParams } from "react-router-dom";
import ButtonBar from "../components/ButtonBar";
import Contributors from "../components/Contributors";

const ProjectPage = () => {
  const { projectid } = useParams();

  return (
    <>
      <div className="project-page">
        <ButtonBar />
        <Contributors />
      </div>
    </>
  );
};

export default ProjectPage;
