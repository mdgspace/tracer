import BackNavigation from './components/BackNavigation';
import MemberCard from './components/MemberCard';
import Options from './components/Options';
import './index.scss';
const ProjectMembers = () => {
  // const  member = await fetch('https://api.github.com/orgs/github/public_members');
  return (
    <div className='members-page-container'>
      <BackNavigation />
      <div className='member-view'>
        <Options />
        <div className='members-list'>
          <MemberCard
            image={
              'https://media.licdn.com/dms/image/D4E03AQGI1ZJx1AywYQ/profile-displayphoto-shrink_400_400/0/1665646743847?e=1710979200&v=beta&t=aLom25RLssprCiYXceT78QAtMTFm4Kl_94HoJlZXfTA'
            }
            name={'Karthik Ayangar'}
            role={'member'}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectMembers;
