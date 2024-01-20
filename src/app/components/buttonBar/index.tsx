import React, { useState } from 'react';
import TimeRangeSwitch from 'app/components/timeRangeSwitch';

import './index.scss';
interface Props{
  weekly: boolean,
  setWeekly: (week:boolean)=>void
  
}
const ButtonBar = () => {
  const [weeky, setWeekly] = useState<boolean>(true);
  return (
    <div className='project-upper-cont'>
      <div className='button-bar'>
        <button className='back-btn'>&larr; Back</button>
        <TimeRangeSwitch weekly={weeky} setWeekly={setWeekly} />
      </div>
      <h1>Appetizer</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
        officiis aut. Expedita doloremque itaque quae perspiciatis ratione aut
        tempora mollitia obcaecati saepe. Quam sapiente odio molestias eos at
        nisi dolorum. At corporis dolore, explicabo et eveniet facilis amet sit
        reiciendis quae officia quam vel quisquam in blanditiis ad, id
        praesentium voluptates ipsum! Sunt magni placeat maiores libero non
        fugiat veniam? Voluptatibus blanditiis ipsum enim eum, exercitationem
        culpa quidem unde ex consectetur dignissimos quae libero cumque! Quis
        eveniet unde, necessitatibus sit corrupti eius saepe nobis magnam et
        tempore architecto libero dolorum?
      </p>
    </div>
  );
};

export default ButtonBar;
