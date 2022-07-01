import LoginForm from '../Components/LoginForm';

const Form = () => {
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="card col-10 col-md-7 col-lg-6 col-xxl-5">
        <h2 className="text-center p-4">Супер форма</h2>
        <div className="card-body mb-4 row justify-content-center">
          <LoginForm></LoginForm>
        </div>
        <div className="card-footer row">
          <p className="text-center">
            <span>Нет аккаунта? </span>
            <a href="/#">Регистрация</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
