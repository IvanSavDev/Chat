import React, { useEffect } from 'react';
import Messages from './Messages/Messages';
import Channels from './Channels/Channels';
import { getDataChat } from '../../slices/data-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function Chat() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.statusAuthorization);

  useEffect(() => {
    dispatch(getDataChat());
  }, [dispatch]);

  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#chat1">
      <Row className="h-100">
        {status === 'pending' && <h2>{t('loading')}</h2>}
        {status === 'rejected' && <h2>{error}</h2>}
        {status === 'fulfilled' && (
          <>
            <Col xs={4} md={3} lg={2} className="border bg-light py-4 h-100">
              <Channels></Channels>
            </Col>
            <Col className="border bg-light py-4 h-100">
              <Messages></Messages>
            </Col>
          </>
        )}
      </Row>
    </Tab.Container>
  );
}
