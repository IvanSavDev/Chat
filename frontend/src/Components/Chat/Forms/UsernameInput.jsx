/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';

const UsernameInput = ({ authFailed, label, name }) => {
  const fieldUsername = useRef();
  const [field, meta] = useField({ name });

  useEffect(() => {
    if (fieldUsername.current) {
      fieldUsername.current.focus();
    }
  }, []);

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>
        {label}
      </Form.Label>
      <Form.Control
        id={name}
        type="text"
        placeholder="..."
        ref={fieldUsername}
        {...field}
        isInvalid={
          (meta.touched && meta.error) || authFailed
        }
      />
      <Form.Control.Feedback type="invalid">
        {meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default UsernameInput;
