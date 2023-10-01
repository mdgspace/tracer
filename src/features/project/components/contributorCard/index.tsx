import React from 'react';
import './index.scss';
import contributorPropTypes from 'app/models/contributorPropTypes';
import dumy_profile from 'app/assets/images/dumy_profile.svg';

const ContributorCard = (props: contributorPropTypes) => {
  const { Name } = props;
  return (
    <div className='contributor-card'>
      <img className='contributor-image' alt='profile' src={dumy_profile} />
      <h3 className='contributor-name'>{Name}</h3>
      <div className='contributor-status'>
        <div>
          <span>Pull Requests</span>
          <span>2</span>
        </div>
        <div>
          <span>Commits</span>
          <span>2</span>
        </div>
        <div>
          <span>Issues</span>
          <span>2</span>
        </div>
      </div>
    </div>
  );
};

export default ContributorCard;
