import { changeOrgMembersStatus, removeOrgMembers } from 'app/api/organization';
import UserContext from 'app/context/user/userContext';
import { ChangeEvent, ChangeEventHandler, ReactEventHandler, useContext } from 'react';
import toast from 'react-hot-toast';

const MemberCard = ({
  image,
  name,
  role,
  orgMembers,
  setOrgMembers,
  spaceName,
}: {
  image: string;
  name: string;
  role: string;
  spaceName: string;
  orgMembers: { [username: string]: string } | null;
  setOrgMembers: (orgMembers: { [username: string]: string }) => void;
}) => {
  const token = localStorage.getItem('token');
  const userContext = useContext(UserContext);
  const handleRemove = async () => {
    if (token && spaceName && orgMembers) {
      const func = async () => {
        const res = await removeOrgMembers(token, spaceName, [name]);
        delete orgMembers[name];
        setOrgMembers(orgMembers);
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
    if(token&&spaceName&&orgMembers&&new_role!=role){
    

        const func= async()=>{
    
          const res= await changeOrgMembersStatus(token, spaceName,{[name]:new_role})
          orgMembers[name]=new_role
          setOrgMembers(orgMembers)
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
          {orgMembers &&
          userContext?.username &&
          userContext.username != name &&
          orgMembers[userContext?.username.toString()] == 'admin' ? (
            <select name='role' onChange={HandleRoleChange} id='role' defaultValue={role.toLowerCase()}>
              <option value='admin' >Admin</option>
              <option value='manager' >Manager</option>
              <option value='member' >Member</option>
            </select>
          ) : (
            <div className='role'>
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </div>
          )}
        </div>
        {orgMembers &&
          userContext?.username &&
          userContext.username != name &&
          orgMembers[userContext?.username.toString()] == 'admin' && (
            <button className='member-remove-btn' onClick={handleRemove}>
              Remove
            </button>
          )}
      </div>
    </div>
  );
};

export default MemberCard;
