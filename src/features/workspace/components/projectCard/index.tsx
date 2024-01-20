import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { deleteProject, getMembers, getProject } from 'app/api/project';
import { useQuery } from 'react-query';
import { GetProject } from 'app/api/project';
import { ProjectMembers } from 'app/api/project';
import { AVATAR_URL } from 'app/constants/api';
import { AVATAR_API } from 'envConstants';
import UserContext from 'app/context/user/userContext';
import { setArcheiveStatus } from 'app/api/organization';
import toast from 'react-hot-toast';
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
  const userContext = useContext(UserContext);
  const [pin, setPin] = useState<boolean>(status.archeive);
  const [archive, setArchive] = useState<boolean>(status.bookmark);
  const fetchProjectData = async () => {
    if (token != null) {
      const project_data = await getProject(token, projectName, orgName);
      return project_data.data;
    } else {
      return null;
    }
  };

  const fetchProjectMembers = async () => {
    if (token != null) {
      const members = await getMembers(token, projectName, orgName);
      const myArray = Object.entries(members.data.members).map(([key, value]) => ({ key, value }));

      return myArray;
    }
  };

  const { data: project_data } = useQuery(
    `${projectName}${orgName}`,
    fetchProjectData,
    {
      enabled: true,
      staleTime: Infinity,
    }
  );
  const { data: project_members } = useQuery(
    `${projectName}${orgName}Members`,
    fetchProjectMembers,
    {
      enabled: true,
      staleTime: Infinity,
    }
  );

  const PinHandler = async () => {
    if (token && orgName) {
      let initial = pin;
      const func = async () => {
        const res = await setArcheiveStatus(token, orgName, {
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

  return (
    <div className='projectcard'>
      <h1>{projectName}</h1>
      <p>{project_data ? project_data.description : <></>}</p>
      {(userContext?.userOrgs?.userOrgs[orgName].role === 'admin' ||
        userContext?.userOrgs?.userOrgs[orgName].role === 'manager') && (
        <div>
          <button onClick={PinHandler}>{pin?"Unpin":"Pin"}</button>
          <button onClick={ArchiveHandler}>{archive?"Unarchive":"Archive"}</button>
          <button onClick={DeleteHandler}>Delete</button>
        </div>
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

      <div className='image-stack'>
        
        {
        project_members&&project_members.length>0 ?
          project_members
            .slice(0, 4)
            .map((obj) => {
            
              const url = AVATAR_URL + '/' + obj.key + '.png?apikey=' + AVATAR_API;
              return <img key={obj.key} className='project-image' src={url} />;
            }):<><div className='invisible-height'></div></>}
      </div>
    </div>
  );
};

export default ProjectCard;
