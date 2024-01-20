import React from 'react';
import Contributors from './components/contributors';
import ButtonBar from 'app/components/buttonBar';
import './index.scss';
import { useParams } from 'react-router-dom';
import { getProject } from 'app/api/project';

const ProjectPage = () => {
  const {spaceName, projectName}= useParams();
  const token= localStorage.getItem('token')
  const fetchData= async()=>{
    if(spaceName&&projectName&&token){
      const project = await getProject(token, projectName, spaceName);
      
    }
  }
  return (
    <>
      <div className='project-page'>
        <ButtonBar />
        <Contributors />
      </div>
    </>
  );
};

export default ProjectPage;
