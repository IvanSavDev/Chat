import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthorizationForm from './Forms/AuthorizationForm';

const Authorization = () => {
  const { t } = useTranslation();

  return (
    <Row className="h-100 w-100 justify-content-center align-content-center">
      <Card className="col-12 col-md-9 col-lg-7 col-xl-6 p-0 shadow">
        <h2 className="text-center m-0 p-4">{t('forms.authorization.title')}</h2>
        <Card.Body className="row py-4 justify-content-center">
          <AuthorizationForm />
        </Card.Body>
        <Card.Footer>
          <p className="m-0 py-2 text-center">
            <span>{`${t('forms.authorization.footerText')} `}</span>
            <Link to="/signup">{t('forms.authorization.link')}</Link>
          </p>
        </Card.Footer>
      </Card>
    </Row>
  );
};

export default Authorization;
