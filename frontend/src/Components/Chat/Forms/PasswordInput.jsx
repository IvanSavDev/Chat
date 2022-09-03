/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

const PasswordInput = ({
  label, authFailed, authFailedError, name,
}) => {
  const { t } = useTranslation();
  const [field, meta] = useField({ name });

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        id={name}
        name={name}
        type="password"
        placeholder="..."
        {...field}
        isInvalid={
          (meta.touched && meta.error) || authFailed
        }
      />
      <Form.Control.Feedback type="invalid">
        {meta.error}
      </Form.Control.Feedback>
      {authFailedError && authFailed && (
        <Form.Control.Feedback type="invalid">
          {t('forms.authFailed')}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default PasswordInput;
