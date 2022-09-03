/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import RegistrationForm from './Forms/RegistrationForm';

const Registration = () => {
  const { t } = useTranslation();

  return (
    <Row className="h-100 w-100 justify-content-center align-content-center">
      <Card className="col-12 col-md-9 col-lg-7 col-xl-6">
        <h2 className="text-center p-4">{t('forms.registration.title')}</h2>
        <Card.Body className="mb-4 row justify-content-center">
          <RegistrationForm />
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Registration;
