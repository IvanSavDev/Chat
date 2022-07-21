import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { emitChannel } from '../../../../slices/channels-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChannelModal = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const stateChannels = useSelector((state) => state.channels);
  const [channelName, setChannelName] = useState('');
  const [existName, setExistName] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeModal = () => {
    setExistName(false);
    handleClose();
    setChannelName('');
  };

  const createChannel = (event) => {
    event.preventDefault();
    const nameChannel = event.target.channel.value;
    const { ids, entities } = stateChannels;
    let exist = false;
    ids.forEach((id) => {
      if (entities[id].name === nameChannel) {
        exist = true;
        setExistName(true);
      }
    });
    if (!exist) {
      dispatch(emitChannel(nameChannel));
      closeModal();
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
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.createChannel')}</Modal.Title>
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
              <Button variant="secondary" onClick={closeModal} className="me-2">
                {t('modal.close')}
              </Button>
              <Button type="submit" variant="primary">
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
