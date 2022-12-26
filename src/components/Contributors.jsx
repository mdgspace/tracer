import React from "react";
import ContributorCard from "./ContributorCard";
import "../styles/contributor.scss";
const Contributors = () => {
  return (
    <div className="contributors">
      Contributor
      <div className="contributor-cards">
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
        <ContributorCard />
      </div>
    </div>
  );
};

export default Contributors;
