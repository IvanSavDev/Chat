import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Row, Col, Spinner, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Messages from './Messages/Messages';
import Channels from './Channels/Channels';
import { getDataChat } from '../../slices/channels-slice';
import Modal from './Channels/Modals/Modal';

export default function Chat() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState('Каналы');
  const [mobilePage, setMobilePage] = useState(false);

  const changePageHandler = () => {
    setCurrentPage((prevState) => (
      prevState === t('chat.channels') ? t('chat.messages') : t('chat.channels')
    ));
  };

  const openMessagesPageHandler = () => {
    if (mobilePage) {
      setCurrentPage('Сообщения');
    }
  };

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
        setMobilePage((isMobilePage) => isMobilePage || true);
      } else {
        setMobilePage((isMobilePage) => isMobilePage && false);
      }
    };
    window.addEventListener('resize', watchWidthChange);
    watchWidthChange();
    return () => {
      window.removeEventListener('resize', watchWidthChange);
    };
  }, []);

  let layout = (
    <>
      <Col xs={5} sm={5} md={4} lg={3} xl={3} xxl={2} className="overflow-auto border bg-light py-4 h-100">
        <Channels openMessagesPage={openMessagesPageHandler} />
      </Col>
      <Col className="bg-light h-100 p-0">
        <Messages />
      </Col>
    </>
  );

  if (mobilePage) {
    layout = currentPage === 'Сообщения' ? (
      <Col className="bg-light h-100 p-0">
        <Messages />
      </Col>
    ) : (
      <Col className="overflow-auto border bg-light h-100 py-4">
        <Channels openMessagesPage={openMessagesPageHandler} />
      </Col>
    );
  }

  return (
    fetching ? <Spinner className="align-self-center" animation="border" variant="info" />
      : (
        <>
          <Modal />
          {mobilePage && (
            <div className="align-self-start mb-2 py-2">
              <Button variant="info" onClick={changePageHandler}>
                {currentPage}
              </Button>
            </div>
          )}
          <Row className="h-90 flex-grow-1 w-100">
            {layout}
          </Row>
        </>
      )
  );
}
