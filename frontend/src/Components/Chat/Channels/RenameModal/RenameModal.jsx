import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { sendRenameChannel } from '../../../../store/channels/channels-slice';
import { useDispatch } from 'react-redux';

const RenameModal = ({ idChannel, show, handleClose }) => {
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
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={renameChannel}>
            <Form.Group className="mb-3">
              <Form.Label>Rename channel</Form.Label>
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
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Rename
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameModal;
