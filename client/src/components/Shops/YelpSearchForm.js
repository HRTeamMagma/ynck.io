import React from 'react';
import { Field, reduxForm } from 'redux-form';

const YelpSearchForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <div className="yelp_form" >
        <label className="form_label" htmlFor="term">Tattoo Parlor</label>
        <Field className="form_input" name="term" component="input" type="text" />
        <label className="form_label" htmlFor="city">City</label>
        <Field className="form_input" name="city" component="input" type="text" />
        <label className="form_label" htmlFor="state">State</label>
        <Field className="form_input" name="state" component="input" type="text" />
        <button className="shop-search-button"type="submit">Submit</button>
      </div>
    </form>
  );
};


export default reduxForm({
  form: 'shopSearch' 
})(YelpSearchForm);
