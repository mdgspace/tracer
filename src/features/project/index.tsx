import React from 'react';
import Contributors from './components/contributors';
import ButtonBar from 'app/components/buttonBar';
import './index.scss';

const ProjectPage = () => {
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
