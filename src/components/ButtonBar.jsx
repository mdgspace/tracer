import React from "react";
import TimeRangeSwitch from "./TimeRangeSwitch";
import "../styles/buttonBar.scss";
const ButtonBar = () => {
  return (
    <>
      <div className="button-bar">
        <div className="back-btn">
          <div>Back</div>
        </div>
        <TimeRangeSwitch />
      </div>
      <h2>Appetizer</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
        temporibus modi placeat non, rerum, architecto provident sunt ipsum
        repellendus possimus et. Sunt corrupti suscipit quis voluptates vero,
        magnam debitis tempore excepturi inventore ullam vel, placeat, dolores
        dignissimos laborum. Quis impedit ab laboriosam fuga vel veritatis
        veniam quo blanditiis obcaecati distinctio delectus illo accusamus ad
        optio, in autem harum quia illum nobis consectetur molestias eius
        provident. Labore fugit, quam fugiat est quidem recusandae veritatis
        inventore voluptas esse saepe, rerum ducimus ad odit laudantium odio id.
        Autem omnis officiis molestiae dolor ea, reiciendis expedita sit nobis
        provident voluptates et necessitatibus voluptatibus magni!
      </p>
    </>
  );
};

export default ButtonBar;
