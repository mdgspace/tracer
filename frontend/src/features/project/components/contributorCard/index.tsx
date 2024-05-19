import './index.scss';
import contributorPropTypes from 'app/models/contributorPropTypes';
import { AVATAR_API } from 'envConstants';
import { AVATAR_URL } from 'app/constants/api';
const ContributorCard = (props: contributorPropTypes) => {
  const { Name, PR, Commits, Issues } = props;
  const url = AVATAR_URL + '/' + Name + '.png?apikey=' + AVATAR_API;
  return (
    <div className='contributor-card'>
      <img className='contributor-image' alt='profile' src={url} />
      <h3 className='contributor-name'>{Name}</h3>
      <div className='contributor-status'>
        <div>
          <span>Pull Requests</span>
          <span>{PR}</span>
        </div>
        <div>
          <span>Commits</span>
          <span>{Commits}</span>
        </div>
        <div>
          <span>Issues</span>
          <span>{Issues}</span>
        </div>
      </div>
    </div>
  );
};

export default ContributorCard;
