import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProject } from 'app/api/project';
import { Projects, getOrgProjects } from 'app/api/organization';
import { isGitHubRepositoryLink, isValidName } from './utils';
import {
  _ADD_PROJECT_FORM,
  _ADD_PROJECT_FORM_CHANGE,
  _ADD_PROJECT_FORM_ERROR,
  _FORM_SUBMIT,
  _VALIDATE_PROPS,
} from './types';
import toast from 'react-hot-toast';
import tick from '../../app/assets/images/tick.png';

const AddProject = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { spaceName } = useParams();
  const [orgProject, setOrgProjects] = useState<Projects | null>(null);

  const isUnique = (name: string) => {
    if (orgProject && name in orgProject) {
      return false;
    }
    return true;
  };

  // form section
  const [form, setForm] = useState<_ADD_PROJECT_FORM>({
    name: '',
    description: '',
    link: '',
  });
  const [formErrors, setFormErrors] = useState<_ADD_PROJECT_FORM_ERROR>(
    {} as _ADD_PROJECT_FORM_ERROR
  );

  const validate: _VALIDATE_PROPS = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) {
          return 'Name is required';
        } else if (!isValidName(value)) {
          return 'Name can only contain alphanumeric characters, hyphens, and underscores';
        } else if (!isUnique(value)) {
          return 'Project name already exist';
        }
        return '';
      case 'link':
        if (!value) {
          return 'Project link is required';
        } else if (!isGitHubRepositoryLink(value)) {
          return 'Invalid GitHub project link. Ensure it follows the format: https://github.com/username/repo[.git]';
        }
        return '';
      case 'description':
        if (value.length > 200) {
          return 'Description length should not be greater than 200';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange: _ADD_PROJECT_FORM_CHANGE = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit: _FORM_SUBMIT = (event) => {
    event.preventDefault();
    const newErrors: _ADD_PROJECT_FORM_ERROR = Object.keys(form).reduce(
      (acc, key) => {
        const error = validate(key, form[key as keyof _ADD_PROJECT_FORM]);
        if (error) {
          acc[key as keyof _ADD_PROJECT_FORM_ERROR] = error;
        }
        return acc;
      },
      {} as _ADD_PROJECT_FORM_ERROR
    );

    setFormErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      if (spaceName && token) {
        const func = async () => {
          const updatedForm = { ...form };
          if (updatedForm.link && !updatedForm.link.endsWith('.git')) {
            updatedForm.link = `${updatedForm.link.trim()}.git`;
          }
          if (!updatedForm.description) {
            updatedForm.description = ' ';
          }
          const res = await addProject(token, spaceName, updatedForm);
          // console.log(res);
          // TODO: Update some stuff if the link is case sensitive
          navigate(`/workspace/${spaceName}`);
        };
        toast.promise(func(), {
          loading: 'Saving Project',
          success: <b>Project saved</b>,
          error: <b>Could not save</b>,
        });
      } else {
        toast.error('Invalid inputs');
      }
    } else {
      toast.error('Form contains errors');
    }
    console.log('sanas');
  };

  const fetchData = async () => {
    if (token && spaceName) {
      try {
        const res = await getOrgProjects(token, spaceName);
        setOrgProjects(res.data.projects);
      } catch (e) {}
    }
  };

  useEffect(() => {
    fetchData();
  }, [spaceName]);

  return (
    <div className='add-project-container'>
      <form
        onSubmit={handleSubmit}
        className='add-project-form'
        autoFocus={true}
        autoComplete='off'
        noValidate
      >
        <div className='input-title'>Name</div>
        <input
          type='text'
          placeholder='Project name'
          onChange={handleChange}
          name='name'
          value={form.name}
          onBlur={handleBlur}
          required
        />
        {formErrors.name && <p className='form-error'>{formErrors.name}</p>}
        <div className='input-title'>Project link</div>
        <input
          type='text'
          value={form.link}
          onChange={handleChange}
          name='link'
          placeholder='Github link of project'
          required
          onBlur={handleBlur}
        />
        {formErrors.link && <p className='form-error'>{formErrors.link}</p>}
        <div className='input-title'>
          Description <span>(max char. 200)</span>
        </div>
        <input
          type='text'
          value={form.description}
          onChange={handleChange}
          name='description'
          placeholder='Details about project'
          onBlur={handleBlur}
          maxLength={201}
        />
        {formErrors.description && (
          <p className='form-error'>{formErrors.description}</p>
        )}
        <button className='add-project-btnn' type='submit'>
          <img src={tick} alt='' />
          Done
        </button>
      </form>
    </div>
  );
};

export default AddProject;
