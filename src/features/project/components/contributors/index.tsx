import React, { useState } from 'react';
import './index.scss';
import ContributorCard from '../contributorCard';
import next_contributor from 'app/assets/images/next_contributor.svg';
import previous_contributor from 'app/assets/images/previous_contributor.svg';
import { mockData } from 'app/utils/data';
import mockdatatypes from 'app/models/mockDataTypes';
import ReactSimplyCarousel from 'react-simply-carousel';

const btn_style = {
  alignSelf: 'center',
  background: 'none',
  border: 'none',
};

const Contributors = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
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
          itemsToShow={3}
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
          {mockData.map((e: mockdatatypes) => {
            return (
              <div
                key={e.id}
                style={{
                  padding: '1em',
                  paddingTop: '2em',
                }}
              >
                <ContributorCard
                  Name={e.Name}
                  PR={e.PR}
                  Issues={e.Issues}
                  Commits={e.Commits}
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
