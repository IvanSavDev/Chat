import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Tab, Row, Col, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Messages from './Messages/Messages';
import Channels from './Channels/Channels';
import { getDataChat } from '../../slices/channels-slice';

export default function Chat() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const firstLoad = async () => {
      try {
        await dispatch(getDataChat()).unwrap();
        setFetching(false);
      } catch (error) {
        if (error === 401) {
          toast.error(t('authorisationError'));
        } else {
          toast.error(t('networkError'));
        }
      }
    };

    firstLoad();
  }, [dispatch, t]);

  return (
    fetching ? <Spinner className="align-self-center" animation="border" variant="info" />
      : (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#chat1">
          <Row className="h-100 w-100">
            <Col xs={4} md={3} lg={2} className="border bg-light py-4 h-100">
              <Channels />
            </Col>
            <Col className="border bg-light py-4 h-100">
              <Messages />
            </Col>

          </Row>
        </Tab.Container>
      )
  );
}
