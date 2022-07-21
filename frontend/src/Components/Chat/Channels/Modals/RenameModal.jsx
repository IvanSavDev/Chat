import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { sendRenameChannel } from '../../../../slices/channels-slice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const RenameModal = ({ idChannel, show, handleClose }) => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState('');
  const dispatch = useDispatch();

  const renameChannel = (event) => {
    event.preventDefault();
    const nameChannel = event.target.channel.value;
    dispatch(sendRenameChannel({ nameChannel, idChannel }));
    setChannelName('');
  };

  const handleChannel = (event) => {
    setChannelName(event.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={renameChannel}>
            <Form.Group className="mb-3">
              <Form.Label>{t('modal.newName')}</Form.Label>
              <Form.Control
                value={channelName}
                type="text"
                autoFocus
                name="channel"
                onChange={handleChannel}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                {t('modal.close')}
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                {t('modal.rename')}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameModal;
