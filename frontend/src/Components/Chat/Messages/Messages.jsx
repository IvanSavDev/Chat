import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { createMessage } from '../../../slices/messages-slice';

export default function Messages() {
  const { t } = useTranslation();
  const { ids, entities, status } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);
  const ref = useRef();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { value } = event.target.message;
      await dispatch(createMessage(leoProfanity.clean(value))).unwrap();
      setMessage('');
      ref.current.focus();
    } catch {
      toast.error(t('messageSendError'));
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, [currentChannelId]);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const countMessages = ids.reduce((acc, id) => (
    entities[id].channelId === currentChannelId ? acc + 1 : acc
  ), 0);

  return (
    <div className="d-flex flex-column h-100">
      <div className="border p-3">
        <h3>{t('chat.messages')}</h3>
        <span>{`Количество сообщений: ${countMessages}`}</span>
      </div>
      <div className="d-flex flex-column h-100 bg-white overflow-hidden">
        <div className="overflow-auto px-3 border h-100">
          {ids.map((idMessage) => {
            const currentMessage = entities[idMessage];
            if (currentMessage.channelId !== currentChannelId) {
              return '';
            }
            return (
              <div key={idMessage} className="pt-2 text-break">
                <span>
                  <strong>{`${currentMessage.username}: `}</strong>
                </span>
                <span>{currentMessage.body}</span>
              </div>
            );
          })}
        </div>
        <Form className="mt-auto p-3 bg-light border" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              name="message"
              value={message}
              placeholder={t('chat.placeholderMessages')}
              onChange={handleMessage}
              ref={ref}
            />
            <Button variant="info" type="submit" disabled={!message || status === 'pending'}>
              {t('chat.send')}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
}
