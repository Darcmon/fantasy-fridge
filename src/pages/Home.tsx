import React from "react";
import { Link } from "react-router-dom";
import IPageProps from "../interfaces/page";

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <div>
      <p>Welcome to this page that is protected by Firebase</p>

      <p>
        Click <Link to="/logout">here</Link> to logout.
      </p>
    </div>
  );
};

export default HomePage;
