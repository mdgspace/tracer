import React, { useEffect, useState } from 'react';
import gold from 'app/assets/images/gold.svg';
import silver from 'app/assets/images/silver.svg';
import bronze from 'app/assets/images/bronze.svg';
import { mockData } from 'app/utils/data';
import { sortJSON } from 'app/utils/sort';
import leftNavButton from 'app/assets/images/left_navigation_button.svg';
import rightNavButton from 'app/assets/images/right_navigation_button.svg';
import mockdatatypes from 'app/models/mockDataTypes';
import './index.scss';
import { Contributors } from 'app/api/githubData';

interface Prop {
  weekly: boolean;
  weeklyOrgRank: Contributors | null;
  monthlyOrgRank: Contributors | null;
}

const LeaderBoard: React.FC<Prop> = ({
  weekly,
  weeklyOrgRank,
  monthlyOrgRank,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const newMockData = sortJSON(mockData);

  const [items, setItems] = useState(mockData);
  const itemsPerPage = 4;

  const [itemsLength, setItemsLength] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  // const pageCount = Math.ceil(itemsLength / itemsPerPage);

  const handlePageClick = (_pageNumber: number) => {
    if (_pageNumber >= 1 && _pageNumber <= pageCount) {
      const newOffset = ((_pageNumber - 1) * itemsPerPage) % itemsLength;
      setItemOffset(newOffset);
      setPageNumber(_pageNumber);
    }
  };

  useEffect(() => {
    if (weekly && weeklyOrgRank) {
    }
  }, [weekly, weeklyOrgRank, monthlyOrgRank]);

  return (
    <div className='leaderboard-cont'>
      <div className='leaderboard-main-cont'>
        <div className='member title'>
          <div className='rank-title'></div>
          <div className='name-title'>Name</div>
          <div className='work-title'>PR</div>
        </div>

        {items
          .slice(itemOffset, itemOffset + itemsPerPage)
          .map((e: mockdatatypes) => {
            if (e.Rank <= 3) {
              return (
                <div className='member' key={e.Name}>
                  <div className='rank'>
                    <img
                      src={e.Rank == 1 ? gold : e.Rank == 2 ? silver : bronze}
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
        <div>
          <div className='leaderboard-footer'>
            <img
              src={leftNavButton}
              alt='leftNavbutton'
              onClick={() => handlePageClick(pageNumber - 1)}
            />
            <span>{pageNumber}</span>
            <img
              src={rightNavButton}
              alt='rightNavbutton'
              onClick={() => handlePageClick(pageNumber + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
