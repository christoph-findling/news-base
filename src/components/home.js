import React from "react";
import HomeContainer from "../containers/home_container";

const Home = props => {
  return (
    <div>
      <HomeContainer user={props.email} />
    </div>
  );
};

export default Home;
