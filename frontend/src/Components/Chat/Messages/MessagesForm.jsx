import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createMessage } from '../../../slices/messages-slice';

const MessagesForm = React.forwardRef((_, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    message: yup
      .string()
      .trim()
      .required('Required'),
  });

  const handleSubmitForm = async (values, actions) => {
    try {
      await dispatch(createMessage(values.message.trim())).unwrap();
      actions.resetForm();
    } catch {
      toast.error(t('error.sendMessage'));
    }
  };

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmitForm}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        isSubmitting,
        dirty,
        isValid,
      }) => (
        <Form className="mt-auto p-3 border bg-light" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              className="text-truncate"
              name="message"
              placeholder={t('chat.placeholderMessage')}
              value={values.message}
              onChange={handleChange}
              ref={ref}
              disabled={isSubmitting}
              autoComplete="off"
            />
            <Button
              variant="info"
              type="submit"
              disabled={(!dirty || !isValid || isSubmitting)}
            >
              {t('chat.send')}
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
});

export default MessagesForm;
