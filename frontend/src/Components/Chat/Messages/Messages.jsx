import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createMessage } from '../../../slices/messages-slice';
import {
  getCurrentChannelName, VALUE_FOR_SCROLL_TO_BOTTOM, getCountMessages,
} from '../../../utils/utils';

export default function Messages({ isMobilePage, openChannelPage }) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const { ids, entities, status } = useSelector((state) => state.messages);
  const { entities: channels, currentChannelId } = useSelector((state) => state.channels);
  const ref = useRef();
  const refWindowMessage = useRef();
  const dispatch = useDispatch();
  const currentChannelName = getCurrentChannelName(channels, currentChannelId);
  const countMessages = getCountMessages(entities, ids, currentChannelId);

  useEffect(() => {
    refWindowMessage.current.scrollTop = VALUE_FOR_SCROLL_TO_BOTTOM;
  }, [entities]);

  useEffect(() => {
    ref.current.focus();
  }, [currentChannelId]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { value } = event.target.message;
      await dispatch(createMessage(value)).unwrap();
      setMessage('');
      ref.current.focus();
    } catch {
      toast.error(t('error.sendMessage'));
    }
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <div className="d-flex p-3 border">
        {isMobilePage && (
          <div className="me-2">
            <Button variant="info" onClick={openChannelPage}>{'<'}</Button>
          </div>
        )}
        <div>
          <h3>{`#${currentChannelName}`}</h3>
          <span>{`${t('chat.countMessages')} ${countMessages}`}</span>
        </div>
      </div>
      <div className="h-100 d-flex flex-column overflow-hidden bg-white">
        <div
          className=" h-100 d-flex flex-column-reverse overflow-auto px-3 pb-2 border"
          ref={refWindowMessage}
        >
          {[...ids].reverse().map((idMessage) => {
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
        <Form className="mt-auto p-3 border bg-light" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              name="message"
              value={message}
              placeholder={t('chat.placeholderMessage')}
              onChange={handleMessage}
              ref={ref}
              autoComplete="off"
              className="text-truncate"
            />
            <Button variant="info" type="submit" disabled={!message || status === 'pending'}>
              {t('chat.send')}
            </Button>
          </InputGroup>
        </Form>
      </div>
    </>
  );
}
