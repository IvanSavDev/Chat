import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Col, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Messages from './Messages/Messages';
import Channels from './Channels/Channels';
import { getDataChat } from '../../slices/channels-slice';
import Modal from './Channels/Modals/Modal';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  const [isChannelPage, setIsChannelPage] = useState(true);
  const [isMobilePage, setIsMobilePage] = useState(false);

  useEffect(() => {
    const firstLoad = async () => {
      try {
        await dispatch(getDataChat()).unwrap();
        setFetching(false);
      } catch (error) {
        if (error === 401) {
          toast.error(t('error.authorisation'));
        } else {
          toast.error(t('error.network'));
        }
      }
    };
    firstLoad();
  }, [dispatch, t]);

  useEffect(() => {
    const watchWidthChange = () => {
      const widthClient = document.documentElement.clientWidth;
      if (widthClient < 575) {
        setIsMobilePage(true);
      } else {
        setIsMobilePage(false);
      }
    };
    watchWidthChange();
    window.addEventListener('resize', watchWidthChange);
    return () => {
      window.removeEventListener('resize', watchWidthChange);
    };
  }, []);

  const openChannelPage = () => {
    if (isMobilePage) {
      setIsChannelPage(true);
    }
  };

  const openMessagePage = () => setIsChannelPage(false);

  let layout = (
    <>
      <Col
        xs={5}
        sm={5}
        md={4}
        lg={3}
        xl={3}
        xxl={2}
        className="h-100 overflow-auto py-4 px-3 border bg-light shadow"
      >
        <Channels isMobilePage={isMobilePage} openMessagePage={openMessagePage} />
      </Col>
      <Col className="h-100 d-flex flex-column bg-light shadow">
        <Messages isMobilePage={isMobilePage} openChannelPage={openChannelPage} />
      </Col>
    </>
  );

  if (isMobilePage) {
    layout = isChannelPage ? (
      <Col className="h-100 overflow-auto py-4 px-3 border bg-light shadow">
        <Channels isMobilePage={isMobilePage} openMessagePage={openMessagePage} />
      </Col>
    ) : (
      <Col className="h-100 d-flex flex-column bg-light shadow">
        <Messages isMobilePage={isMobilePage} openChannelPage={openChannelPage} />
      </Col>
    );
  }

  return (
    fetching ? <Spinner className="align-self-center" animation="border" variant="info" />
      : (
        <>
          <Modal />
          {layout}
        </>
      )
  );
};

export default Chat;
