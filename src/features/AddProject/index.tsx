import React, { ChangeEvent, useState } from 'react';
import './index.scss';
import tick from '../../app/assets/images/tick.png';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'app/api/user';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import axios from 'axios';
import { addProject } from 'app/api/project';
const AddProject = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const orgName = 'orgName';
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const [validLink, setValidLink] = useState<boolean>(false);

  const [validName, setValidName] = useState<boolean>(false);

  const checkLogin = async () => {
    if (token != null) {
      const userData = await getUser(token);
      return userData.data;
    } else {
      toast.error('Not authorized');
      navigate('/login');
    }
  };

  const { data, isError } = useQuery({
    queryFn: () => checkLogin(),
    queryKey: 'checkLogin',
  });

  if (isError) {
    toast.error('Session Expired');
    navigate('/login');
  }

  const linkChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);

    if (isGitHubRepositoryLink(event.target.value)) {
      try {
        const response = await axios.get(event.target.value);
        setValidLink(true);
        return;
      } catch (e) {}
    }

    setValidLink(false);
  };

  const nameChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setValidName(true);
  };

  function isGitHubRepositoryLink(link: string): boolean {
    // Define a regular expression pattern for a GitHub repository URL
    const githubRepoPattern =
      /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\.git)?$/;

    // Check if the provided link matches the pattern
    return githubRepoPattern.test(link);
  }

  const SubmitHandler = async () => {
    if (
      token &&
      name &&
      validName &&
      validLink &&
      description &&
      link &&
      description?.length > 3
    ) {
      try {
        const res = await addProject(token, orgName, {
          name: name,
          description: description,
          link: link,
        });
      } catch (e) {
        toast.error('Error while saving');
      }
    }

    toast.error('Invalid inputs');
  };


  toast.promise(
    SubmitHandler(),{
      loading: 'Saving Project',
      success: <b>Project saved</b>,
      error:<b>Could not save</b>
    }
  )

  return (
    <div>
      <div className='add-project-container'>
        <form className='add-project-form'>
          <div className='input-title'>Name</div>
          <input
            type='text'
            placeholder='Project name'
            onChange={nameChange}
            value={name ? name : ''}
          />
          <div className='input-title'>Project link</div>
          <input
            type='text'
            value={link ? link : ''}
            onChange={linkChange}
            placeholder='Github link of project'
          />
          <div className='input-title'>Description</div>
          <input
            type='text'
            value={description ? description : ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            placeholder='Details about project'
          />
        </form>
        <button className='add-project-btn'>
          <img src={tick} alt='' /> Done
        </button>
      </div>
    </div>
  );
};

export default AddProject;
