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
        <label htmlFor="city">City</label>
        <Field name="city" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="state">State</label>
        <Field name="state" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};


export default reduxForm({
  form: 'shopSearch' 
})(YelpSearchForm);
