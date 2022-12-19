import React from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { projectid } = useParams();

  return <div>ProjectPage {projectid}</div>;
};

export default ProjectPage;
