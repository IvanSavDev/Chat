import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ListMessages from './ListMessages';
import {
  getCurrentChannelName, VALUE_FOR_SCROLL_TO_BOTTOM, getCountMessages,
} from '../../../utils/utils';
import MessagesForm from './MessagesForm';

export default function Messages({ isMobilePage, openChannelPage }) {
  const { t } = useTranslation();
  const { ids, entities } = useSelector((state) => state.messages);
  const { entities: channels, currentChannelId } = useSelector((state) => state.channels);
  const refInputMessage = useRef();
  const refWindowMessages = useRef();
  const currentChannelName = getCurrentChannelName(channels, currentChannelId);
  const countMessages = getCountMessages(entities, ids, currentChannelId);

  useEffect(() => {
    if (refWindowMessages.current) {
      refWindowMessages.current.scrollTop = VALUE_FOR_SCROLL_TO_BOTTOM;
    }
  }, [entities]);

  useEffect(() => {
    if (refInputMessage.current) {
      refInputMessage.current.focus();
    }
  }, [currentChannelId, entities]);

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
        <ListMessages
          idsMessages={ids}
          messages={entities}
          currentChannelId={currentChannelId}
          ref={refWindowMessages}
        />
        <MessagesForm ref={refInputMessage} />
      </div>
    </>
  );
}
