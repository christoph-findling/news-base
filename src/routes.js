import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Article from "./containers/article_container";
import Profile from "./components/profile";
import Layout from "./components/layout";
import Dashboard from "./components/dashboard";
import SignIn from "./components/signin/signin";

const Routes = props => {
  console.log(props);
  return (
    <Layout user={props.user}>
      <Switch>
        <Route path="/articles" component={Article} />
        <Route path="/article/:id" component={Article} />
        <Route path="/videos" component={Videos} />
        <Route
          path="/profile"
          render={routeProps => <Profile {...routeProps} {...props} />}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route
          path="/"
          render={routeProps => <Home {...routeProps} {...props} />}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
