import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-center">{t('notFoundPage')}</h2>
      <p>
        {t('notFound.message')}
        <a href="/">{t('notFound.link')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
