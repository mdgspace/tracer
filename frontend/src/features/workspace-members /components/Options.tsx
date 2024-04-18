import { useNavigate } from 'react-router-dom';

interface Props {
  spaceName: string;
}

const Options: React.FC<Props> = ({ spaceName }) => {
  const navigate = useNavigate();
  return (
    <div className='options'>
      <button
        className='add-people button'
        onClick={() => navigate(`/workspaceAddMembers/${spaceName}`)}
      >
        Add People
      </button>
      {/* <button className='add-people button'>Filter</button> */}
    </div>
  );
};

export default Options;
