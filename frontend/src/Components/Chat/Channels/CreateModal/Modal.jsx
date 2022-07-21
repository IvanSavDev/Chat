import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { emitChannel } from '../../../../store/channels/channels-slice';
import { useDispatch } from 'react-redux';
import { subscribeChannel } from '../../../../store/channels/channels-slice';

const ChannelModal = () => {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createChannel = (event) => {
    event.preventDefault();
    const nameChannel = event.target.channel.value;
    console.log(nameChannel);
    dispatch(emitChannel(nameChannel));
    setChannelName('');
  };

  const handleChannel = (event) => {
    setChannelName(event.target.value);
  };

  // useEffect(() => {
  //   dispatch(subscribeChannel());
  // }, [dispatch]);

  return (
    <>
      <button
        type="button"
        className="btn border-info p-0 w-25 h-25"
        onClick={handleShow}
      >
        +
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createChannel}>
            <Form.Group className="mb-3">
              <Form.Label>Name channel</Form.Label>
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
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChannelModal;
