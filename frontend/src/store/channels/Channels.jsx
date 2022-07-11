import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { Button, ListGroup } from 'react-bootstrap';
import { selectActiveChat } from './channels-slice';

export default function Channels() {
  const dispatch = useDispatch();
  const { ids, entities, currentChannelId } = useSelector(
    (state) => state.channels
  );

  return (
    <>
      <h2>Каналы</h2>
      <div className="overflow-auto">
        {ids.map((id) => {
          const currentChannel = entities[id];
          console.log(currentChannel);
          return (
            <Button
              key={uniqueId()}
              variant={id === currentChannelId ? 'info' : 'secondary'}
              className="w-100 mb-2"
              onClick={() => dispatch(selectActiveChat(id))}
            >
              {currentChannel.name}
            </Button>
          );
        })}
      </div>
    </>
  );
}
