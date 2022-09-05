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

const AuthorizationForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const fromPath = location.state?.from?.pathname || '/';

  const schema = yup.object().shape({
    username: yup.string().required(t('forms.requiredName')),
    password: yup.string().required(t('forms.requiredPassword')),
  });

  const handleSubmitForm = async (values) => {
    try {
      const request = await axios.post(routes.loginPath(), {
        ...values,
      });
      setAuthFailed(false);
      logIn();
      localStorage.setItem('userId', JSON.stringify({ ...request.data }));
      navigate(fromPath);
    } catch (error) {
      if (error.response.status === 401) {
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
              authFailedError={t('forms.authFailed')}
            />
            <Button variant="info" type="submit" className="ms-auto">
              {t('button.logIn')}
            </Button>
          </Form>
        </WithTranslateFormErrors>
      )}
    </Formik>
  );
};

export default AuthorizationForm;
