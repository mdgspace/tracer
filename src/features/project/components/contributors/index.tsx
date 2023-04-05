import React, { useState } from 'react';
import './index.scss';
import ContributorCard from '../contributorCard';
import nextContributor from 'app/assets/images/next_contributor.svg';
import { mockData } from 'app/utils/data';
import mockdatatypes from 'app/models/mockDataTypes';
import ReactSimplyCarousel from 'react-simply-carousel';

const btn_style = {
  alignSelf: 'center',
  background: 'white',
  border: 'none',
  borderRadius: '50%',
  color: 'black',
  cursor: 'pointer',
  fontSize: '20px',
  height: 30,
  lineHeight: 1,
  TextAlign: 'center',
  width: 30,
};

const Contributors = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  return (
    <div className='contributor-container'>
      <h3 className='contributor-title'>Contributors</h3>
      <div className='contributor-card-container'>
        <ReactSimplyCarousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          infinite={true}
          itemsToShow={3}
          itemsToScroll={1}
          forwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: { ...btn_style },
            children: <span>{`>`}</span>,
          }}
          backwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: { ...btn_style },
            children: <span>{`<`}</span>,
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
              <div key={e.id} style={{ padding: '1em', paddingTop: '2em' }}>
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
