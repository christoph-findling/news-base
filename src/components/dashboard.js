import React, { Component } from "react";
import FormField from "../widgets/formFields";
import {
  firebaseCategories,
  firebaseArticles,
  firebase,
  firebaseDB
} from "../firebase";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import Uploader from "../widgets/fileuploader";

class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: "",
    loading: false,
    formdata: {
      author: {
        element: "input",
        value: "",
        config: {
          name: "author_input",
          type: "text",
          placeholder: "Tipe your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      title: {
        element: "input",
        value: "",
        config: {
          name: "title_input",
          type: "text",
          placeholder: "The news title goes here"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      editor: {
        element: "texteditor",
        value: "",
        valid: true
      },
      image: {
        element: "image",
        value: "",
        valid: true
      },
      category: {
        element: "select",
        value: "",
        config: {
          name: "category_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = () => {
    firebaseCategories.once("value").then(snapshot => {
      let categories = [];
      snapshot.forEach(item => {
        categories.push({
          id: item.val().id,
          name: item.val().name
        });
      });
      const newFormdata = { ...this.state.formdata };
      const newElement = { ...newFormdata["category"] };

      newElement.config.options = categories;
      newFormdata["category"] = newElement;

      this.setState({
        formdata: newFormdata
      });
    });
  };

  updateForm = (element, content = "") => {
    const newFormData = {
      ...this.state.formdata
    };
    const newElement = {
      ...newFormData[element.id]
    };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({
      formdata: newFormData
    });
  };

  validate = element => {
    let error = [true, ""];

    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  };

  submit = () =>
    this.state.loading ? (
      "loading..."
    ) : (
      <div className="button__container">
        <button className="button__coral" type="submit">
          Add News
        </button>
      </div>
    );

  submitForm = event => {
    event.preventDefault();

    this.setState({
      postError: ""
    });

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
    }
    for (let key in this.state.formdata) {
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    if (formIsValid) {
      this.setState({
        loading: true,
        postError: ""
      });
      firebaseArticles
        .orderByChild("id")
        .limitToLast(1)
        .once("value")
        .then(snapshot => {
          let articleId = null;
          snapshot.forEach(childSnapshot => {
            articleId = childSnapshot.val().id;
          });
          //set date to firebase timestamp
          dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit["negativedate"] = null;
          //set new article ID
          articleId <= 0
            ? (dataToSubmit["id"] = 0)
            : (dataToSubmit["id"] = articleId + 1);
          //push new article
          firebaseArticles.push(dataToSubmit).then(newArticle => {
            //get newly pushed article for setting negative date
            firebaseDB
              .ref(`articles/${newArticle.key}`)
              .once("value")
              .then(snapshot => {
                const article = snapshot.val();
                const timestamp = article["date"] * -1;
                firebaseDB
                  .ref(`articles/${newArticle.key}`)
                  .update({ negativedate: timestamp })
                  .then(() => {
                    this.props.history.push(`article/${newArticle.key}`);
                  });
              })
              .catch(error => {
                this.setState({
                  loading: false,
                  postError: error
                });
              });
          });
        });
    } else {
      this.setState({
        postError: "Could not add news"
      });
    }
  };

  showError = () =>
    this.state.postError !== "" ? (
      <div className="register__error">{this.state.postError}</div>
    ) : (
      ""
    );

  onEditorStateChange = editorState => {
    let contentState = editorState.getCurrentContent();

    let html = stateToHTML(contentState);

    this.updateForm({ id: "editor" }, html);

    this.setState({
      editorState
    });
  };

  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    if (this.props.email != null) {
      return (
        <div className="form__container">
          <form className="news__form" onSubmit={this.submitForm}>
            <h2>Add News</h2>
            <Uploader filename={filename => this.storeFilename(filename)} />

            <FormField
              id={"author"}
              formdata={this.state.formdata.author}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"title"}
              formdata={this.state.formdata.title}
              change={element => this.updateForm(element)}
            />
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="editor__wrapper"
              editorClassName="editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <FormField
              id={"category"}
              formdata={this.state.formdata.category}
              change={element => this.updateForm(element)}
            />
            {this.showError()}
            {this.submit()}
          </form>
        </div>
      );
    } else {
      return (
        <div className="access_denied">
          Access denied. Log in or register to access this page.
        </div>
      );
    }
  }
}
export default Dashboard;
