import React from 'react';
import Navbar from 'app/components/navbar';
import BasicRoutes from 'app/routes/BasicRoutes';
import './index.scss';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Navbar />
      <BasicRoutes />
      <Toaster/>
    </>
  );
}

export default App;
