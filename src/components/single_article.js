import React from "react";
import ReactTimeAgo from "react-time-ago";

import Button from "../widgets/buttons";
import ImgCategory from "../widgets/imgCategory";

const singleArticle = props => {
  return (
    <div className="article__container">
      <div
        className="img__container"
        style={{ background: `url('/images/posts/${props.image}')` }}
      >
        <ImgCategory text={props.category} />{" "}
      </div>
      <div className="article__content">
        <div className="article__title">{props.title}</div>
        <div className="article__authordate">
          <div className="article__author">by {props.author}</div>
          <div className="spacer" />
          <div className="article__date">
            added{" "}
            {props.date ? (
              <ReactTimeAgo locale="en">{props.date}</ReactTimeAgo>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="article__text">{props.body}</div>
        <div className="button__back__container">
          <Button type="backbutton" text="BACK TO NEWS" />
        </div>
      </div>
    </div>
  );
};

export default singleArticle;
