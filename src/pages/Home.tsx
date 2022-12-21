import React from "react";
import LeaderBoard from "../components/LeaderBoard";
import ProjectCardCont from "../components/ProjectCardCont";
import SearchBar from "../components/SearchBar";
import TimeRangeSwitch from "../components/TimeRangeSwitch";

const Home = () => {
  return (
    <>
      <div className="home-header">
        <SearchBar />
        <TimeRangeSwitch />
      </div>
      <div className="home-main-cont">
        <ProjectCardCont />
        <LeaderBoard />
      </div>
    </>
  );
};

export default Home;
