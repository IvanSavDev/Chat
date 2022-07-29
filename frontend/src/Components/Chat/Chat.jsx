import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Messages from './Messages/Messages';
import Channels from './Channels/Channels';
import { getDataChat } from '../../slices/data-slice';

export default function Chat() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.statusAuthorization);
  console.log('render chat');

  useEffect(() => {
    dispatch(getDataChat())
      .unwrap()
      .catch((error) => {
        if (!(error.name === 'AxiosError')) {
          toast.error(t('unknownError'));
        } else {
          toast.error(t('networkError'));
        }
      });
  }, [dispatch, t]);

  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#chat1">
      <Row className="h-100">
        {status === 'pending' && <h2>{t('loading')}</h2>}
        {status === 'rejected' && <h2>:(</h2>}
        {status === 'fulfilled' && (
          <>
            <Col xs={4} md={3} lg={2} className="border bg-light py-4 h-100">
              <Channels />
            </Col>
            <Col className="border bg-light py-4 h-100">
              <Messages />
            </Col>
          </>
        )}
      </Row>
    </Tab.Container>
  );
}
