import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  CloseButton, Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createChannel } from '../../../../slices/channels-slice';
import { getModalValidationSchema, getChannelsNames } from '../../../../utils/utils';

const CreateChannelModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status, entities } = useSelector((state) => state.channels);
  const ref = useRef(null);
  const channelsNames = getChannelsNames(entities);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: getModalValidationSchema(channelsNames),
    onSubmit: async ({ channelName }) => {
      try {
        await dispatch(createChannel({ name: channelName.trim() })).unwrap();
        closeModal();
        toast.success(t('notify.createChannel'));
      } catch {
        toast.error(t('createChannelError'));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Modal show onHide={() => status === 'pending' || closeModal()}>
      <Modal.Header>
        <Modal.Title>{t('modal.createChannel')}</Modal.Title>
        <CloseButton
          onClick={closeModal}
          disabled={status === 'pending'}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t('modal.nameChannel')}</Form.Label>
            <Form.Control
              id="channelName"
              name="channelName"
              type="text"
              className={t('modal.nameChannel')}
              value={formik.values.channelName}
              ref={ref}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={formik.touched.channelName && formik.errors.channelName}
              disabled={status === 'pending'}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={closeModal}
              className="me-2"
              disabled={status === 'pending'}
            >
              {t('modal.close')}
            </Button>
            <Button
              type="submit"
              variant="info"
              disabled={status === 'pending'}
            >
              {t('modal.create')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateChannelModal;
