import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CloseButton, Button, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteChannel } from '../../../../slices/channels-slice';

const DeleteChannelModal = ({ closeModal }) => {
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

export default DeleteChannelModal;
