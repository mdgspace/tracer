import React from 'react';
import ButtonBar from '../components/ButtonBar';
import Contributors from '../components/Contributors';

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
