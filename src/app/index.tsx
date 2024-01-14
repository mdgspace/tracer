import Navbar from 'app/components/navbar';
import BasicRoutes from 'app/routes/BasicRoutes';
import './index.scss';
import toast, { Toaster } from 'react-hot-toast';
import { getUser } from './api/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import UserContext from './context/user/userContext';

function App() {

  const navigate= useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const userContext= useContext(UserContext);
  const token= localStorage.getItem('token');
  const checklogin= async ()=>{
    if(token!=null){
      try{
        const userData= await getUser(token);
        userContext?.setUsername(userData.data.message);
        if(currentPath=="/login"){
          navigate("/");
        }
      } catch(e){
         localStorage.removeItem('token')
         if(currentPath!="/login"){
          toast.error("Session expired")
          navigate("/login");
         }
      }
    }else{
      if(currentPath!="/login"){
        toast.error("Not authenticated")
        navigate("/login")
      }
    }
  }
  const {} = useQuery("login", checklogin, {
    enabled: true,
    staleTime: Infinity
  })

  return (
    <>
      <Navbar />
      <BasicRoutes />
      <Toaster />
    </>
  );
}

export default App;
