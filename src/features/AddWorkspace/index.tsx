import { getAllUser, getUser } from 'app/api/user';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { addOrg, getAllOrgs } from 'app/api/organization';
import { uploadIcon } from 'app/api/file';

const AddWorkspace = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, SetName] = useState<string | null>(null);
  const [description, setDiscription] = useState<string | null>(null);
  const [validName, setValidName] = useState<boolean>(false);

  const [members, setMembers] = useState<string[]>([]);
  const [memberName, setMemberName]=useState<string| null>(null);

  const [users, setUsers] = useState<string[]>([]);
  const [orgs, setOrgs] = useState<string[]>([]);

  const dataFetch = async () => {
    try {
      if (token) {
        const users_aray: string[] = [];
        const org_aray: string[] = [];
        const allUser = await getAllUser(token);
        const allOrgs = await getAllOrgs(token);
        allUser.data.users.forEach((user) => {
          users_aray.push(user.username);
        });

        allOrgs.data.organizations.forEach((org) => {
          org_aray.push(org.name);
        });

        setUsers(users_aray);
        setOrgs(org_aray);
      }
    } catch (e) {}
  };

  const checklogin = async () => {
    if (token != null) {
      const userData = await getUser(token);
      return userData.data
    } else {
      toast.error("Session expired")
      navigate('/login');
    }
  };

  const { data,isError } = useQuery({
    queryFn: () => checklogin(),
    queryKey: 'checkLogin',
  });

  if (isError) {
    toast.error("Session expired")
    navigate('/login');
  }

  const {} = useQuery({
    queryFn: () => dataFetch(),
    queryKey: 'allUsersAndAllOrgs',
  });

  const allowedFieTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (allowedFieTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        toast.error('Invalid file type');
      }
    }
  };

  function valid_name(str: string): boolean {
    // Define a regular expression for special characters (excluding letters, digits, and spaces)
    const specialCharacters = /[^a-zA-Z0-9\s]/;

    // Check if the string contains any special characters
    return (
      specialCharacters.test(str) &&
      !str.endsWith('/userspace') &&
      !orgs.includes(str)
    );
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    SetName(event.target.value);

    setValidName(() => valid_name(event.target.value));
  };

  const handleDesriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscription(event.target.value);
  };

  const addMembers= ()=>{
    if(memberName){
      if(users.includes(memberName)&& memberName!=data?.message){
         setMembers([...members,memberName])
         setMemberName(null)
      }
    }
  }


  const SubmitHandler=async():Promise<void>=>{


    if(validName&&description&&token&&name){
      try{
        const dataRes= await addOrg(token,{
          name:name,
          description:description
        })
      
      }catch(e){
           toast.error('Try again!')
           return
        }
      try{
        if(selectedFile!=null){
          const fileRes= uploadIcon(token, name, selectedFile)
        }
        navigate("/workspace-view")
        
      }catch(e){
        navigate("/workspace-view")
      }
    }else{
      toast.error('Invalid inputs')
    }

   
  }

  toast.promise(
    SubmitHandler(),
     {
       loading: 'Saving Workspace',
       success: <b>Workspace saved</b>,
       error: <b>Could not save</b>,
     }
   );
  

  return (
    <div>
      <input type='file' onChange={handleFileChange} />

      <p>Selected File: {selectedFile?.name}</p>
      <input
        type='text'
        value={name ? name : ''}
        onChange={handleNameChange}
        placeholder='Enter name'
      />
      <input
        type='text'
        value={description ? description : ''}
        onChange={handleDesriptionChange}
        placeholder='Enter Description'
      />

      <input
        type='text'
        value={memberName ? memberName : ''}
        onChange={(e:ChangeEvent<HTMLInputElement>)=>{setMemberName(e.target.value)}}
        placeholder='Enter membername'
      />
      <button onClick={addMembers} disabled={memberName?!users.includes(memberName)&& memberName==data?.message:true}>Add Memeber</button>
      <p>{members}</p>
      <button onClick={SubmitHandler}>Submit</button>
    </div>
  );
};

export default AddWorkspace;
