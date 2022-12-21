import React from "react";
import '../styles/leaderboard.scss';
import Gold from '../assets/images/Gold.svg';
import Silver from '../assets/images/Silver.svg';
import Bronze from '../assets/images/Bronze.svg';
import leftNavButton from '../assets/images/leftNavButton.svg';
import rightNavButton from '../assets/images/rightNavButton.svg';

const LeaderBoard = () => {
  return (
    <div className="leaderboard-cont">
      <div className="member title">
   <div className="rank-title"></div>
   <div className="name-title">Name</div>
   <div className="work-title">Work</div>
      </div>
       <div className="member">

         <div className="rank"><img src={Gold} alt="" /></div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank"><img src={Silver} alt="" /></div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank"><img src={Bronze} alt="" /></div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank">123</div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank">123</div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank">123</div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank">123</div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank">123</div>
         <div className="name">Ommamissffhaasdf</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank">123</div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="member">

         <div className="rank">123</div>
         <div className="name">Omm</div>
         <div className="work">1 PR</div>
       </div>
       <div className="leaderboard-nav">
          <div className="left-btn"><img src={leftNavButton} alt="" /></div>
          <div className="prev-leaderboard-page">1</div>
          <div className="current-leaderboard-page">2</div>
          <div className="next-leaderboard-page">3</div>
          <div className="right-btn"><img src={rightNavButton} alt="" /></div>
       </div>
      </div>
  );
};

export default LeaderBoard;
