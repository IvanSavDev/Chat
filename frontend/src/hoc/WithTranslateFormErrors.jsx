import useTranslateFormErrors from '../hooks/useTranslateFormErrors';

const WithTranslateFormErrors = ({
  errors, touched, setFieldTouched, children,
}) => {
  useTranslateFormErrors(errors, touched, setFieldTouched);
  return children;
};

export default WithTranslateFormErrors;
