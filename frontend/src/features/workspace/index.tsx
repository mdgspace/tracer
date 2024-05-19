import { useContext, useEffect, useState } from 'react';
import SearchBar from 'app/components/search';
import TimeRangeSwitch from 'app/components/timeRangeSwitch';
import ProjectCardCont from './components/projectCardContainer';
import LeaderBoard from './components/leaderboard';
import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrgProjects } from 'app/api/organization';
import { getOrgGithubData, getOrgRank } from 'app/api/githubData';
import { Projects } from 'app/api/organization';
import { ProjectsGithubData } from 'app/api/githubData';
import { Contributors } from 'app/api/githubData';
import loader from '../../app/assets/gifs/loader.gif';
import UserContext from 'app/context/user/userContext';
import { UserOrgs, getUserOrgs } from 'app/api/user';
import { useSelector } from 'react-redux';

const Workspace = () => {
  const searchValue = useSelector((state: any) => state.searchKeyword.value);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userContext = useContext(UserContext);
  const [weekly, setWeekly] = useState<boolean>(true);
  const [orgProjects, setOrgProjects] = useState<Projects | null>(null);
  const [archives, setArcheives] = useState<boolean>(false);
  const [monthlyOrgRank, setMonthlyOrgRank] = useState<Contributors | null>(
    null
  );
  const [userOrgs, setUserOrgs] = useState<UserOrgs>({} as UserOrgs);
  const [weeklyOrgRank, setWeeklyOrgRank] = useState<Contributors | null>(null);
  const [monthlyOrgProjectsData, setMOnthyOrgProjectsData] =
    useState<ProjectsGithubData | null>(null);
  const [weeklyOrgProjectsData, setWeeklyOrgProjectsData] =
    useState<ProjectsGithubData | null>(null);
  const { spaceName } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchOrgProjects = async () => {
    setIsLoading(true);
    if (token && spaceName) {
      try {
        const orgProjects = await getOrgProjects(token, spaceName);
        const temp = Object.entries(orgProjects.data.projects).filter(([key]) =>
          key.toLowerCase().includes(searchValue.toLowerCase())
        );
        setOrgProjects(Object.fromEntries(temp));
      } catch (e) {
        navigate('/');
      }
    }
    setIsLoading(false);
  };

  const fetchWeeklyData = async () => {
    try {
      if (token && spaceName) {
        const weeklyOrgRank = await getOrgRank(token, spaceName, true);
        const weeklyOrgProjectsData = await getOrgGithubData(
          token,
          spaceName,
          false
        );

        setWeeklyOrgProjectsData(weeklyOrgProjectsData.data.projects);
        setWeeklyOrgRank(weeklyOrgRank.data.contributors);
      }
    } catch (e) {}
  };

  const fetchData = async () => {
    if (token && userContext?.username) {
      try {
        const userOrgsRes = await getUserOrgs(
          token,
          userContext?.username.toString()
        );
        userContext?.setUserOrgs(userOrgsRes.data);
        setUserOrgs(userOrgsRes.data);
      } catch (e) {}
    }
  };

  const fetchMonthlyData = async () => {
    try {
      if (token && spaceName) {
        const monthlyOrgRank = await getOrgRank(token, spaceName, true);
        const monthlyOrgProjectsData = await getOrgGithubData(
          token,
          spaceName,
          true
        );
        setMonthlyOrgRank(monthlyOrgRank.data.contributors);
        setMOnthyOrgProjectsData(monthlyOrgProjectsData.data.projects);
      }
    } catch (e) {}
  };
  useEffect(() => {
    fetchData();
    fetchOrgProjects();
    fetchWeeklyData();
    fetchMonthlyData();
  }, [spaceName, searchValue]);

  return (
    <>
      <div className='home-header'>
        <SearchBar />
        <button onClick={() => navigate('/')}>Home</button>
        <button
          style={archives ? { background: 'var(--home-page-card-bg)' } : {}}
          onClick={() => setArcheives(!archives)}
        >
          Archives
        </button>
        {spaceName &&
          (userContext?.userOrgs?.userOrgs[spaceName].role == 'admin' ||
            userContext?.userOrgs?.userOrgs[spaceName].role == 'manager') && (
            <button
              className=''
              onClick={() => navigate(`/addProject/${spaceName}`)}
            >
              Add Project
            </button>
          )}

        <TimeRangeSwitch weekly={weekly} setWeekly={setWeekly} />
      </div>
      {isLoading ? (
        <div className='loader-container'>
          <img className='loading' src={loader} />
        </div>
      ) : (
        <div className='home-main-cont'>
          {spaceName && (
            <ProjectCardCont
              archives={archives}
              weekly={weekly}
              orgName={spaceName}
              orgProjects={orgProjects}
              monthlyOrgProjectsData={monthlyOrgProjectsData}
              weeklyOrgProjectsData={weeklyOrgProjectsData}
            />
          )}
          <LeaderBoard
            weekly={weekly}
            weeklyOrgRank={weeklyOrgRank}
            monthlyOrgRank={monthlyOrgRank}
          />
        </div>
      )}
    </>
  );
};

export default Workspace;
