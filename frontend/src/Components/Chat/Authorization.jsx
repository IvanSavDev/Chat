import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const Authorization = () => {
  const { t } = useTranslation();

  return (
    <Row className="justify-content-center align-content-center h-100 w-100">
      <div className="card col-10 col-md-7 col-lg-6 col-xxl-5">
        <h2 className="text-center p-4">{t('forms.authorization.title')}</h2>
        <div className="card-body mb-4 row justify-content-center">
          <LoginForm />
        </div>
        <div className="card-footer row">
          <p className="text-center">
            <span>{`${t('forms.authorization.footerText')} `}</span>
            <Link to="/signup">{t('forms.authorization.link')}</Link>
          </p>
        </div>
      </div>
    </Row>
  );
};

export default Authorization;
