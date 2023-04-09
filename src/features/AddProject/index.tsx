import React from 'react';
import './index.scss';
import tick from '../../app/assets/images/tick.png';
const AddProject = () => {
  return (
    <div>
      <div className='add-project-container'>
        <form className='add-project-form'>
          <div className='input-title'>Name</div>
          <input type='text' placeholder='Project name' />
          <div className='input-title'>Project link</div>
          <input type='text' placeholder='Github link of project' />
          <div className='input-title'>Description</div>
          <input type='text' placeholder='Details about project' />
        </form>
        <button className='add-project-btn'>
          <img src={tick} alt='' /> Done
        </button>
      </div>
    </div>
  );
};

export default AddProject;
