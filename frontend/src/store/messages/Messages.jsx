import React from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { Tab } from 'react-bootstrap';

export default function Messages() {
  const { ids, entities } = useSelector((state) => state.messages);

  return (
    <div>
      <Tab.Content>
        {ids.map((idMessage) => {
          const currentMessage = entities[idMessage];
          return (
            <Tab.Pane key={uniqueId()} eventKey={currentMessage.channel}>
              {currentMessage.body}
            </Tab.Pane>
          );
        })}
      </Tab.Content>
    </div>
  );
}
