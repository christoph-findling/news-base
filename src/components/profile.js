import React from "react";
// import ProfileContainer from "../containers/home_container";

const Profile = props => {
  if (props.email != null) {
    return (
      <div className="profile__container">
        <h2>Profile</h2>
        <h3>
          Your email address: <strong>{props.email}</strong>
        </h3>
      </div>
    );
  } else {
    return (
      <div className="access_denied">
        Access denied. Log in or register to access this page.
      </div>
    );
  }
};

export default Profile;
