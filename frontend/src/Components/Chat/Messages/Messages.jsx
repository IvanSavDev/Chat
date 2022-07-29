import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { emitMessage } from '../../../slices/messages-slice';

export default function Messages() {
  const { t } = useTranslation();
  const { ids, entities } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);
  const ref = useRef();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { value } = event.target.message;
      await dispatch(emitMessage(leoProfanity.clean(value))).unwrap();
      setMessage('');
      ref.current.focus();
    } catch {
      console.log('ooops');
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, [currentChannelId]);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="d-flex flex-column h-100">
      <h3>{t('chat.messages')}</h3>
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
            placeholder={t('chat.placeholderMessages')}
            value={message}
          />
          <Button variant="info" type="submit" disabled={!message}>
            {t('chat.send')}
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
