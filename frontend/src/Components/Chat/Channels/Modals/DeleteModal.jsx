import React from 'react';
import { CloseButton, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../../../slices/channels-slice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const DeleteModal = ({ show, handleClose, idChannel, status }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const removeChannel = async () => {
    try {
      await dispatch(deleteChannel(idChannel)).unwrap();
      handleClose();
      toast.success(t('notify.deleteChannel'));
    } catch {
      toast.error(t('notify.error'));
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => status === 'pending' || handleClose()}>
        <Modal.Header>
          <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
          <CloseButton
            onClick={handleClose}
            disabled={status === 'pending'}
          ></CloseButton>
        </Modal.Header>
        <Modal.Body>
          <p>{t('modal.deleteBody')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
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
    </>
  );
};

export default DeleteModal;
