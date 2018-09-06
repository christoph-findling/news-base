import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Article from "./containers/article_container";
import Videos from "./components/videos";
import Profile from "./components/profile";
import Layout from "./components/layout";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/articles" component={Article} />
        <Route path="/article/:id" component={Article} />
        <Route path="/videos" component={Videos} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
