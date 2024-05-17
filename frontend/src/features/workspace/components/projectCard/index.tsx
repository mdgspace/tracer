import  { useContext, useEffect, useState } from 'react';
import './index.scss';
import { deleteProject, getMembers, getProject } from 'app/api/project';
import { FaBookmark } from "react-icons/fa";
import { GetProject } from 'app/api/project';
import { AVATAR_URL } from 'app/constants/api';
import { AVATAR_API } from 'envConstants';
import UserContext from 'app/context/user/userContext';
import { setArcheiveStatus, setBookmarkStatus } from 'app/api/organization';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import rightNavbtn from '../../../../app/assets/images/right_navigation_button.svg';
import { UserOrgs, getUserOrgs } from 'app/api/user';
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
  const [userOrgs, setUserOrgs] = useState<UserOrgs>({} as UserOrgs);
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
        status.bookmark = !pin;
        const temp = userOrgs;
        Object.entries(temp.userOrgs).map(([org]) => {
          if (org === orgName) {
            if (temp.userOrgs[org].bookmark === "true" ) {
              temp.userOrgs[org].bookmark = "false";
            }
            else {
              temp.userOrgs[org].bookmark = "true";
            }
          }
        });
        setUserOrgs(userOrgs => {
          return userOrgs = {...temp}
        });
        userContext?.setUserOrgs(userOrgs);
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
        status.archeive = !archive;
        const temp = userOrgs;
        Object.entries(temp.userOrgs).map(([org]) => {
          if (org === orgName) {
            if (temp.userOrgs[org].archeive === "true" ) {
              temp.userOrgs[org].archeive = "false";
            }
            else {
              temp.userOrgs[org].archeive = "true";
            }
          }
        });
        setUserOrgs(userOrgs => {
          return userOrgs = {...temp}
        });
        userContext?.setUserOrgs(userOrgs);
        
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
        // TODO update local state
        if (userOrgs) {Object.entries(userOrgs.userOrgs)
            .map(([org]) =>{
          })
      };}
      toast.promise(func(), {
        loading: 'On progress',
        success: <b>Successfully deleted</b>,
        error: <b>Unable to delete</b>,
      });
    }
  };
  const fetchData = async () => {
    if (token && userContext?.username) {
      try {
        const userOrgsRes = await getUserOrgs(
          token,
          userContext?.username.toString()
        );
        userContext?.setUserOrgs(userOrgsRes.data);
        setUserOrgs(userOrgsRes.data);
      } catch (e) {}

    }
  };
  useEffect(() => {
    fetchProjectData();
    fetchProjectMembers();
    fetchData();
  }, []);
  

  return (
    <div className='projectcard'>
       
       <div className='pinDiv'>
       {pin && <FaBookmark/>}
       </div>
      <h1>{projectName}</h1>
      <p>{project ? project.description : <></>}</p>

      {(userContext?.userOrgs?.userOrgs[orgName].role === 'admin' ||
        userContext?.userOrgs?.userOrgs[orgName].role === 'manager') && (
          <div>
          <div
            className='workspace-popup-btn pointer'
            onClick={() => setShowPopUp(!showPopUp)}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB8ElEQVR4nO3bTS5DUQCG4S6C+N0PaSyEin2YGghiZguKnZTYhJ+aCPLK1TswEc7tPfKF90kkHbRNky85bm/zDgaSJEnSB2Ad2AWugGvgqf1rHl8Co+Y5s2erGmAROABe+N4bcAasOEmdMbaAB8o1rxk6Sr9jjIBXumteu+Mo/YyxOecYn4+wLUeZb4zVjsfUV+6BZUfpPsgp/TtykO6Xti8VBmnec81RygfZo56Rg5QPcllxkLGDlA9yW3GQGwcpH2RacZCpg5QP8lhxkAcHKR/kpuIgEwcpH+Si4iDnDlI+yG7FQbYdJOuL4aqDdAAcVxjk0DE6AlbaG4J9uQOWHGQOwIa338MAOz38QOU/8p5HGXY8vppjarPXD6MZYAHYB55/eDV14g9SvwBYa4+x5svjpL3vNW0fj5vjyUtbSZIkSfrDsA/JgH1IDuxDcmAfkgP7kBzYh2TBPiQH9iFZsA/Jgn1IFuxDsmAfkgX7kCzYh2TBPiQL9iFZsA/Jg31IFuxD8mAfkgf7kDzYh+TBPiQT9iGSJEmS9L9hH5IB+5Ac2IfkwD4kB/YhObAPyYJ9SA7sQ7JgH5IF+5As2IdkwT4kC/YhWbAPyYJ9SBbsQ7JgH5IH+5As2IfkwT4kD/YhebAPyYN9SCbsQyRJkjQo8Q6ntzHvrrTO1wAAAABJRU5ErkJggg==" />
          </div>
          {showPopUp && <div className={'workspace-popup'}>
            <div className='pin pointer' onClick={PinHandler}>
              {pin ? 'Unpin' : 'Pin'}
            </div>
            <div className='archive pointer' onClick={ArchiveHandler}>
              {archive ? 'Unarchive' : 'Archive'}
            </div>
            <div
              className='pin pointer'
              onClick={() => navigate(`/editProject/${orgName}/${projectName}`)}
            >
              Edit
            </div>
            <div className='delete pointer' onClick={DeleteHandler}>
              Delete
            </div>
          </div>}
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

      {orgName && !orgName.endsWith('-userspace') && (
        <div
          className='image-stack pointer'
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
        <div className='workspace-details-btn '>
          <img
            src={rightNavbtn}
            className='pointer'
            onClick={() => navigate(`/project/${orgName}/${projectName}`)}
            alt=''
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
