import React, { useState } from 'react';
import {
  CloseButton, Button, Modal, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const GeneralModal = ({
  isExistChannel,
  handleClose,
  show,
  status,
  dispatchAction,
  texts,
}) => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState('');
  const [existName, setExistName] = useState(false);

  const closeModal = () => {
    setExistName(false);
    handleClose();
    setChannelName('');
  };

  const changeleChannelHandler = async (event) => {
    try {
      event.preventDefault();
      const nameChannel = event.target.channel.value;
      const existChannel = isExistChannel(nameChannel);
      if (!existChannel) {
        await dispatchAction(nameChannel);
        closeModal();
        setChannelName('');
        toast.success(t(texts.success));
      }
      setExistName(existChannel);
    } catch {
      toast.error(texts.error);
    }
  };

  const handleChannel = (event) => {
    setChannelName(event.target.value);
  };

  return (
    <Modal show={show} onHide={() => status === 'pending' || closeModal()}>
      <Modal.Header>
        <Modal.Title>{t(texts.header)}</Modal.Title>
        <CloseButton
          onClick={closeModal}
          disabled={status === 'pending'}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={changeleChannelHandler}>
          <Form.Group className="mb-3">
            <Form.Label>{t(texts.title)}</Form.Label>
            <Form.Control
              value={channelName}
              type="text"
              autoFocus
              name="channel"
              onChange={handleChannel}
              isInvalid={existName}
            />
            <Form.Control.Feedback type="invalid">
              {t(texts.channelExist)}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={closeModal}
              className="me-2"
              disabled={status === 'pending'}
            >
              {t(texts.close)}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'pending'}
            >
              {t(texts.action)}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GeneralModal;
