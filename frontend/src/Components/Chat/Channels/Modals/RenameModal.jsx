import React, { useState } from 'react';
import { CloseButton, Button, Modal, Form } from 'react-bootstrap';
import { sendRenameChannel } from '../../../../slices/channels-slice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RenameModal = ({
  idChannel,
  show,
  handleClose,
  isExistChannel,
  status,
}) => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState('');
  const [existName, setExistName] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setExistName(false);
    handleClose();
    setChannelName('');
  };

  const renameChannel = (id) => async (event) => {
    try {
      event.preventDefault();
      const nameChannel = event.target.channel.value;
      const existChannel = isExistChannel(nameChannel);

      if (!existChannel) {
        await dispatch(sendRenameChannel({ nameChannel, idChannel })).unwrap();
        closeModal();
        setChannelName('');
        toast.success(t('notify.renameChannel'));
      }
      setExistName(existChannel);
    } catch {
      toast.error(t('notify.error'));
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => status === 'pending' || closeModal()}>
        <Modal.Header>
          <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
          <CloseButton
            onClick={closeModal}
            disabled={status === 'pending'}
          ></CloseButton>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={renameChannel(idChannel)}>
            <Form.Group className="mb-3">
              <Form.Label>{t('modal.newName')}</Form.Label>
              <Form.Control
                value={channelName}
                type="text"
                autoFocus
                name="channel"
                onChange={(event) => setChannelName(event.target.value)}
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
