import React from 'react';
import Gold from 'app/assets/images/Gold.svg';
import { mockData } from 'app/utils/data';
import { sortJSON } from 'app/utils/sort';
import Silver from 'app/assets/images/Silver.svg';
import Bronze from 'app/assets/images/Bronze.svg';
import leftNavButton from 'app/assets/images/leftNavButton.svg';
import rightNavButton from 'app/assets/images/rightNavButton.svg';
import mockdatatypes from 'app/models/mockDataTypes';
import './index.scss';

const LeaderBoard = () => {
  const newMockData = sortJSON(mockData);

  return (
    <div className='leaderboard-cont'>
      <div className='member title'>
        <div className='rank-title'></div>
        <div className='name-title'>Name</div>
        <div className='work-title'>Work</div>
      </div>

      {newMockData.map((e: mockdatatypes) => {
        if (e.Rank <= 3) {
          return (
            <div className='member' key={e.Name}>
              <div className='rank'>
                <img
                  src={e.Rank == 1 ? Gold : e.Rank == 2 ? Silver : Bronze}
                  alt='top-rank-medal'
                />
              </div>
              <div className='name'>{e.Name}</div>
              <div className='work'>{e.PR}</div>
            </div>
          );
        } else {
          return (
            <div className='member' key={e.id}>
              <div className='rank'>{e.Rank}</div>
              <div className='name'>{e.Name}</div>
              <div className='work'>{e.PR}</div>
            </div>
          );
        }
      })}
      <div className='leaderboard-nav'>
        <div className='left-btn'>
          <img src={leftNavButton} alt='leftNavbutton' />
        </div>
        <div className='prev-leaderboard-page'>1</div>
        <div className='current-leaderboard-page'>2</div>
        <div className='next-leaderboard-page'>3</div>
        <div className='right-btn'>
          <img src={rightNavButton} alt='rightNavbutton' />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
