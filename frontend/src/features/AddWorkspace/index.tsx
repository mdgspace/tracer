import { getAllUser } from 'app/api/user';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addOrg, addOrgMembers, getAllOrgs } from 'app/api/organization';
import { uploadIcon } from 'app/api/file';

import './index.scss';
import UserContext from 'app/context/user/userContext';
import { AVATAR_URL } from 'app/constants/api';
import { AVATAR_API } from 'envConstants';
import Cross from '../../app/assets/icons/cross.svg';
import {
  _VALIDATE_PROPS,
  _WORKSPACE_FORM,
  _WORKSPACE_FORM_CHANGE,
  _WORKSPACE_FORM_ERROR,
} from './types';

const AddWorkspace = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userContext = useContext(UserContext);
  const [form, setForm] = useState<_WORKSPACE_FORM>({
    workspace: '',
    description: '',
    members: [],
    image: undefined,
    member: '',
  });
  const [formErrors, setFormErrors] = useState<_WORKSPACE_FORM_ERROR>(
    {} as _WORKSPACE_FORM_ERROR
  );

  const [users, setUsers] = useState<string[]>([]);
  const [orgs, setOrgs] = useState<string[]>([]);

  function isValidName(str: string): boolean {
    // Define a regular expression for special characters (excluding letters, digits, and spaces)
    const specialCharacters = /^[a-zA-Z0-9_-]+$/;

    // Check if the string contains any special characters
    return specialCharacters.test(str) && !str.endsWith('-userspace');
  }

  function isUnique(str: string): boolean {
    return !orgs.includes(str);
  }

  const addMembers = () => {
    if (form.member) {
      if (
        users.includes(form.member) &&
        form.member != userContext?.username &&
        !form.members.includes(form.member)
      ) {
        setForm({ ...form, members: [...form.members, form.member] });
        setForm({ ...form, member: '' });
        console.log(form);
      }
    }
  };

  const removeMembers = (member: string) => {
    const indexToRemove = form.members.indexOf(member);

    if (indexToRemove !== -1) {
      const updatedMembers = [
        ...form.members.slice(0, indexToRemove),
        ...form.members.slice(indexToRemove + 1),
      ];

      setForm({ ...form, members: updatedMembers });
    } else {
      console.warn(`Member "${member}" not found in the members array.`);
    }
  };

  const validate: _VALIDATE_PROPS = (name, value,files) => {
    switch (name) {
      case 'workspace':
        if (!value) {
          return 'Workspace Name is required';
        } else if (!isValidName(value)) {
          return 'Workspace Name can only contain alphanumeric characters, hyphens, and underscores';
        } else if (!isUnique(value)) {
          return 'Workspace name already exist';
        }
        return '';
      case 'image':
        if (!FileList) {
          return "File is required"
        }
        return ''
      case 'description':
        if (value.length>200) {
          return "Description should be less then 200 characters"
        }
        return ''
      default:
        return '';
    }
  };

  const handleChange: _WORKSPACE_FORM_CHANGE = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'image':
        const file = event.target.files?.[0];
        setForm({ ...form, image: file });
        break;
      case 'workspace':
        setForm({ ...form, workspace: value });
        break;
      case 'description':
        setForm({ ...form, description: value });
        break;
      case 'member':
        setForm({ ...form, member: value });
        break;
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value,files } = e.target;
    const error = validate(name, value,files);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = () => {};

  const SubmitHandler = async (): Promise<void> => {
    if (
      form.description &&
      token &&
      form.workspace
      // &&
      // validName &&
      // uniqueName &&
      // validDescription
    ) {
      const func = async (): Promise<void> => {
        const dataRes = await addOrg(token, {
          name: form.workspace,
          description: form.description,
        });

        if (form.image) {
          try {
            const fileRes = await uploadIcon(token, form.workspace, form.image);
          } catch (e) {}
        }

        if (form.members.length > 0) {
          try {
            const addMmebersRes = await addOrgMembers(
              token,
              form.workspace,
              form.members
            );
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
  const dataFetch = async () => {
    try {
      if (token) {
        const users_arr: string[] = [];
        const org_arr: string[] = [];
        const allUser = await getAllUser(token);
        const allOrgs = await getAllOrgs(token);
        allUser.data.users.forEach((user) => {
          users_arr.push(user.username);
        });

        allOrgs.data.organizations.forEach((org) => {
          org_arr.push(org.name);
        });
        setUsers(users_arr);
        setOrgs(org_arr);
      }
    } catch (e) {}
  };

  useEffect(() => {
    dataFetch();
  }, []);
  return (
    <div className='main_aworkspace_container'>
      <form
        className='addworkspace-form-container'
        onSubmit={handleSubmit}
        autoFocus={true}
        autoComplete='off'
        noValidate
      >
        <div className='single-form-element-container'>
          <p className='label'>Add Icon<span style={{color:'red',paddingLeft:'4px'}}>*</span></p>
          <div className='file-input-container'>
            <label htmlFor='icon-file' className='file-label'>
              Choose image files here
            </label>
            <input
              type='file'
              id='icon-file'
              className='custom-file-input'
              accept="image/jpeg', image/jpg, image/png"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              max={1}
              name='image'
            />
            <p>Supported formats: JPEG, JPG, PNG</p>
            <p>Selected File: {form.image?.name}</p>
          </div>
          {formErrors.image && <p className='form-error'>{formErrors.image}</p>}
        </div>
        <div className='single-form-element-container'>
          <label className='label' htmlFor='workspace-name'>
            Workspace Name<span style={{color:'red',paddingLeft:'4px'}}>*</span>
          </label>
          <input
            type='text'
            className='custom-input'
            id='workspace-name'
            name='workspace'
            value={form.workspace}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder='workspace name'
          />
          {formErrors.workspace && <p className='form-error'>{formErrors.workspace}</p>}
        </div>
        <div className='single-form-element-container'>
          <label className='label' htmlFor='workspace-description'>
            Description
          </label>
          <input
            id='workspace-description'
            type='text'
            className='custom-input'
            name='description'
            value={form.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='workspace description'
            maxLength={201}
          />
          {formErrors.description && <p className='form-error'>{formErrors.description}</p>}
          
        </div>
        <div className='single-form-element-container'>
          <label className='label' htmlFor="add-member">Add Members</label>
        <div className='add-member-container'>
            <input
              type='text'
              id='add-member'
              className='custom-input'
              value={form.member}
              name='member'
              onChange={handleChange}
              placeholder='Github ID of user'
            />
            <button
              onClick={addMembers}
              className='add-member-button'
              type='button'
              disabled={
                form.member
                  ? !users.includes(form.member) &&
                    form.member == userContext?.username
                  : true
              }
            >
              {'+ Add'}
            </button>
          </div>
        </div>
        <div className='added-members'>
          {form.members.map((member, index) => (
            <div className='member-card' key={index}>
              <img
                className='member-avatar'
                src={AVATAR_URL + '/' + member + '.png?apikey=' + AVATAR_API}
              />
              <p className='member-name'>{member}</p>
              <button
                onClick={() => {
                  removeMembers(member);
                }}
                className='btn-cross'
              >
                <img style={{ width: 20, height: 20 }} src={Cross} alt='' />
              </button>
            </div>
          ))}
        </div>
        <button className='submit'>Done</button>
      </form>
    </div>
  );
};

export default AddWorkspace;
