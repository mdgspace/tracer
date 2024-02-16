import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import rightNavbtn from '../../../app/assets/images/right_navigation_button.svg';
import { deleteOrg, getOrg, getOrgMembers } from 'app/api/organization';
import { deleteFile, getIcon, getIconName } from 'app/api/file';
import { getMembers } from 'app/api/project';
import UserContext from 'app/context/user/userContext';
import toast from 'react-hot-toast';
import {
  UserOrgDetails,
  UserOrgs,
  setOrgArcheiveStatus,
  setOrgBookmarkStatus,
} from 'app/api/user';
import { useNavigate } from 'react-router-dom';
import { AVATAR_API } from 'envConstants';
import { AVATAR_URL } from 'app/constants/api';
type workspaceCardProps = {
  workspaceName: string;
  role: string;
  archeive: boolean;
  bookmark: boolean;
  archeives: boolean;
};

interface members {
  [username: string]: string;
}

const WorkspaceCard = (props: workspaceCardProps) => {
  const { workspaceName, role, archeive, bookmark, archeives } = props;
  const [description, setDescription] = useState<null | string>(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const token = localStorage.getItem('token');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [members, setMembers] = useState<members | null>(null);
  const [membersArray, setMembersArray]= useState<{username:string}[]>([]);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const workSpaceData = async () => {
    if (token && workspaceName && !workspaceName.endsWith('-userspace')) {
      try {
        const workspace_data = await getOrg(token, workspaceName);

        setDescription(workspace_data.data.description);
      } catch (e) {}
      try {
        const image_data = await getIcon(token, workspaceName);
        const objectUrl = URL.createObjectURL(image_data.data);
        setImageSrc(objectUrl);
      } catch (e) {}
      try {
        const members_data = await getOrgMembers(token, workspaceName);
        setMembers(members_data.data.members);
        const membersArray = Object.entries(members_data.data.members).map(([username]) => ({ username }));
        setMembersArray(membersArray)


      } catch (e) {}

      try{

        const iconRes= await getIconName(token, workspaceName)
        const fileName= iconRes.data.message
        const deleteRes= await deleteFile(token, fileName)
      }catch(e){}
    }
  };


  const HandleDelete = async () => {
    if (!workspaceName.endsWith('-userspace') && token) {
      const func = async () => {
        const res = await deleteOrg(token, workspaceName);
        const orgs = userContext?.userOrgs;

        if (orgs?.userOrgs.hasOwnProperty(workspaceName)) {
          const obj: UserOrgDetails = orgs.userOrgs;
          delete obj[workspaceName];
          userContext?.setUserOrgs({
            userOrgs: obj,
          });
        }
      };
      toast.promise(func(), {
        loading: 'Deleting',
        success: <b>Successfully Deleted</b>,
        error: <b>Error while deleting</b>,
      });
    }
  };

  const HandlePin = async () => {
    if (!workspaceName.endsWith('-userspace') && token) {
      const initBmk = bookmark;
      const func = async () => {
        let status: { [key: string]: boolean } = {
          [workspaceName]: !bookmark,
        };

        const res = await setOrgBookmarkStatus(token, status);
        const orgs = userContext?.userOrgs;
        if (orgs?.userOrgs.hasOwnProperty(workspaceName)) {
          orgs.userOrgs[workspaceName].bookmark = (!bookmark).toString();
          userContext?.setUserOrgs(orgs);
        }
      };
      if (initBmk) {
        toast.promise(func(), {
          loading: 'Unpinning',
          success: <b>Successfully unpinned</b>,
          error: <b>Error while unpinning</b>,
        });
      } else {
        toast.promise(func(), {
          loading: 'Pinning',
          success: <b>Successfully pinned</b>,
          error: <b>Error while pinning</b>,
        });
      }
    }
  };

  const HandleArchive = async () => {
    if (!workspaceName.endsWith('-userspace') && token) {
      const initArc = archeive;
   
      const func = async () => {
        const status: { [key: string]: boolean } = {
          [workspaceName]: (!archeive),
        };
    
  
         const res = await setOrgArcheiveStatus(token, status);
     
      
        const orgs = userContext?.userOrgs;
        if (orgs?.userOrgs.hasOwnProperty(workspaceName)) {
          orgs.userOrgs[workspaceName].archeive= (!archeive).toString();
          userContext?.setUserOrgs(orgs);
        }
      };
      if (!initArc) {
        toast.promise(func(), {
          loading: 'Archiving',
          success: <b>Successfully archived</b>,
          error: <b>Error</b>,
        });
      } else {
        toast.promise(func(), {
          loading: 'Unarchiving',
          success: <b>Successfully unarchived</b>,
          error: <b>Error</b>,
        });
      }
    }
  };
  useEffect(() => {
    workSpaceData();
  }, [ userContext?.setUserOrgs ]);


  return (
    <>
      {archeive == archeives && (
        <div className='workspace-card'>
          <div className='workspace-card-body'>
            <div
              className='workspace-popup-btn pointer'
              onClick={() => setShowPopUp(showPopUp ? false : true)}
            >
              {!workspaceName.endsWith('-userspace') && (
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51T-25-1BBmDvoLRWJYNK3P6AENpJBslAp9n_QDXRnA&usqp=CAU&ec=48665701'
                  alt=''
                />
              )}
            </div>
            <div className={showPopUp ? 'workspace-popup' : 'hide'}>
              <div className='pin pointer' onClick={HandlePin}>
                {bookmark ? 'UnPin' : 'Pin'}
              </div>
              <div className='archive pointer' onClick={HandleArchive}>
                {archeive ? 'Unarchive' : 'archive'}
              </div>
              {members &&
                userContext?.username &&
                members[userContext?.username.toString()] === 'admin' && (
                  <div className='delete pointer' onClick={HandleDelete}>
                    delete
                  </div>
                )}
              {members &&
                userContext?.username &&
                members[userContext?.username.toString()] === 'admin' && (
                  <div
                    className='Edit pointer'
                    onClick={() => navigate(`/editWorkspace/${workspaceName}`)}
                  >
                    edit
                  </div>
                )}
            </div>
            <div className='workspace-card-utils'>
              <div className='workspace-logo'>
                <img
                  src={
                    imageSrc
                      ? imageSrc
                      : 'https://pngimg.com/uploads/github/github_PNG80.png'
                  }
                  alt=''
                />
              </div>
              <div className='workspace-members'>
                <div className='workspace-title'>
                  {workspaceName.endsWith('-userspace')
                    ? "USER's WORKSPACE"
                    : workspaceName}
                </div>
                <div className='members-view-container pointer' onClick={()=>navigate(`/workspaceMembers/${workspaceName}`)}>
                  <div className='workspace-members-imgs'>
                    <div className='image-stack'>
                      { membersArray.length > 0 ? (
                        membersArray.slice(0, 4).map((obj) => {
                          const url =
                            AVATAR_URL +
                            '/' +
                            obj.username +
                            '.png?apikey=' +
                            AVATAR_API;
                          return (
                            <img
                              key={obj.username}
                              className='project-image'
                              src={url}
                            />
                          );
                        })
                      ) : (
                        <>
                          <div className='invisible-height'></div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>{members ? Object.keys(members).length : 0} members</div>
                </div>
              </div>
            </div>
            <div className='workspace-description'>
              {workspaceName.endsWith('-userspace') &&
                "User's private workspace"}
              {description ? description.substring(0, 120) + '...' : <></>}
            </div>
            <div className='workspace-details-btn'>
              <img
                src={rightNavbtn}
                className='pointer'
                onClick={() => navigate(`/workspace/${workspaceName}`)}
                alt=''
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkspaceCard;
