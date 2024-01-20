import React, { useEffect, useState } from 'react';
import './index.scss';
import ContributorCard from '../contributorCard';
import next_contributor from 'app/assets/images/next_contributor.svg';
import previous_contributor from 'app/assets/images/previous_contributor.svg';
import { mockData } from 'app/utils/data';
import mockdatatypes from 'app/models/mockDataTypes';
import ReactSimplyCarousel from 'react-simply-carousel';
import { Contributors as contri} from 'app/api/githubData';

const btn_style = {
  alignSelf: 'center',
  background: 'none',
  border: 'none',
};

interface Props{
  weekly: boolean,
  monthlyData: contri | null 
  weeklyData: contri | null
}

const Contributors: React.FC<Props>= ({weekly, monthlyData, weeklyData}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [monthlyDataArray, setMonthlyDataArray]= useState<{index: number, username: string, commits: number, issues: number, pulls:number}[]>([])
  const [weeklyDataArray, setWeeklyDataArray]= useState<{index: number, username: string, commits: number, issues: number, pulls:number}[]>([])

  const initialProcess= ()=>{
    if(monthlyData){
      const contributorsArray = Object.entries(monthlyData).map(
        ([username, data], index) => ({
          index,
          username,
          ...data
        })
      )
      contributorsArray.sort((a, b) => b.pulls - a.pulls)
      setMonthlyDataArray(contributorsArray)
    }
    if(weeklyData){
      const contributorsArray = Object.entries(weeklyData).map(
        ([username, data], index) => ({
          index,
          username,
          ...data
        })
      )
      contributorsArray.sort((a, b) => b.pulls - a.pulls)
      setWeeklyDataArray(contributorsArray)
    }
  }

  useEffect(()=>{
    initialProcess()

  },[weekly,monthlyData,weeklyData])

  return (
    <div className='contributor-container'>
      <h3 className='contributor-title'>Contributors</h3>
      <div className='contributor-card-container'>
        <ReactSimplyCarousel
          containerProps={{
            style: {
              width: '100%',
              justifyContent: 'flex-start',
              userSelect: 'none',
            },
          }}
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          infinite={true}
          itemsToShow={4}
          itemsToScroll={1}
          forwardBtnProps={{
            style: { ...btn_style },
            children: (
              <img
                className='contributor-navigation'
                src={next_contributor}
                alt='next_contributor'
              />
            ),
          }}
          backwardBtnProps={{
            style: { ...btn_style },
            children: (
              <img
                className='contributor-navigation'
                src={previous_contributor}
                alt='previous_contributor'
              />
            ),
          }}
          responsiveProps={[
            {
              itemsToShow: 1,
              itemsToScroll: 1,
              maxWidth: 860,
            },
          ]}
          speed={400}
          easing='linear'
        >
          {weekly?weeklyDataArray.map((e) => {
            return (
              <div
                key={e.username}
                style={{
                  padding: '1em',
                  paddingTop: '2em',
                }}
              >
                <ContributorCard
                  Name={e.username}
                  PR={e.pulls}
                  Issues={e.issues}
                  Commits={e.commits}
                />
              </div>
            );
          }):monthlyDataArray.map((e) => {
            return (
              <div
                key={e.username}
                style={{
                  padding: '1em',
                  paddingTop: '2em',
                }}
              >
                <ContributorCard
                  Name={e.username}
                  PR={e.pulls}
                  Issues={e.issues}
                  Commits={e.commits}
                />
              </div>
            );
          })}
        </ReactSimplyCarousel>
      </div>
    </div>
  );
};

export default Contributors;
