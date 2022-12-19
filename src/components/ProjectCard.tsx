import React from "react";

const ProjectCard = () => {
  return (
    <div className="projectcard">
      <h1>Appitizer</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
        repudiandae ex corporis quasi sequi porro est, tenetur ipsam assumenda
        ab ratione recusandae atque quaerat. Voluptatem incidunt illo optio
        aperiam consequuntur.
      </p>
      <div className="projectcard-status">
        <div>
          <span>Pull Requests</span>
          <span>2</span>
        </div>
        <div>
          <span>Commits</span>
          <span>2</span>
        </div>
        <div>
          <span>Issues</span>
          <span>2</span>
        </div>
      </div>

      <ul className="projectcard-contributor">
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>+12</li>
      </ul>
    </div>
  );
};

export default ProjectCard;
