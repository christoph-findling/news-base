import React from "react";

const formFields = ({ formdata, change, id }) => {
  const showError = () => {
    let errorMessage = null;
    if (formdata.validation && !formdata.valid) {
      errorMessage = <div>{formdata.validationMessage}</div>;
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let template = null;

    switch (formdata.element) {
      case "input":
        template = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id, blur: false })}
            />
            <div className="form__error">{showError()}</div>
          </div>
        );
        break;
      case "select":
        template = (
          <div>
            <select
              value={formdata.value}
              name={formdata.config.name}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id, blur: false })}
            >
              <option value="" disabled hidden>
                Choose a category
              </option>
              {formdata.config.options.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="form__error">{showError()}</div>
          </div>
        );
        break;
      default:
        template = null;
    }
    return template;
  };

  return <div>{renderTemplate()}</div>;
};
export default formFields;
