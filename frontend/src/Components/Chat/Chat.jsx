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
  // const { status } = useSelector((state) => state.statusAuthorization);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    dispatch(getDataChat())
      .unwrap()
      .then(() => {
        setFetching(false);
      })
      .catch((error) => {
        if (!(error.name === 'AxiosError')) {
          toast.error(t('unknownError'));
        } else {
          toast.error(t('networkError'));
        }
      });
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

// {status === 'pending' && <h2>{t('loading')}</h2>}
// {status === 'rejected' && <h2>:(</h2>}
// {status === 'fulfilled' && (
//  )}
