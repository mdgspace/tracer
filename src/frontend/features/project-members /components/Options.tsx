import UserContext from 'frontend/app/context/user/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  spaceName: string;
  projectName: string;
  projectMembers: { [username: string]: string } | null;
  orgMembers: { [username: string]: string } | null;
}

const Options: React.FC<Props> = ({
  spaceName,
  projectName,
  projectMembers,
  orgMembers,
}) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  return (
    <div className='options'>
      {orgMembers &&
        projectMembers &&
        spaceName &&
        projectName &&
        userContext?.username &&
        (orgMembers[userContext?.username?.toString()] ==
          ('admin' || 'manager') ||
          projectMembers[userContext?.username.toString()] == 'admin') && (
          <button
            className='add-people button'
            onClick={() =>
              navigate(`/projectAddMembers/${spaceName}/${projectName}`)
            }
          >
            Add People
          </button>
        )}
      {/* <button className='add-people button'>Filter</button> */}
    </div>
  );
};

export default Options;
