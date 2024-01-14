import React, { useState } from 'react';
import './index.scss';
import rightNavbtn from '../../../app/assets/images/right_navigation_button.svg';

type workspaceCardProps = {
  workspaceName: string;
  role: string;
  archeive: boolean;
  bookmark: boolean;
  archeives: boolean;
}

const WorkspaceCard = (props: workspaceCardProps) => {
  const { workspaceName, role, archeive, bookmark ,archeives} = props;
  
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
 { (archeive==archeives)&&<div className='workspace-card'>
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
            <img src={"https://pngimg.com/uploads/github/github_PNG80.png"} alt='' />
          </div>
          <div className='workspace-members'>
            <div className='workspace-title'>{workspaceName}</div>
            <div className='workspace-members-imgs'>img</div>
          </div>
        </div>
        <div className='workspace-description'>
          {/* {description.substring(0, 120) + '...'} */}
        </div>
        <div className='workspace-details-btn'>
          <img src={rightNavbtn} alt='' />
        </div>
      </div>
    </div>}
    </>
  );
};

export default WorkspaceCard;
