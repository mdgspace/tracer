import React from "react";
import "../styles/contributorCard.scss";
import contributorPropTypes from "../models/contributorPropTypes";
const ContributorCard = (props: contributorPropTypes) => {
  const { Name, Commits, Issues, PR } = props;
  return (
    <div className="contributor-card">
      <div className="profile-image">
        <img
          src="https://images.unsplash.com/photo-1668626317533-a2969d5b39be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1883&q=80"
          alt=""
        />
      </div>
      <div className="profile-name">{Name}</div>
      <div className="profile-prs">
        <div className="title-prs">PRs</div>
        <div className="no-of-prs">{`${PR}`}</div>
      </div>
      <div className="profile-commits">
        <div className="title-commits">Commits</div>
        <div className="no-of-commits">{`${Commits}`}</div>
      </div>
      <div className="profile-issues">
        <div className="title-issues">Issues</div>
        <div className="no-of-issues">{`${Issues}`}</div>
      </div>
    </div>
  );
};

export default ContributorCard;
