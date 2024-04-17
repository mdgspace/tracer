import SearchBar from 'frontend/app/components/search';
import  { useContext, useEffect, useState } from 'react';
import './index.scss';
import WorkspaceCard from './workspace-card';
import UserContext from 'frontend/app/context/user/userContext';
import { UserOrgDetails, getUserOrgs } from 'frontend/app/api/user';
import loader from '../../app/assets/gifs/loader.gif';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FirstVisit from 'frontend/app/components/firstVisit';
import toast from 'react-hot-toast';

const WorkspaceView = () => {
  const userContext = useContext(UserContext);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [archeives, setArcheives] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const fetchData = async () => {
    if (token && userContext?.username) {
      setIsLoad(true);
      try {
        const userOrgs = await getUserOrgs(
          token,
          userContext?.username.toString()
        );
        userContext?.setUserOrgs(userOrgs.data);
     
      } catch (e) {}

      setIsLoad(false);
    }
  };
  const searchValue = useSelector((state: any) => state.searchKeyword.value);

  useEffect(() => {
    fetchData();
  }, [
    userContext?.setUsername,
    userContext?.username,
    navigate,
    userContext?.setUserOrgs,
    searchValue,
  ]);

  const LogoutHandler = async () => {
    try {
      localStorage.removeItem('token');
      toast.success('Logout successful!');
      navigate('/login');
    } catch (e) {}
  };
  return (
    <div className='workspaceview-container'>
      <FirstVisit />
      <div className='workspaceview-header'>
        <SearchBar />

        <button
          onClick={() => setArcheives(!archeives)}
          style={archeives ? { background: '#141432' } : {}}
        >
          Archeives
        </button>

        <button onClick={() => navigate('/addWorkspace')}>
          Create a workspace
        </button>
        <button onClick={LogoutHandler}>Logout</button>
      </div>

      <div className='workspaceview-card-container'>
        {isLoad ? (
          <img src={loader} className='loader' />
        ) : (
          userContext?.userOrgs &&
          Object.entries(userContext.userOrgs.userOrgs)
            .filter(([key, value]) => {
              if (key.toLowerCase().includes(searchValue.toLowerCase()))
                return [key, value];
            })
            .map(([orgName, details]) => {
              return (
                <WorkspaceCard
                  key={orgName}
                  workspaceName={orgName}
                  archeive={'true' === details.archeive}
                  bookmark={'true' === details.bookmark}
                  role={details.role}
                  archeives={archeives}
                />
              );
            })
        )}
      </div>
    </div>
  );
};

export default WorkspaceView;
