import React, { useRef, useEffect, useState } from 'react';
import {
  CloseButton, Button, Modal, Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';

const GeneralModal = ({
  сhannelExist,
  closeModal,
  showModal,
  dispatchAction,
  texts,
}) => {
  const { t } = useTranslation();
  // const [channelName, setChannelName] = useState('');
  const [isExistChannelName, setIsExistChannelName] = useState(false);
  const { status } = useSelector((state) => state.channels);
  const ref = useRef(null);

  //   const setChannelNameHandler = (event) => {
  //   setChannelName(event.target.value);
  // };

  const schema = yup.object().shape({
    channelName: yup.string().required('efwef'),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    onSubmit: async ({ channelName }) => {
      try {
        const isExistChannel = сhannelExist(channelName);
        if (!isExistChannel) {
          await dispatchAction(channelName);
          setIsExistChannelName(false);
          closeModal();
          // setChannelName('');
          toast.success(t(texts.success));
        }
        setIsExistChannelName(isExistChannel);
      } catch (error) {
        console.log(error);
        toast.error(t(texts.error));
      }
    },
  });

  const closeModalHandler = () => {
    setIsExistChannelName(false);
    closeModal();
    formik.handleChange('');
  };

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
      ref.current.focus();
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => status === 'pending' || closeModalHandler()}>
      <Modal.Header>
        <Modal.Title>{t(texts.header)}</Modal.Title>
        <CloseButton
          onClick={closeModalHandler}
          disabled={status === 'pending'}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{t(texts.title)}</Form.Label>
            <Form.Control
              id="channelName"
              className={t(texts.title)}
              value={formik.values.channelName}
              type="text"
              name="channelName"
              ref={ref}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={isExistChannelName || (formik.touched.username && formik.errors.username)}
            />
            <Form.Control.Feedback type="invalid">
              {t(texts.channelExist)}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={closeModalHandler}
              className="me-2"
              disabled={status === 'pending'}
            >
              {t(texts.close)}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'pending'}
            >
              {t(texts.action)}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GeneralModal;
