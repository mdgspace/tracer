import React from 'react';
import './index.scss';
import ContributorCard from '../contributorCard';
import nextContributor from 'app/assets/images/next_contributor.svg';
import { mockData } from 'app/utils/data';
import mockdatatypes from 'app/models/mockDataTypes';

const Contributors = () => {
  return (
    <div className='contributors'>
      <h3 className='contributor-title'>Contributors</h3>
      {/* <div className='contributor-cards'>
        {mockData.map((e: mockdatatypes, index: number) => {
          if (index < 1) {
            return (
              <ContributorCard
                key={e.id}
                Name={e.Name}
                PR={e.PR}
                Issues={e.Issues}
                Commits={e.Commits}
              />
            );
          } else {
            return <></>;
          }
        })}
      </div> */}
    </div>
  );
};

export default Contributors;
