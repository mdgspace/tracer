import React from "react";
import Gold from "../assets/images/Gold.svg";
import { mockData } from "../utils/data";
import { sortJSON } from "../utils/sort";
import Silver from "../assets/images/Silver.svg";
import Bronze from "../assets/images/Bronze.svg";
import leftNavButton from "../assets/images/leftNavButton.svg";
import rightNavButton from "../assets/images/rightNavButton.svg";
import mockdatatypes from "../models/mockDataTypes";

const LeaderBoard = () => {
  const newMockData = sortJSON(mockData, "PR");

  return (
    <div className="leaderboard-cont">
      <div className="member title">
        <div className="rank-title"></div>
        <div className="name-title">Name</div>
        <div className="work-title">Work</div>
      </div>

      {newMockData.map((e: mockdatatypes) => {
        if (e.id == 1 || e.id == 2 || e.id == 3) {
          return (
            <>
              <div className="member">
                <div className="rank">
                  <img
                    src={e.id == 1 ? Gold : e.id == 2 ? Silver : Bronze}
                    alt=""
                  />
                </div>
                <div className="name">{e.Name}</div>
                <div className="work">{`${e.PR}`}</div>
              </div>
            </>
          );
        } else {
          return (
            <div className="member">
              <div className="rank">{`${e.id}`}</div>
              <div className="name">{e.Name}</div>
              <div className="work">{`${e.PR}`}</div>
            </div>
          );
        }
      })}
      <div className="leaderboard-nav">
        <div className="left-btn">
          <img src={leftNavButton} alt="" />
        </div>
        <div className="prev-leaderboard-page">1</div>
        <div className="current-leaderboard-page">2</div>
        <div className="next-leaderboard-page">3</div>
        <div className="right-btn">
          <img src={rightNavButton} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
