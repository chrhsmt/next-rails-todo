// @flow
import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import type { FormProps, FieldProps } from 'redux-form'
import classNames from 'classnames'
import { setToken, redirectToAfterSignInPath } from '../../lib/auth'
import './style.scss'

type PropsType = {} & FormProps;

let SignUpForm = ({ error, pristine, submitting, handleSubmit }: PropsType) => {
  return (
    <form className="form container" onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <Field component={TextField} type="text" name="name" label="Name"/>
      <Field component={TextField} type="password" name="password" label="Password"/>
      <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
    </form>
  )
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required.'
  }

  if (!values.password) {
    errors.password = 'Required.'
  }

  return errors;
};

const TextField = (
  {
    input,
    name,
    label,
    type,
    meta: { touched, error }
  }: FieldProps
) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input {...input} type={type} name={name} className={classNames('form-control', {'is-invalid': touched && error})} />
    {touched &&
    (error && <div className="invalid-feedback">{error}</div>)}
  </div>
);

SignUpForm = reduxForm({
  form: 'SignUp',
  validate
})(SignUpForm);

const mapDispatchToProps = (dispatch, {submitSignUpForm}) => {
  return {
    onSubmit: values =>
      submitSignUpForm(values.name, values.password)
  }
};

SignUpForm = connect(
  null,
  mapDispatchToProps
)(SignUpForm);

const submitSignUpForm = gql`
  mutation submitSignUpForm($name: String!, $password: String!) {
    submitSignUpForm(name: $name, password: $password) {
      errors
      token
    }
  }
`;

SignUpForm = graphql(submitSignUpForm, {
  props: ({ mutate }) => ({
    submitSignUpForm: (name, password) =>
      mutate({
        variables: {name, password},
      })
        .then((
          {
            data: {
              submitSignUpForm: {
                errors, token
              }
            }
          }) => {
          if (errors && errors.length > 0) {
            throw new SubmissionError({_error: errors[0]});
          }

          setToken(token);
          redirectToAfterSignInPath();
        })
  })
})(SignUpForm);

export default SignUpForm
