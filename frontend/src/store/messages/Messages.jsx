import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { Form, List, Button, InputGroup, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { sendMessage, subscribeMesseage } from './messages-slice';

export default function Messages() {
  const { ids, entities, status } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);
  const ref = useRef();
  const [message, setMessage] = useState('');
  const dispath = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.message.value;
    dispath(sendMessage(value));
    setMessage('');
  };

  useEffect(() => {
    ref.current.focus();
  }, [currentChannelId]);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    dispath(subscribeMesseage());
  }, [dispath]);

  return (
    <div className="d-flex flex-column h-100">
      <h2>Сообщения</h2>
      <div className="overflow-auto mb-2 p-3">
        {ids.map((idMessage) => {
          const currentMessage = entities[idMessage];
          if (currentMessage.channelId !== currentChannelId) {
            return '';
          }
          return (
            <div key={idMessage} className="mb-4">
              <span>
                <strong>{currentMessage.username}: </strong>
              </span>
              <span>{currentMessage.body}</span>
            </div>
          );
        })}
      </div>
      <Form className="mt-auto" onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            ref={ref}
            onChange={handleMessage}
            name="message"
            placeholder="Напишите ваше сообщение здесь"
            value={message}
          />
          <Button
            variant="info"
            type="submit"
            disabled={status !== 'fulfilled' || !message}
          >
            Submit
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
