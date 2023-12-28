import React, { useEffect, useState } from 'react';
import SearchBar from 'app/components/search';
import TimeRangeSwitch from 'app/components/timeRangeSwitch';
import ProjectCardCont from './components/projectCardContainer';
import LeaderBoard from './components/leaderboard';
import './index.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUser } from 'app/api/user';
import toast from 'react-hot-toast';
import { Query, useQuery } from 'react-query';
import { getAllOrgs, getOrgProjects } from 'app/api/organization';
import {
  getOrgGithubData,
  getOrgRank,
  getProjectGithubData,
} from 'app/api/githubData';
import { Projects } from 'app/api/organization';
import { ProjectsGithubData } from 'app/api/githubData';
import { Contributors } from 'app/api/githubData';
import loader from '../../app/assets/gifs/loader.gif';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState<string | null>(null);
  const [weekly,setWeekly]= useState<boolean>(true);
  const [orgProjects, setOrgProjects] = useState<Projects | null>(null);
  const [monthlyOrgRank, setMonthlyOrgRank] = useState<Contributors | null>(
    null
  );
  const [weeklyOrgRank, setWeeklyOrgRank] = useState<Contributors | null>(null);
  const [monthlyOrgProjectsData, setMOnthyOrgProjectsData] =
    useState<ProjectsGithubData | null>(null);
  const [weeklyOrgProjectsData, setWeeklyOrgProjectsData] =
    useState<ProjectsGithubData | null>(null);
  const orgName = 'fordev';
  const checklogin = async () => {
    if (token != null) {
      try {
        const userData = await getUser(token);

        setUserData(userData.data.message);
      } catch (e) {
        toast.error('Session expired');
        navigate('/login');
      }
    } else {
      toast.error('Not authorized');
      navigate('/login');
    }
  };

  useEffect(() => {
    checklogin();
  }, []);

  const fetchOrgProjects = async () => {
    if (token) {
      const orgProjects = await getOrgProjects(token, orgName);
     
      setOrgProjects(orgProjects.data.projects);
    

      return {
        orgProjects: orgProjects.data.projects,
  
      };
    }
  };


  const fetchWeeklyData= async()=>{
    if(token){
      const weeklyOrgRank = await getOrgRank(token, orgName, true);
      const weeklyOrgProjectsData = await getOrgGithubData(
        token,
        orgName,
        false
      );
      setWeeklyOrgProjectsData(weeklyOrgProjectsData.data.projects);
      setWeeklyOrgRank(weeklyOrgRank.data.contributors);
      return {
        weeklyOrgRank: weeklyOrgRank.data.contributors,
        weeklyOrgProjectsData: weeklyOrgProjectsData.data.projects,
      }

    }
  } 
  
  const fetchMonthlyData= async()=>{
    if(token){
      const monthlyOrgRank = await getOrgRank(token, orgName, true);
      const monthlyOrgProjectsData = await getOrgGithubData(
        token,
        orgName,
        true
      );
      setMonthlyOrgRank(monthlyOrgRank.data.contributors);
      setMOnthyOrgProjectsData(monthlyOrgProjectsData.data.projects);
      return{
        monthlyOrgProjectsData: monthlyOrgProjectsData.data.projects,
        monthlyOrgRank: monthlyOrgRank.data.contributors,
      }
    }
  }

  const {  isLoading } = useQuery({
    queryFn: () => fetchOrgProjects(),
    queryKey: 'OrgProjects',
  });

  const {} = useQuery({
    queryFn: ()=> fetchWeeklyData(),
    queryKey: "weeklyData"
  })
  
  const {}= useQuery({
    queryFn: ()=>fetchMonthlyData(),
    queryKey: "monthlyData"
  })


  return (
    <>
      <div className='home-header'>
        <SearchBar/>
        <TimeRangeSwitch />
      </div>
      {isLoading?<div className='loader-container'>
        <img className='loading' src={loader} />
      </div>:
      
      <div className='home-main-cont'>
        <ProjectCardCont weekly={weekly} orgName={orgName}  orgProjects={orgProjects}   monthlyOrgProjectsData={monthlyOrgProjectsData}  weeklyOrgProjectsData={weeklyOrgProjectsData}/>
        <LeaderBoard />
      </div>
      }
      
    </>
  );
};

export default Home;
