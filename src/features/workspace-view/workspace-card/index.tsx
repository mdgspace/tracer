import React, { useEffect, useState } from 'react';
import './index.scss';
import rightNavbtn from '../../../app/assets/images/right_navigation_button.svg';
import { getOrg, getOrgMembers } from 'app/api/organization';
import { deleteFile, getIcon } from 'app/api/file';
import { getMembers } from 'app/api/project';

type workspaceCardProps = {
  workspaceName: string;
  role: string;
  archeive: boolean;
  bookmark: boolean;
  archeives: boolean;
}
interface members{
  [username: string]: string
}
const WorkspaceCard = (props: workspaceCardProps) => {
  const { workspaceName, role, archeive, bookmark ,archeives} = props;
  const [description,setDescription] = useState<null | string>(null)
  const [showPopUp, setShowPopUp] = useState(false);
  const token= localStorage.getItem('token')
  const [fileName, setFileName]= useState<string|null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [members, setMembers]= useState<members|null>(null)
  const workSpaceData= async()=>{
          if(token&&workspaceName&&!workspaceName.endsWith("-userspace")){
           try{
     
            const workspace_data = await getOrg(token, workspaceName)
            
            setDescription(workspace_data.data.description)
            
           }catch(e){
            
           }
           try{
              const image_data= await getIcon(token,workspaceName)
              const objectUrl= URL.createObjectURL(image_data.data)
              setImageSrc(objectUrl)
           
           }catch(e){

           }
           try{
             const members_data= await getOrgMembers(token, workspaceName)
             setMembers(members_data.data.members)
           }catch(e){

           }
           
          }
  }

    useEffect(()=>{
    workSpaceData()
  },[workspaceName])

  

  return (
    <>
 { (archeive==archeives)&&<div className='workspace-card'>
      <div className='workspace-card-body'>
        <div
          className='workspace-popup-btn'
          onClick={() => setShowPopUp(showPopUp ? false : true)}
        >
          {!workspaceName.endsWith("-userspace")&&<img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51T-25-1BBmDvoLRWJYNK3P6AENpJBslAp9n_QDXRnA&usqp=CAU&ec=48665701'
            alt=''
          />}
        </div>
        <div className={showPopUp ? 'workspace-popup' : 'hide'}>
          <div className='pin'>Pin</div>
          <div className='archive'>archive</div>
          <div className='delete' >delete</div>
        </div>
        <div className='workspace-card-utils'>
          <div className='workspace-logo'>
            <img src={imageSrc?imageSrc:"https://pngimg.com/uploads/github/github_PNG80.png"} alt='' />
          </div>
          <div className='workspace-members'>
            <div className='workspace-title'>{workspaceName.endsWith("-userspace")?"USER's WORKSPACE":workspaceName}</div>
            <div className='workspace-members-imgs'>img</div>
            <div>{members?Object.keys(members).length:0} members</div>
          </div>
        </div>
        <div className='workspace-description'>
          {workspaceName.endsWith("-userspace")&&"User's private workspace"}
          {description?description.substring(0, 120) + '...':<></>}
        </div>
        <div className='workspace-details-btn'>
          <img src={rightNavbtn} alt='' />
        </div>
      </div>
    </div>}
    </>
  );
};

export default WorkspaceCard;
