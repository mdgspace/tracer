import React, { useState } from 'react';
import './index.scss';
import rightNavbtn from '../../../app/assets/images/right_navigation_button.svg';
import workspaceCardProps from 'app/models/workSpaceCardTypes';
const WorkspaceCard = (props: workspaceCardProps) => {
  const { imgURL, title, description, id } = props;

  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <div className='workspace-card'>
      <div className='workspace-card-body'>
        <div
          className='workspace-popup-btn'
          onClick={() => setShowPopUp(showPopUp ? false : true)}
        >
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51T-25-1BBmDvoLRWJYNK3P6AENpJBslAp9n_QDXRnA&usqp=CAU&ec=48665701'
            alt=''
          />
        </div>
        <div className={showPopUp ? 'workspace-popup' : 'hide'}>
          <div className='pin'>Pin</div>
          <div className='archive'>archive</div>
          <div className='delete'>delete</div>
        </div>
        <div className='workspace-card-utils'>
          <div className='workspace-logo'>
            <img src={imgURL} alt='' />
          </div>
          <div className='workspace-members'>
            <div className='workspace-title'>{title}</div>
            <div className='workspace-members-imgs'>img</div>
          </div>
        </div>
        <div className='workspace-description'>
          {description.substring(0, 120) + '...'}
        </div>
        <div className='workspace-details-btn'>
          <img src={rightNavbtn} alt='' />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
