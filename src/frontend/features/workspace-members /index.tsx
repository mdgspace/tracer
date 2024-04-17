import { useParams } from 'react-router-dom';
import BackNavigation from './components/BackNavigation';
import MemberCard from './components/MemberCard';
import Options from './components/Options';
import './index.scss';
import { useEffect, useState } from 'react';
import { getOrgMembers } from 'frontend/app/api/organization';
import { AVATAR_URL } from 'frontend/app/constants/api';
import { AVATAR_API } from 'envConstants';
const WorkspaceMembers = () => {
  const { spaceName } = useParams();
  const token = localStorage.getItem('token');
  const [orgMembers, setOrgMembers] = useState<{
    [username: string]: string;
  } | null>(null);

  const dataFetch = async () => {
    try {
      if (spaceName && token) {
        const memRes = await getOrgMembers(token, spaceName);

        setOrgMembers(memRes.data.members);
      }
    } catch (e) {}
  };
  useEffect(() => {
    dataFetch();
  }, [setOrgMembers]);

  return (
    <div className='members-page-container'>
      <BackNavigation />
      {spaceName && (
        <div className='member-view'>
          <Options spaceName={spaceName} />
          <div className='members-list'>
            {orgMembers &&
              Object.entries(orgMembers).map(([key, value]) => {
                return (
                  <MemberCard
                    image={AVATAR_URL + '/' + key + '.png?apikey=' + AVATAR_API}
                    name={key}
                    key={key}
                    role={value}
                    spaceName={spaceName}
                    orgMembers={orgMembers}
                    setOrgMembers={setOrgMembers}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceMembers;
