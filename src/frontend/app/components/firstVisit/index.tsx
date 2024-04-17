import { useEffect, useState } from 'react';
import Popup from '../popup';
import './index.scss';

export default function FirstVisit() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const visit = localStorage.getItem('visit');
    if (visit !== 'true') {
      localStorage.setItem('visit', 'true');

      setShow(true);
    }
  }, []);

  return (
    <>
      {show && (
        <Popup
          title={'Welcome to Activity Leaderboard!'}
          onClose={() => setShow(false)}
          footer={
            <div className='modal-footer'>
              <h1>
                Google Summer of Code is a global, online program focused on
                bringing new contributors into open source software development.
              </h1>
              <a
                href='https://summerofcode.withgoogle.com/'
                target='blank'
                className='firstvisit-btn'
              >
                Visit GSOC
              </a>
            </div>
          }
          popup_zindex={{ overlay: 3000, modal: 4000 }}
        />
      )}
    </>
  );
}
