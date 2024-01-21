import { changeOrgMembersStatus, removeOrgMembers } from 'app/api/organization';
import { changeProjectMembersStatus, removeProjectMembers } from 'app/api/project';
import UserContext from 'app/context/user/userContext';
import { ChangeEvent, ChangeEventHandler, ReactEventHandler, useContext } from 'react';
import toast from 'react-hot-toast';

const MemberCard = ({
  image,
  name,
  role,
  orgMembers,
  setProjectMembers,
  projectMembers,
  projectName,
  spaceName,
}: {
  image: string;
  name: string;
  role: string;
  spaceName: string;
  projectName: string;
  orgMembers: { [username: string]: string } | null;
  projectMembers: { [username: string]: string } | null,
  setProjectMembers: (projectMembers: { [username: string]: string }) => void;
}) => {
  const token = localStorage.getItem('token');
  const userContext = useContext(UserContext);
  const handleRemove = async () => {
    if (token && spaceName && projectName&& projectMembers) {
      const func = async () => {
        const res = await removeProjectMembers(token, projectName,spaceName, [name]);
        delete projectMembers[name];
        setProjectMembers(projectMembers);
      };
      toast.promise(func(), {
        loading: 'Removing',
        success: <b>Successfully removed</b>,
        error: <b>Unable to remove</b>,
      });
    }
  };

  const HandleRoleChange= async(event:ChangeEvent<HTMLSelectElement>)=>{
    
    const new_role= event.target.value
    if(token&&spaceName&&orgMembers&&projectMembers&&new_role!=role){
    

        const func= async()=>{
          console.log({[name]:new_role})
          const res= await changeProjectMembersStatus(token,projectName ,spaceName,{[name]:new_role})
          projectMembers[name]=new_role
          setProjectMembers(projectMembers)
        }
        toast.promise(func(), {
          loading: 'Changing Role',
          success: <b>Role changed</b>,
          error: <b>Unable to change</b>,
        });
        
    }
  }


  return (
    <div className='member-card'>
      <div className='member-info'>
        <img src={image} alt='image' />
        <h1 className='member-name'>{name}</h1>
      </div>
      <div className='member-actions'>
        <div className='select-overlay'>
          {orgMembers&&projectMembers&&
          userContext?.username &&
         (orgMembers[userContext?.username.toString()] == ('admin'||'manager') || userContext.username != name )&&
          ((orgMembers[userContext?.username.toString()] == ('admin'||'manager') || projectMembers[userContext?.username.toString()]=='admin') )? (
            <select name='role' onChange={HandleRoleChange} id='role' defaultValue={role.toLowerCase()}>
              <option value='admin' >Admin</option>
              <option value='member' >Member</option>
            </select>
          ) : (
            <div className='role'>
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </div>
          )}
        </div>
        {orgMembers&& projectMembers &&
          userContext?.username &&
          (orgMembers[userContext?.username.toString()] == ('admin'||'manager') || userContext.username != name ) &&
          ((orgMembers[userContext?.username.toString()] == ('admin' || 'manager') || projectMembers[userContext?.username.toString()] == 'admin' ) )&& (
            <button className='member-remove-btn' onClick={handleRemove}>
              Remove
            </button>
          )}
      </div>
    </div>
  );
};

export default MemberCard;
