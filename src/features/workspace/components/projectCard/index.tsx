import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { deleteProject, getMembers, getProject } from 'app/api/project';
import { FaBookmark } from "react-icons/fa";
import { useQuery } from 'react-query';
import { GetProject } from 'app/api/project';
import { ProjectMembers } from 'app/api/project';
import { AVATAR_URL } from 'app/constants/api';
import { AVATAR_API } from 'envConstants';
import UserContext from 'app/context/user/userContext';
import { setArcheiveStatus, setBookmarkStatus } from 'app/api/organization';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import rightNavbtn from '../../../../app/assets/images/right_navigation_button.svg';
import { pipeline } from 'stream';
interface Props {
  projectName: string;
  orgName: string;
  status: {
    archeive: boolean;
    bookmark: boolean;
  };
  githubData: {
    pulls: number;
    commits: number;
    issues: number;
  } | null;
}

const ProjectCard: React.FC<Props> = ({
  projectName,
  orgName,

  status,
  githubData,
}) => {
  const token = localStorage.getItem('token');
  const [showPopUp, setShowPopUp] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [pin, setPin] = useState<boolean>(status.bookmark);
  const [archive, setArchive] = useState<boolean>(status.archeive);
  const [project, setProject] = useState<GetProject | null>(null);
  const [projectMembers, setProjectMembers] = useState<
    { key: string; value: string }[]
  >([]);

  const fetchProjectData = async () => {
    if (token != null) {
      const project_data = await getProject(token, projectName, orgName);
      setProject(project_data.data);
    }
  };

  const fetchProjectMembers = async () => {
    if (token != null) {
      const members = await getMembers(token, projectName, orgName);
      const myArray = Object.entries(members.data.members).map(
        ([key, value]) => ({ key, value })
      );

      setProjectMembers(myArray);
    }
  };

  const PinHandler = async () => {
    if (token && orgName) {
      let initial = pin;
      const func = async () => {
        const res = await setBookmarkStatus(token, orgName, {
          [projectName]: !pin,
        });
        setPin(!pin);
      };

      if (initial) {
        toast.promise(func(), {
          loading: 'On progress',
          success: <b>Project Unpinned</b>,
          error: <b>unable to unpin</b>,
        });
      } else {
        toast.promise(func(), {
          loading: 'On progress',
          success: <b>Project pinned</b>,
          error: <b>unable to pin</b>,
        });
      }
    }
  };

  const ArchiveHandler = async () => {
    if (token && orgName) {
      let initial = archive;
      const func = async () => {
        const res = await setArcheiveStatus(token, orgName, {
          [projectName]: !archive,
        });
        setArchive(!archive);
      };

      if (initial) {
        toast.promise(func(), {
          loading: 'On progress',
          success: <b>Project Unarchived</b>,
          error: <b>unable to Unarchive</b>,
        });
      } else {
        toast.promise(func(), {
          loading: 'On progress',
          success: <b>Project archived</b>,
          error: <b>Unable to arhive</b>,
        });
      }
    }
  };

  const DeleteHandler = async () => {
    if (token && orgName) {
      const func = async () => {
        const res = await deleteProject(token, projectName, orgName);
      };
      toast.promise(func(), {
        loading: 'On progress',
        success: <b>Successfully deleted</b>,
        error: <b>Unable to delete</b>,
      });
    }
  };
  useEffect(() => {
    fetchProjectData();
    fetchProjectMembers();
  }, [userContext?.setUsername, userContext?.setUserOrgs]);

  return (
    <div className='projectcard'>
       
       <div className='pinDiv'>
       {pin&&<FaBookmark/>}
       </div>
      <h1>{projectName}</h1>
      <p>{project ? project.description : <></>}</p>

      {(userContext?.userOrgs?.userOrgs[orgName].role === 'admin' ||
        userContext?.userOrgs?.userOrgs[orgName].role === 'manager') && (
        <>
       
          <div
            className='workspace-popup-btn'
            onClick={() => setShowPopUp(showPopUp ? false : true)}
          >
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51T-25-1BBmDvoLRWJYNK3P6AENpJBslAp9n_QDXRnA&usqp=CAU&ec=48665701'
              alt=''
            />
          </div>
          <div className={showPopUp ? 'workspace-popup' : 'hide'}>
            <div className='pin' onClick={PinHandler}>
              {pin ? 'Unpin' : 'Pin'}
            </div>
            <div className='archive' onClick={ArchiveHandler}>
              {archive ? 'Unarchive' : 'Archive'}
            </div>
            <div
              className='pin'
              onClick={() => navigate(`/editProject/${orgName}/${projectName}`)}
            >
              Edit
            </div>
            <div className='delete' onClick={DeleteHandler}>
              Delete
            </div>
          </div>
        </>
      )}
      <div className='projectcard-status'>
        <div>
          <span>Pull Requests</span>
          <span>{githubData ? githubData.pulls : <></>}</span>
        </div>
        <div>
          <span>Commits</span>
          <span>{githubData ? githubData.commits : <></>}</span>
        </div>
        <div>
          <span>Issues</span>
          <span>{githubData ? githubData.issues : <></>}</span>
        </div>
      </div>

      {orgName && !orgName.endsWith('-userspace') && (
        <div
          className='image-stack'
          onClick={() => navigate(`/projectMembers/${orgName}/${projectName}`)}
        >
          {projectMembers && projectMembers.length > 0 ? (
            projectMembers.slice(0, 4).map((obj) => {
              const url =
                AVATAR_URL + '/' + obj.key + '.png?apikey=' + AVATAR_API;
              return <img key={obj.key} className='project-image' src={url} />;
            })
          ) : (
            <>
              <div className='invisible-height'>add Members</div>
            </>
          )}
        </div>
      )}
      {orgName && !orgName.endsWith('-userspace') && (
        <div className='workspace-details-btn'>
          <img
            src={rightNavbtn}
            onClick={() => navigate(`/project/${orgName}/${projectName}`)}
            alt=''
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
