import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReactTimeAgo from "react-time-ago";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// BackgroundImage is preventing re-render on item delete
// import BackgroundImage from "react-background-image-loader";

import { getPosts, deleteArticle } from "../actions";

import ImgCategory from "../widgets/imgCategory";
import ImgTitle from "../widgets/imgTitle";

import InfiniteScroll from "react-infinite-scroller";

// import BackgroundImagePlaceholder from "../../src/placeholder.gif";

class HomeContainer extends Component {
  state = {
    reRender: true
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  loadmore = () => {
    this.props.getPosts(this.props.start);
  };

  deleteArticle = id => {
    this.props.deleteArticle(id);
  };

  render() {
    let posts = "";
    if (this.props.posts) {
      posts = this.props.posts;
    }
    let items = [];
    if (posts) {
      posts.map((post, key) =>
        items.push(
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames="fade"
            key={key}
          >
            <div key={key} className="relative">
              {this.props.user ? (
                <button
                  className="button__delete__article"
                  id={post.id}
                  onClick={() => this.deleteArticle(post.id)}
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              ) : (
                ""
              )}
              <Link key={key} to={`article/${post.id}`}>
                <div key={key} className="home_news_container">
                  <div
                    className="imageContainer"
                    style={{ background: `url(${post.imageURL})` }}
                  >
                    <ImgCategory text={post.category} />
                    <ImgTitle text={post.title} />
                    <div className="imgAuthor">by {post.author}</div>
                    <div className="imgDate">
                      published{" "}
                      <ReactTimeAgo locale="en">{post.date}</ReactTimeAgo>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CSSTransition>
        )
      );
    }

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadmore}
        hasMore={this.props.hasPosts === false ? false : true}
        loader={
          <div className="loader" key={0}>
            Loading news...
          </div>
        }
      >
        <div className="home_container">{items}</div>
      </InfiniteScroll>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: props.user,
    posts: state.posts,
    start: state.start,
    end: state.end,
    hasPosts: state.hasPosts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPosts, deleteArticle }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
