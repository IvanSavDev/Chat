import React, { useEffect } from 'react';
import Messages from '../store/messages/Messages';
import Channels from '../store/channels/Channels';
import { getDataChat, resetData } from '../store/loadStartData/data-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Row, Col, Container } from 'react-bootstrap';

export default function Chat() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(getDataChat());

    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#chat1">
      <Row>
        {status === 'pending' && <h2>Loading</h2>}
        {status === 'rejected' && <h2>{error}</h2>}
        {status === 'fulfilled' && (
          <>
            <Col sm={4}>
              <Channels></Channels>
            </Col>
            <Col sm={8}>
              <Messages></Messages>
            </Col>
          </>
        )}
      </Row>
    </Tab.Container>
  );
}
