import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  CloseButton, Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { renameChannelRequest } from '../../../../slices/channels-slice';
import { getModalValidationSchema, getChannelsNames } from '../../../../utils/utils';

const RenameChannelModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status, entities } = useSelector((state) => state.channels);
  const { extra } = useSelector((state) => state.modals);
  const ref = useRef(null);
  const currentNameChannel = entities[extra].name;
  const channeslNames = getChannelsNames(entities);

  const formik = useFormik({
    initialValues: {
      channelName: currentNameChannel,
    },
    validationSchema: getModalValidationSchema(channeslNames),
    onSubmit: async ({ channelName }) => {
      try {
        await dispatch(renameChannelRequest({ name: channelName.trim(), id: extra })).unwrap();
        closeModal();
        toast.success(t('notify.renameChannel'));
      } catch {
        toast.error(t('error.renameChannel'));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.select();
    }
  }, []);

  return (
    <Modal show onHide={() => status === 'pending' || closeModal()}>
      <Modal.Header>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
        <CloseButton
          onClick={closeModal}
          disabled={status === 'pending'}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t('modal.newName')}</Form.Label>
            <Form.Control
              id="channelName"
              name="channelName"
              type="text"
              className={t('modal.newName')}
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
              {t('modal.rename')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
