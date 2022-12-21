import React from "react";
import ProjectCard from "./ProjectCard";

const arr = [1, 2, 3, 4, 5];

const ProjectCardCont = () => {
  return (
    <div className="projectcard-cont">
      {arr.map((ele) => {
        return <ProjectCard />;
      })}
    </div>
  );
};

export default ProjectCardCont;
