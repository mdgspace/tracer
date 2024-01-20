import { getAllUser, getUser } from 'app/api/user';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { addOrg, addOrgMembers, getAllOrgs } from 'app/api/organization';
import { uploadIcon } from 'app/api/file';

import './index.scss';
import UserContext from 'app/context/user/userContext';

const AddWorkspace = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userContext = useContext(UserContext);

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

  const addMembers = () => {
    if (memberName) {
      if (
        users.includes(memberName) &&
        memberName != userContext?.username &&
        !members.includes(memberName)
      ) {
        setMembers([...members, memberName]);
        setMemberName(null);
      }
    }
  };

  const removeMembers = (member: string) => {
    const indexToRemove = members.indexOf(member);

    if (indexToRemove !== -1) {
      const updatedMembers = [
        ...members.slice(0, indexToRemove),
        ...members.slice(indexToRemove + 1),
      ];

      setMembers(updatedMembers);
    } else {
      console.warn(`Member "${member}" not found in the members array.`);
    }
  };
  const SubmitHandler = async (): Promise<void> => {
    if (
      description &&
      token &&
      name &&
      validName &&
      uniqueName &&
      validDescription
    ) {
      const func = async (): Promise<void> => {
        const dataRes = await addOrg(token, {
          name: name,
          description: description,
        });

        try {
          if (selectedFile != null) {
            const fileRes = uploadIcon(token, name, selectedFile);
          }
        } catch (e) {}
        if (members.length > 0) {
          try {
            const addMmebersRes = await addOrgMembers(token, name, members);
          } catch (e) {}
        }
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
          {!validName && name ? <p>Not a valid name</p> : <></>}
          {!uniqueName && name ? (
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
          <div className='add-member-container'>
            <input
              type='text'
              id='add-member'
              className='custom-input'
              value={memberName ? memberName : ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setMemberName(e.target.value);
              }}
              placeholder='Github ID of user'
            />
            <button
              onClick={addMembers}
              className='add-member-button'
              disabled={
                memberName
                  ? !users.includes(memberName) &&
                    memberName == userContext?.username
                  : true
              }
            >
              {'+ Add'}
            </button>
          </div>
        </div>
        <div className='added-members'>
          {members.map((member, index) => {
            return (
              <div className='member-card' key={index}>
                <img
                  className='member-avatar'
                  src='https://api.multiavatar.com/Binx.png'
                />{' '}
                <p className='member-name'>{member}</p>{' '}
                <button
                  onClick={() => {
                    removeMembers(member);
                  }}
                  className='btn-cross'
                >
                  <svg
                    width='25'
                    height='24'
                    viewBox='0 0 25 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.566 8.99502C16.6377 8.92587 16.6948 8.84314 16.7342 8.75165C16.7735 8.66017 16.7943 8.56176 16.7952 8.46218C16.7961 8.3626 16.7772 8.26383 16.7395 8.17164C16.7018 8.07945 16.6462 7.99568 16.5758 7.92523C16.5054 7.85478 16.4217 7.79905 16.3295 7.7613C16.2374 7.72354 16.1386 7.70452 16.0391 7.70534C15.9395 7.70616 15.841 7.7268 15.7495 7.76606C15.658 7.80532 15.5752 7.86242 15.506 7.93402L12.5 10.939L9.495 7.93402C9.42634 7.86033 9.34354 7.80123 9.25154 7.76024C9.15954 7.71925 9.06022 7.69721 8.95952 7.69543C8.85882 7.69365 8.75879 7.71218 8.6654 7.7499C8.57201 7.78762 8.48718 7.84376 8.41596 7.91498C8.34474 7.9862 8.2886 8.07103 8.25087 8.16442C8.21315 8.25781 8.19463 8.35784 8.19641 8.45854C8.19818 8.55925 8.22022 8.65856 8.26122 8.75056C8.30221 8.84256 8.36131 8.92536 8.435 8.99402L11.438 12L8.433 15.005C8.30052 15.1472 8.22839 15.3352 8.23182 15.5295C8.23525 15.7238 8.31396 15.9092 8.45138 16.0466C8.58879 16.1841 8.77417 16.2628 8.96847 16.2662C9.16278 16.2696 9.35082 16.1975 9.493 16.065L12.5 13.06L15.505 16.066C15.6472 16.1985 15.8352 16.2706 16.0295 16.2672C16.2238 16.2638 16.4092 16.1851 16.5466 16.0476C16.684 15.9102 16.7627 15.7248 16.7662 15.5305C16.7696 15.3362 16.6975 15.1482 16.565 15.006L13.562 12L16.566 8.99502Z'
                      fill='#8989CE'
                    />
                  </svg>{' '}
                </button>
              </div>
            );
          })}
        </div>

        <button className='submit' onClick={SubmitHandler}>
          Done
        </button>
      </div>
    </div>
  );
};

export default AddWorkspace;
