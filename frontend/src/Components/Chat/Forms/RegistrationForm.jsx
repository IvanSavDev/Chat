/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import routes from '../../../routes';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import WithTranslateFormErrors from '../../../hoc/WithTranslateFormErrors';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const fromPath = location.state?.from?.pathname || '/';

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('forms.registration.minName'))
      .max(20, t('forms.registration.maxName'))
      .required(t('forms.requiredName')),
    password: yup
      .string()
      .min(6, t('forms.registration.minPassword'))
      .required(t('forms.requiredPassword')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('forms.registration.notMatchPassword'))
      .required(t('forms.requiredPassword')),
  });

  const handleSubmitForm = async ({ username, password }) => {
    try {
      const request = await axios.post(routes.signUpPath(), {
        username,
        password,
      });
      setAuthFailed(false);
      logIn();
      localStorage.setItem('userId', JSON.stringify({ ...request.data }));
      navigate(fromPath);
    } catch (error) {
      if (error.response.status === 409) {
        setAuthFailed(true);
      } else {
        toast.error(t('error.network'));
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmitForm}
    >
      {({
        errors,
        touched,
        handleSubmit,
        setFieldTouched,
      }) => (
        <WithTranslateFormErrors
          errors={errors}
          touched={touched}
          setFieldTouched={setFieldTouched}
        >
          <Form onSubmit={handleSubmit} className="w-75">
            <UsernameInput
              label={t('forms.username')}
              name="username"
              authFailed={authFailed}
            />
            <PasswordInput
              label={t('forms.password')}
              name="password"
              authFailed={authFailed}
            />
            <PasswordInput
              label={t('forms.registration.confirmPassword')}
              name="confirmPassword"
              authFailed={authFailed}
              authFailedError={t('forms.registration.existUser')}
            />
            <Button
              variant="info"
              type="submit"
              className="me-auto"
            >
              {t('forms.registration.button')}
            </Button>
          </Form>
        </WithTranslateFormErrors>
      )}
    </Formik>
  );
};

export default RegistrationForm;
