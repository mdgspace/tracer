import React from 'react';
import Navbar from 'app/components/navbar';
import BasicRoutes from 'app/routes/BasicRoutes';
import './index.scss';

function App() {
  return (
    <>
      <Navbar />
      <BasicRoutes />
    </>
  );
}

export default App;
