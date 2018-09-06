import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReactTimeAgo from "react-time-ago";

import { getPosts } from "../actions";
// import Button from "../widgets/buttons";
import ImgCategory from "../widgets/imgCategory";
import ImgTitle from "../widgets/imgTitle";

import InfiniteScroll from "react-infinite-scroller";

class HomeContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  loadmore = () => {
    this.props.getPosts(this.props.end + 1, this.props.end + 3);
  };

  render() {
    let posts = "";
    this.props.posts ? (posts = this.props.posts) : "";
    let items = [];

    posts
      ? posts.map((post, key) =>
          items.push(
            <Link key={key} to={`article/${post.id}`}>
              <div key={key} className="home_news_container">
                <div
                  className="imageContainer"
                  style={{ background: `url('/images/posts/${post.image}')` }}
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
          )
        )
      : "";

    // <Button
    //   type="loadmorebutton"
    //   text="Load More Posts"
    //   loadmore={() => this.loadmore()}
    // />

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
      // LOADMORE BUTTON CODE
      // <div className="home_container">
      //   {posts
      //     ? posts.map((post, key) => (
      //         <div key={key} className="home_news_container">
      //           <div
      //             className="imageContainer"
      //             style={{ background: `url('/images/posts/${post.image}')` }}
      //           >
      //             <ImgCategory text={post.category} />
      //             <ImgTitle text={post.title} />
      //             <div className="imgAuthor">by {post.author}</div>
      //             <div className="imgDate">
      //               published{" "}
      //               <ReactTimeAgo locale="en">{post.date}</ReactTimeAgo>
      //             </div>
      //           </div>
      //         </div>
      //       ))
      //     : ""}
      //   <Button
      //     type="loadmorebutton"
      //     text="Load More Posts"
      //     loadmore={() => this.loadmore()}
      //   />
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    start: state.start,
    end: state.end,
    hasPosts: state.hasPosts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
