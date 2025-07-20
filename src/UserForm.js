import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function UserForm({ onSubmit, initialValues, editing }) {
  const UserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: editing
      ? Yup.string() // No validation when editing
      : Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    dob: Yup.date().required('Date of Birth is required'),
  });

  const initialFormState = {
    name: '',
    email: '',
    password: '',
    dob: '',
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues || initialFormState}
      enableReinitialize={true}
      validationSchema={UserSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        if (!editing) actions.resetForm();
      }}
    >
      {({ values, errors, touched }) => (
        <Form>
          <div>
            <label>Name:</label>
            <Field name="name" type="text" autoFocus />
            <ErrorMessage name="name" component="div" className="form-error" />
          </div>
          <div>
            <label>Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="form-error" />
          </div>
        

              {editing ?  <div>
              <label>Password:</label>
              <Field name="password" type="password" />
              {/* <ErrorMessage name="password" component="div" className="form-error" /> */}
            </div> :  <div>
              <label>Password:</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>}
           
          <div>
            <label>Date of Birth:</label>
            <Field name="dob" type="date" />
            <ErrorMessage name="dob" component="div" className="form-error" />
          </div>
          <button type="submit">{editing ? 'Update' : 'Add'} User</button>
        </Form>
      )}
    </Formik>
  );
} 