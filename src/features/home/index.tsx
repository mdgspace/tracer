import React from 'react';
import SearchBar from 'app/components/search';
import TimeRangeSwitch from 'app/components/timeRangeSwitch';
import ProjectCardCont from './components/projectCardContainer';
import LeaderBoard from './components/leaderboard';
import './index.scss';

const Home = () => {
  return (
    <>
      <div className='home-header'>
        <SearchBar />
        <TimeRangeSwitch />
      </div>
      <div className='home-main-cont'>
        <ProjectCardCont />
        <LeaderBoard />
      </div>
    </>
  );
};

export default Home;
