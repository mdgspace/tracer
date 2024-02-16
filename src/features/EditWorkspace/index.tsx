import { getAllUser, getUser } from 'app/api/user';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import {
  addOrg,
  addOrgMembers,
  getAllOrgs,
  getOrg,
  updateOrg,
} from 'app/api/organization';
import { uploadIcon } from 'app/api/file';

import './index.scss';
import UserContext from 'app/context/user/userContext';

const EditWorkspace = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userContext = useContext(UserContext);
  const { spaceName } = useParams();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, SetName] = useState<string | null>(null);
  const [description, setDiscription] = useState<string | null>(null);
  const [validDescription, setValidDescription] = useState<boolean>(true);
  const [validName, setValidName] = useState<boolean>(false);
  const [uniqueName, setUniqueName] = useState<boolean>(false);
  const [members, setMembers] = useState<string[]>([]);
  const [memberName, setMemberName] = useState<string | null>(null);

  const [users, setUsers] = useState<string[]>([]);
  const [orgs, setOrgs] = useState<string[]>([]);

  const dataFetch = async () => {
    try {
      if (token && spaceName) {
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
      if (token && spaceName) {
        SetName(spaceName);
        setUniqueName(true);
        setValidName(true);
      }
      if (token && spaceName) {
        const Org = await getOrg(token, spaceName);
        setDiscription(Org.data.description);
      }
    } catch (e) {}
  };

  useEffect(() => {
    dataFetch();
  }, []);

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
    const specialCharacters = /^[a-zA-Z0-9_-]+$/;

    // Check if the string contains any special characters
    return specialCharacters.test(str) && !str.endsWith('-userspace');
  }

  function isUniqueName(str: string): boolean {
    return !orgs.includes(str);
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    SetName(event.target.value);
    setUniqueName(() => isUniqueName(event.target.value));
    setValidName(() => valid_name(event.target.value));
  };

  const handleDesriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscription(event.target.value);
    if (description?.length) {
      setValidDescription(description.length < 200);
    }
  };

  const SubmitHandler = async (): Promise<void> => {
    if (
      description &&
      token &&
      name &&
      spaceName &&
      validName &&
      uniqueName &&
      validDescription
    ) {
      const func = async (): Promise<void> => {
        const dataRes = await updateOrg(token, spaceName, {
          name: name,
          description: description,
        });

        try {
          if (selectedFile != null) {
            const fileRes = uploadIcon(token, name, selectedFile);
          }
        } catch (e) {}

        navigate('/');
      };

      toast.promise(func(), {
        loading: 'Saving Workspace',
        success: <b>Workspace saved</b>,
        error: <b>Could not save</b>,
      });
    } else {
      toast.error('Invalid inputs');
    }
  };

  return (
    <div className='main_aworkspace_container'>
      <div className='addworkspace-form-container'>
        <div className='single-form-element-container'>
          <label className='label'>Add Icon</label>
          <div className='file-input-container'>
            <label htmlFor='icon-file' className='file-label'>
              Choose image files here
            </label>
            <input
              type='file'
              id='icon-file'
              className='custom-file-input'
              onChange={handleFileChange}
            />
            <p>Supported formats: JPEG, JPG, PNG</p>
            <p>Selected File: {selectedFile?.name}</p>
          </div>
        </div>
        <div className='single-form-element-container'>
          <label className='label' htmlFor='workspace-name'>
            Name
          </label>
          <input
            type='text'
            className='custom-input'
            id='workspace-name'
            value={name ? name : ''}
            onChange={handleNameChange}
            placeholder='workspace name'
          />
          {!name ? <p>Name feild should not be empty</p> : <></>}
          {name != spaceName && !validName && name ? (
            <p>Not a valid name</p>
          ) : (
            <></>
          )}
          {name != spaceName && !uniqueName && name ? (
            <p>Name already taken. Try another name</p>
          ) : (
            <></>
          )}
        </div>
        <div className='single-form-element-container'>
          <label className='label' htmlFor='workspace-description'>
            Description
          </label>
          <input
            id='workspace-description'
            type='text'
            className='custom-input'
            value={description ? description : ''}
            onChange={handleDesriptionChange}
            placeholder='workspace description'
          />
          {!description ? <p>Description feild should not be empty</p> : <></>}
          {!validDescription ? (
            <p>Characters length should be less than 200</p>
          ) : (
            <></>
          )}
        </div>

        <button className='submit' onClick={SubmitHandler}>
          Done
        </button>
      </div>
    </div>
  );
};

export default EditWorkspace;
