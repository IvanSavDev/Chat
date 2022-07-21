import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../../../slices/channels-slice';
import { useTranslation } from 'react-i18next';

const ModalDelete = ({ show, handleClose, idChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeChannel = () => {
    dispatch(deleteChannel(idChannel));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.deleteChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('modal.deleteBody')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modal.close')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => {
              handleClose();
              removeChannel();
            }}
          >
            {t('modal.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
