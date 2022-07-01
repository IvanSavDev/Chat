import { useFormik } from 'formik';
import { object, string } from 'yup';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: object({
      login: string().required(),
      password: string().required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="w-75">
      <div className="mb-3">
        <label className="form-label" htmlFor="login">
          Ваш логин
        </label>
        <input
          id="login"
          className="form-control"
          name="login"
          type="text"
          placeholder="..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
        />
        {formik.touched.login && formik.errors.login ? (
          <div className="error-valid">{formik.errors.login}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Пароль
        </label>
        <input
          id="password"
          className="form-control"
          name="password"
          type="password"
          placeholder="..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error-valid">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit" className="btn btn-outline-info">
        Авторизация
      </button>
    </form>
  );
};

export default LoginForm;

// <Form onSubmit={formik.handleSubmit} className="w-75">
//   <Form.Group className="mb-3" controlId="formBasicEmail">
//     <Form.Label>Ваш логин</Form.Label>
//     <Form.Control
//       id="login"
//       name="login"
//       type="text"
//       placeholder="..."
//       onChange={formik.handleChange}
//     />
//   </Form.Group>

//   <Form.Group className="mb-3" controlId="formBasicPassword">
//     <Form.Label>Пароль</Form.Label>
//     <Form.Control
//       id="login"
//       name="login"
//       type="password"
//       placeholder="..."
//       onChange={formik.handleChange}
//     />
//   </Form.Group>
//   <Button variant="primary" type="submit" className="ms-auto">
//     Авторизация
//   </Button>
// </Form>;
