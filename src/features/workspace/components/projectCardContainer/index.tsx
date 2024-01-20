import React, { useEffect, useState } from 'react';
import ProjectCard from '../projectCard';
import './index.scss';
import { Projects } from 'app/api/organization';
import { ProjectsGithubData } from 'app/api/githubData';
import { useSelector } from 'react-redux';

interface Props {
  weekly: boolean;
  orgName: string;
  orgProjects: Projects | null;
  monthlyOrgProjectsData: ProjectsGithubData | null;
  weeklyOrgProjectsData: ProjectsGithubData | null;
  archives: boolean;
}

const ProjectCardCont: React.FC<Props> = ({
  weekly,
  orgName,
  orgProjects,
  monthlyOrgProjectsData,
  weeklyOrgProjectsData,
  archives,
}) => {
  const searchValue = useSelector((state: any) => state.searchKeyword.value);

  useEffect(() => {
    console.log(orgProjects);
  }, [weekly, searchValue]);

  return (
    <>
      <div className='projectcard-cont'>
        {orgProjects &&
          Object.entries(orgProjects)
            .filter(([key, value]) => {
              if (key.toLowerCase().includes(searchValue.toLowerCase()))
                return [key, value];
            })
            .map(([key, value]) => {
              return (
                archives === value.archeive && (
                  <ProjectCard
                    key={key}
                    orgName={orgName}
                    projectName={key}
                    status={value}
                    githubData={
                      weekly
                        ? weeklyOrgProjectsData && weeklyOrgProjectsData[key]
                        : monthlyOrgProjectsData && monthlyOrgProjectsData[key]
                    }
                  />
                )
              );
            })}
      </div>
    </>
  );
};

export default ProjectCardCont;
