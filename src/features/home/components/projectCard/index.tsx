import React from 'react';
import './index.scss';

 interface Props{
   projectName: string,
   status: {
    archeive: boolean,
    bookmark: boolean,
   },
   githubData:{
    pulls: number,
    commits: number,
    issues: number
   } | null

}


const ProjectCard: React.FC<Props> = ({projectName, status, githubData}) => {
  return (
    <div className='projectcard'>
      <h1>{projectName}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
        repudiandae ex corporis quasi sequi porro est, tenetur ipsam assumenda
        ab ratione recusandae atque quaerat. Voluptatem incidunt illo optio
        aperiam consequuntur.
      </p>
      <div className='projectcard-status'>
        <div>
          <span>Pull Requests</span>
          <span>{githubData?githubData.pulls:<></>}</span>
        </div>
        <div>
          <span>Commits</span>
          <span>{githubData?githubData.commits:<></>}</span>
        </div>
        <div>
          <span>Issues</span>
          <span>{githubData?githubData.issues:<></>}</span>
        </div>
      </div>

      {/* <ul className='projectcard-contributor'>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul> */}
    </div>
  );
};

export default ProjectCard;
