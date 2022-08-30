/* eslint-disable no-shadow */
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  CloseButton, Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteChannel, sendRenameChannel, emitChannel } from '../../../../slices/channels-slice';
import { closeModal } from '../../../../slices/modals-slice';

const CreateModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    status, entities,
  } = useSelector((state) => state.channels);
  const ref = useRef(null);
  const namesChannels = Object.values(entities).map(({ name }) => name);

  const schema = yup.object().shape({
    channelName: yup
      .string()
      .required(t('modal.requiredField'))
      .notOneOf(namesChannels, t('modal.channelExist')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    onSubmit: async ({ channelName }) => {
      try {
        await dispatch(emitChannel({ name: channelName })).unwrap();
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
              variant="primary"
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

const DeleteModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.channels);
  const { extra } = useSelector((state) => state.modals);
  const removeChannel = async () => {
    try {
      await dispatch(deleteChannel(extra)).unwrap();
      closeModal();
      toast.success(t('notify.deleteChannel'));
    } catch {
      toast.error(t('notify.error'));
    }
  };

  return (
    <Modal show onHide={() => status === 'pending' || closeModal()}>
      <Modal.Header>
        <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
        <CloseButton onClick={closeModal} disabled={status === 'pending'} />
      </Modal.Header>
      <Modal.Body>
        <p>{t('modal.deleteBody')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={closeModal}
          disabled={status === 'pending'}
        >
          {t('modal.close')}
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={status === 'pending'}
          onClick={removeChannel}
        >
          {t('modal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const RenameModal = ({
  closeModal,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status, entities } = useSelector((state) => state.channels);
  const { extra } = useSelector((state) => state.modals);
  const currentNameChannel = entities[extra].name;
  const ref = useRef(null);
  const namesChannels = Object.values(entities).map(({ name }) => name);

  const schema = yup.object().shape({
    channelName: yup
      .string()
      .required(t('modal.requiredField'))
      .notOneOf(namesChannels, t('modal.channelExist')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: currentNameChannel,
    },
    validationSchema: schema,
    onSubmit: async ({ channelName }) => {
      try {
        await dispatch(sendRenameChannel({ name: channelName, id: extra })).unwrap();
        closeModal();
        toast.success(t('notify.renameChannel'));
      } catch {
        toast.error(t('renameChannelError'));
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
              variant="primary"
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

const Modals = () => {
  const { type } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const mapping = {
    deleteModal: DeleteModal,
    renameModal: RenameModal,
    createModal: CreateModal,
  };

  const Component = mapping[type];

  return Component && <Component closeModal={closeModalHandler} />;
};

export default Modals;
