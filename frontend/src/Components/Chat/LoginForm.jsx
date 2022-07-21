import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import routes from '../../routes';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputEl = useRef();
  const fromPath = location.state?.from?.pathname || '/';

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object({
      username: string().required(),
      password: string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const request = await axios.post(routes.loginPath(), {
          ...values,
        });
        setAuthFailed(false);
        logIn();
        localStorage.setItem('userId', JSON.stringify(request.data.token));
        navigate(fromPath);
      } catch (error) {
        setAuthFailed(true);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="w-75">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Ваш логин</Form.Label>
        <Form.Control
          id="username"
          name="username"
          type="text"
          placeholder="..."
          ref={inputEl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={
            (formik.touched.username && formik.errors.username) || authFailed
          }
        />
        {authFailed ? (
          ''
        ) : (
          <Form.Control.Feedback type="invalid">
            Please enter a username.
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control
          id="password"
          name="password"
          type="password"
          placeholder="..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={
            (formik.touched.password && formik.errors.password) || authFailed
          }
        />
        {authFailed ? (
          <Form.Control.Feedback type="invalid">
            Неверные имя пользователя или пароль
          </Form.Control.Feedback>
        ) : (
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button variant="primary" type="submit" className="ms-auto">
        Авторизация
      </Button>
    </Form>
  );
};

export default LoginForm;
