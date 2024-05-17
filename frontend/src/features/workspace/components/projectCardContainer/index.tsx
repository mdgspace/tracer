import React, { useEffect } from 'react';
import ProjectCard from '../projectCard';
import './index.scss';
import { Projects } from 'app/api/organization';
import { ProjectsGithubData } from 'app/api/githubData';

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
  useEffect(() => {
    return;
  }, [weekly]);

  return (
      <div className='projectcard-cont'>
        {orgProjects &&
          Object.entries(orgProjects).map(([key, value]) => {
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
  );
};

export default ProjectCardCont;
