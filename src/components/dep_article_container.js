import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getArticle } from "../actions";
import SingleArticle from "../components/single_article";
// import ArticlesContainer from "../containers/home_container";

class Article extends Component {
  componentDidMount() {
    this.props.getArticle(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <SingleArticle {...this.props.article} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getArticle }, dispatch);
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
