import React from "react";
import HomeContainer from "../containers/home_container";

const Home = props => {
  return (
    <div>
      <HomeContainer user={props.email} state={props.match.params.state} />
    </div>
  );
};

export default Home;
