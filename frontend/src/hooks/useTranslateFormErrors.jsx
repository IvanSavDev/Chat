/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useTranslateFormErrors = (errors, touched, setFieldTouched) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.on('languageChanged', () => {
      Object.keys(errors).forEach((fieldName) => {
        if (Object.keys(touched).includes(fieldName)) {
          setTimeout(() => {
            setFieldTouched(fieldName);
          });
        }
      });
    });
    return () => {
      i18n.off('languageChanged', () => {});
    };
  }, [errors]);
};

export default useTranslateFormErrors;
