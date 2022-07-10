import React from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { ListGroup } from 'react-bootstrap';

export default function Channels() {
  const { ids, entities } = useSelector((state) => state.channels);
  console.log(ids);
  return (
    <div>
      <ListGroup>
        {ids.map((idChannel) => {
          const currentChannel = entities[idChannel];
          return (
            <ListGroup.Item
              key={uniqueId()}
              href={idChannel}
              action
              variant="info"
            >
              {currentChannel.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
