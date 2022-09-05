/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RegistrationForm from './Forms/RegistrationForm';

const Registration = () => {
  const { t } = useTranslation();

  return (
    <Row className="h-100 w-100 justify-content-center align-content-center">
      <Card className="col-12 col-md-9 col-lg-7 col-xl-6 py-4 shadow">
        <h2 className="p-3 m-0 text-center">{t('forms.registration.title')}</h2>
        <Card.Body className="row py-3 justify-content-center">
          <RegistrationForm />
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Registration;
