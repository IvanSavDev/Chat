import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../../../store/channels/channels-slice';

const ModalDelete = ({ show, handleClose, idChannel }) => {
  const dispatch = useDispatch();

  const removeChannel = () => {
    dispatch(deleteChannel(idChannel));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Вы уверены, что хотите удалить канал?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => {
              handleClose();
              removeChannel();
            }}
          >
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
