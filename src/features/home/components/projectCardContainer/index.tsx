import React, { useState } from 'react';
import ProjectCard from '../projectCard';
import './index.scss';
import { Projects } from 'app/api/organization';
import { ProjectsGithubData } from 'app/api/githubData';

const arr = [1, 2, 3, 4, 5];
interface Props{
  weekly: boolean,
  orgName: string,
  orgProjects: Projects | null,
  monthlyOrgProjectsData:ProjectsGithubData | null,
  weeklyOrgProjectsData: ProjectsGithubData | null
}

const ProjectCardCont: React.FC<Props> = ({weekly,orgName ,orgProjects, monthlyOrgProjectsData, weeklyOrgProjectsData}) => {


  const [archeive,setArcheive]= useState<boolean>(false);
  return (
    <>
    <div>
      <button  onClick={()=>archeive?setArcheive(false):setArcheive(true)}>Archeive</button>
    </div>
    <div className='projectcard-cont'>
     

      {orgProjects&&Object.entries(orgProjects).map(([key, value])=>{
          if(archeive&&value.archeive){
            if(weekly){
              let githubData=null
              if(weeklyOrgProjectsData){
               githubData= weeklyOrgProjectsData[key]
              }
              
          return <ProjectCard key={key} orgName={orgName}  projectName={key} status={value} githubData={githubData}/>;
            }else{
              let githubData=null
              if(monthlyOrgProjectsData){
               githubData= monthlyOrgProjectsData[key]
              }
              return <ProjectCard key={key} orgName={orgName}  projectName={key} status={value} githubData={githubData}/>;
             
            }
          }
      })}
     
      
    </div>
    </>
  );
};

export default ProjectCardCont;
