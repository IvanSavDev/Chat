import React from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { Form, Tab, Button, InputGroup } from 'react-bootstrap';

export default function Messages() {
  const { ids, entities } = useSelector((state) => state.messages);

  return (
    <div className="h-100 d-flex flex-column">
      <Tab.Content>
        {ids.map((idMessage) => {
          const currentMessage = entities[idMessage];
          return <Tab.Pane key={uniqueId()}>{currentMessage.body}</Tab.Pane>;
        })}
      </Tab.Content>
      <Form className="mt-auto">
        <InputGroup className="mb-3">
          <Form.Control placeholder="Напишите ваше сообщение здесь" />
          <Button variant="info" type="submit">
            Submit
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
