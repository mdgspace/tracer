import React from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Prop{
  spaceName: string | undefined
}
const BackNavigation: React.FC<Prop> = ({spaceName}) => {

  const navigate= useNavigate()
  return (
    <div className='back-title-container' >
      <button className='button'onClick={()=>navigate(`/workspace/${spaceName}`)}>
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='20'
            viewBox='0 0 17 14'
            fill='none'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M6.75811 13.0503C6.48962 13.3188 6.05432 13.3188 5.78584 13.0503L0.221671 7.48618C0.0927395 7.35725 0.0203065 7.18238 0.0203065 7.00004C0.0203065 6.81771 0.0927395 6.64284 0.221671 6.51391L5.78584 0.949741C6.05432 0.681255 6.48962 0.681255 6.75811 0.949741C7.02659 1.21823 7.02659 1.65353 6.75811 1.92201L1.68008 7.00004L6.75811 12.0781C7.02659 12.3466 7.02659 12.7819 6.75811 13.0503Z'
              fill='white'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M16.979 7.00006C16.979 7.37976 16.6712 7.68756 16.2915 7.68756L0.864004 7.68756C0.484308 7.68756 0.176504 7.37976 0.176504 7.00006C0.176504 6.62037 0.484308 6.31256 0.864004 6.31256L16.2915 6.31256C16.6712 6.31256 16.979 6.62036 16.979 7.00006Z'
              fill='white'
            />
          </svg>
        </span>{' '}
        Back
      </button>
      <h1 className='title'>
        Project <span className='arrow'>{'->'}</span> Manage
      </h1>
    </div>
  );
};

export default BackNavigation;
