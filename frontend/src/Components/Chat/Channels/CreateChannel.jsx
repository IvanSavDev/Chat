import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { emitChannel } from '../../../slices/channels-slice';
import GeneralModal from './Modals/GeneralModal';

const CreateChannel = ({ сhannelExist }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleCloseModalCreate = () => setShowModalCreate(false);
  const handleShowModalCreate = () => setShowModalCreate(true);

  const dispatchCreateChannel = async (name) => (
    dispatch(emitChannel({ name })).unwrap()
  );

  const textsCreateChannel = {
    success: 'notify.createChannel',
    header: 'modal.createChannel',
    title: 'modal.nameChannel',
    channelExist: 'modal.channelExist',
    close: 'modal.close',
    action: 'modal.create',
    error: 'createChannelError',
  };

  return (
    <div className="mb-2 d-flex">
      <span className="me-auto">{t('chat.channels')}</span>
      <Button
        variant="info"
        className="p-0 w-25 h-25"
        onClick={handleShowModalCreate}
      >
        +
      </Button>
      <GeneralModal
        сhannelExist={сhannelExist}
        showModal={showModalCreate}
        closeModal={handleCloseModalCreate}
        dispatchAction={dispatchCreateChannel}
        texts={textsCreateChannel}
      />
    </div>
  );
};

export default CreateChannel;
