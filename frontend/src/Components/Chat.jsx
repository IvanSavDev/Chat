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
        <Col xs={4} md={3} lg={2} className="border bg-light py-4">
          <h3>Каналы</h3>
        </Col>
        <Col className="border bg-light py-4">
          <h3>Сообщения</h3>
        </Col>
      </Row>
      <Row className="h-75">
        {status === 'pending' && <h2>Loading</h2>}
        {status === 'rejected' && <h2>{error}</h2>}
        {status === 'fulfilled' && (
          <>
            <Col xs={4} md={3} lg={2} className="border bg-light py-4">
              <Channels></Channels>
            </Col>
            <Col className="border bg-light py-4">
              <Messages></Messages>
            </Col>
          </>
        )}
      </Row>
    </Tab.Container>
  );
}
