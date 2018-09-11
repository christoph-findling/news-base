import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getArticle, removeArticle } from "../actions";
import SingleArticle from "../components/single_article";
// import ArticlesContainer from "../containers/home_container";

class Article extends Component {
  componentDidMount() {
    this.props.getArticle(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.removeArticle();
  }

  render() {
    return (
      <div className="main_container">
        <SingleArticle {...this.props.article} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getArticle, removeArticle }, dispatch);
};

const mapStateToProps = state => {
  return {
    article: state.article
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
