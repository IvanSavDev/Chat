import React from 'react';
import { CloseButton, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { deleteChannel } from '../../../../slices/channels-slice';

const DeleteModal = ({
  showModal, closeModal, idChannel,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.channels);
  const removeChannel = async () => {
    try {
      await dispatch(deleteChannel(idChannel)).unwrap();
      closeModal();
      toast.success(t('notify.deleteChannel'));
    } catch {
      toast.error(t('notify.error'));
    }
  };

  return (
    <Modal show={showModal} onHide={() => status === 'pending' || closeModal()}>
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

export default DeleteModal;
