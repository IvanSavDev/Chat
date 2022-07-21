import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  emitMessage,
  subscribeMesseage,
} from '../../../store/messages/messages-slice';

export default function Messages() {
  const { ids, entities, status } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);
  const ref = useRef();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.message.value;
    dispatch(emitMessage(value));
    setMessage('');
    ref.current.focus();
  };

  useEffect(() => {
    ref.current.focus();
  }, [currentChannelId]);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  // useEffect(() => {
  //   dispath(subscribeMesseage());
  // }, [dispath]);

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
            <div key={idMessage} className="mb-2">
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
