import React from 'react';
import { Field, reduxForm } from 'redux-form';

const YelpSearchForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="term">Tattoo Parlor</label>
        <Field name="term" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="location">City, State</label>
        <Field name="location" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};


export default reduxForm({
  form: 'shopSearch' // a unique identifier for this form
})(YelpSearchForm);
