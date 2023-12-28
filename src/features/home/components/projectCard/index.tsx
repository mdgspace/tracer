import React, { useState } from 'react';
import './index.scss';
import axios from 'axios';
import { getMembers, getProject } from 'app/api/project';
import { useQuery } from 'react-query';
import { GetProject } from 'app/api/project';
import { ProjectMembers } from 'app/api/project';
import { AVATAR_URL } from 'app/constants/api';
import { AVATAR_API } from 'envConstants';
 interface Props{
   projectName: string,
   orgName: string,
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





const ProjectCard: React.FC<Props> = ({projectName,orgName ,status, githubData}) => {
  const token= localStorage.getItem('token')
  
  const [ProjectData,SetProjectData]= useState<GetProject|null>(null)
  const [projectMembers,setProjectMembers]= useState<ProjectMembers|null>(null)

const fetchProjectData= async()=>{
  if(token!=null){
    const project_data= await getProject(token,projectName, orgName);
    SetProjectData(project_data.data)
    return project_data.data
  }else{
    return null
  }
}

const fetchProjectMembers=async()=>{
  if(token!=null){
    const members= await getMembers(token,projectName,orgName);
    setProjectMembers(members.data)
    return members.data

  }
}


const {data:project_data}= useQuery(`${projectName}${orgName}`,fetchProjectData)
const {data: project_members}= useQuery(`${projectName}${orgName}Members`, fetchProjectMembers);



  return (
    <div className='projectcard'>
      <h1>{projectName}</h1>
      <p>
        {project_data?project_data.description:<></>}
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

      <ul className='projectcard-contributor'>
        {/* <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li> */}
        {
            project_members&&Object.entries(project_members).slice(0,4).map(([key,value])=>{
              const url= AVATAR_URL+"/"+key+".png?apikey="+AVATAR_API
              return <li><img src={url} /></li>
            })
        }
      </ul>
    </div>
  );
};

export default ProjectCard;
