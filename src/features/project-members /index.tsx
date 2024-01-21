import { useParams } from 'react-router-dom';
import BackNavigation from './components/BackNavigation';
import MemberCard from './components/MemberCard';
import Options from './components/Options';
import './index.scss';
import { useEffect, useState } from 'react';
import { getOrgMembers } from 'app/api/organization';
import { AVATAR_URL } from 'app/constants/api';
import { AVATAR_API } from 'envConstants';
import { getMembers } from 'app/api/project';
const ProjectMembers = () => {

  const {spaceName, projectName} = useParams()
  const token= localStorage.getItem('token')
  const [orgMembers, setOrgMembers]= useState<{[username:string]:string} | null>(null)
  const [projectMembers, setProjectMembers]= useState<{[username: string]:string} | null>(null)

  const dataFetch= async()=>{
    try{
      if(spaceName&&token&&projectName){
        const projectMemRes= await getMembers(token,projectName ,spaceName)
        setProjectMembers(projectMemRes.data.members)
        const orgMemRes = await getOrgMembers(token, spaceName)
        setOrgMembers(orgMemRes.data.members)     

      }
    }catch(e){

    }
  }
  useEffect(()=>{
    dataFetch()
  },[ setOrgMembers, setProjectMembers ])
  
  return (
    spaceName&&projectName&&<div className='members-page-container'>
      <BackNavigation spaceName={spaceName}/>
      <div className='member-view'>
        <Options spaceName={spaceName} projectName={projectName} orgMembers={orgMembers} projectMembers={projectMembers}/>
        <div className='members-list'>
          {orgMembers&&projectMembers&&Object.entries(projectMembers).map(([key, value])=>{
            return <MemberCard
            image={
              AVATAR_URL + '/' + key + '.png?apikey=' + AVATAR_API
            }
            name={key}
            key={key}
            role={value}
            spaceName={spaceName}
            orgMembers={orgMembers}
            projectMembers={projectMembers}
            setProjectMembers={setProjectMembers}
            projectName= {projectName}
          />
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectMembers;
