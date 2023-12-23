

import { useEffect } from 'react';
import { CLIENT_ID } from '../../envConstants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login } from 'app/api/login';
import { useQuery } from 'react-query';
import {getUser } from 'app/api/user';
import toast from 'react-hot-toast';


const Login = () => {
  const [searchParam, ] = useSearchParams();
  const navigate = useNavigate();

   const token=localStorage.getItem('token')
   const checklogin=async()=>{
    if(token!=null){
     try{
      const userData= await getUser(token);
       navigate('/')
       
     }catch(e){
       navigate('/login')
     }
      
    }
   }

  useEffect(()=>{
         checklogin()
  },[])
  
   

  const loginFunc= async()=>{

      if(searchParam.get('code')!==null){
        console.log("hello")
        const code:string= searchParam.get('code')!;
        const loginData= await login(code);
        const token= loginData.data.token
        localStorage.setItem('token',token)
        toast.success('Login successfull')
        navigate("/")
      }
   
  }

  const {isError}=useQuery({
    queryFn: ()=>loginFunc(),
    queryKey:"loginData"
  })

  if(isError){
    toast.error('Some error occured')
     navigate("/login")
  }

  function loginWithGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID
    );
  }

  return (
    <div>
      <button onClick={loginWithGithub}>Login Witth Github</button>
    </div>
  );
};

export default Login;
