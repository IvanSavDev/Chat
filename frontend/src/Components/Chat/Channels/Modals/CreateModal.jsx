import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CloseButton } from 'react-bootstrap';
import { emitChannel } from '../../../../slices/channels-slice';

const ChannelModal = ({ isExistChannel }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [existName, setExistName] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.channels);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModal = () => {
    setExistName(false);
    handleClose();
    setChannelName('');
  };

  const createChannel = async (event) => {
    try {
      event.preventDefault();
      const nameChannel = event.target.channel.value;
      const existChannel = isExistChannel(nameChannel);
      if (!existChannel) {
        await dispatch(emitChannel(nameChannel)).unwrap();
        closeModal();
        toast.success(t('notify.createChannel'));
      }
      setExistName(existChannel);
    } catch {
      toast.error(t('notify.error'));
    }
  };

  const handleChannel = (event) => {
    setChannelName(event.target.value);
  };

  return (
    <>
      <button
        type="button"
        className="btn border-info p-0 w-25 h-25"
        onClick={handleShow}
      >
        +
      </button>
      <Modal show={show} onHide={() => status === 'pending' || closeModal()}>
        <Modal.Header>
          <Modal.Title>{t('modal.createChannel')}</Modal.Title>
          <CloseButton
            onClick={closeModal}
            disabled={status === 'pending'}
          />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createChannel}>
            <Form.Group className="mb-3">
              <Form.Label>{t('modal.nameChannel')}</Form.Label>
              <Form.Control
                value={channelName}
                type="text"
                autoFocus
                name="channel"
                onChange={handleChannel}
                isInvalid={existName}
              />
              <Form.Control.Feedback type="invalid">
                {t('modal.channelExist')}
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
    </>
  );
};

export default ChannelModal;
