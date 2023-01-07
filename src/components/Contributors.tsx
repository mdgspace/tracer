import React from "react";
import ContributorCard from "./ContributorCard";
import "../styles/contributor.scss";
import nextContributor from "../assets/images/nextContributor.svg";
import { mockData } from "../utils/data";
import mockdatatypes from "../models/mockDataTypes";

const Contributors = () => {
  return (
    <div className="contributors">
      <span className="contributor-title">Contributor</span>
      <div className="contributor-cards">
        {mockData.map((e: mockdatatypes) => {
          if (e.id < 5) {
            return (
              <ContributorCard
                Name={e.Name}
                PR={e.PR}
                Issues={e.Issues}
                Commits={e.Commits}
              />
            );
          } else {
            return <></>;
          }
        })}

        <div className="next-contributors">
          <img src={nextContributor} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contributors;
