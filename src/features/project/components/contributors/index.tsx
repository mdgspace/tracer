import React from 'react';
import './index.scss';
import ContributorCard from '../contributorCard';
import nextContributor from 'app/assets/images/next_contributor.svg';
import { mockData } from 'app/utils/data';
import mockdatatypes from 'app/models/mockDataTypes';

const Contributors = () => {
  return (
    <div className='contributors'>
      <span className='contributor-title'>Contributor</span>
      <div className='contributor-cards'>
        {mockData.map((e: mockdatatypes, index: number) => {
          if (index < 4) {
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

        <div className='next-contributors'>
          <img src={nextContributor} alt='nextContributor' />
        </div>
      </div>
    </div>
  );
};

export default Contributors;
