import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="w-100 pt-5 text-center">
      <h2 className="text-center">{t('notFound.title')}</h2>
      <p>
        {t('notFound.message')}
        <a href="/">{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
