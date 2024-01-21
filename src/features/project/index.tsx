import React, { useEffect, useState } from 'react';
import Contributors from './components/contributors';
import ButtonBar from 'app/components/buttonBar';
import './index.scss';
import { useParams } from 'react-router-dom';
import { GetProject, getProject } from 'app/api/project';
import { Contributors as contri, getProjectGithubData } from 'app/api/githubData';

const ProjectPage = () => {
  const {spaceName, projectName}= useParams();
  const token= localStorage.getItem('token')
  const [project, setProject] =useState<GetProject | null>(null);
  const [weeklyData, setWeeklyData]= useState<contri| null>(null)
  const [monthlyData, setMonthlyData]= useState<contri| null>(null)
  const [weekly, setWeekly]= useState(true)
  const fetchData= async()=>{
    if(spaceName&&projectName&&token){
      const project = await getProject(token, projectName, spaceName);
      setProject(project.data)
      const weeklyData= await getProjectGithubData(token,spaceName,projectName, false)
      const monthlyData= await getProjectGithubData(token, spaceName, projectName, true)
      setWeeklyData(weeklyData.data.contributors)
      setMonthlyData(monthlyData.data.contributors)
    }
  }

  useEffect(()=>{
     fetchData()
  },[])

  return (
    <>
      <div className='project-page'>
        <ButtonBar weekly={weekly} setWeekly={setWeekly} project={project} workspaceName={spaceName}/>
        <Contributors weekly={weekly} monthlyData={monthlyData} weeklyData={weeklyData} />
      </div>
    </>
  );
};

export default ProjectPage;
