import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { sendRenameChannel } from '../../../slices/channels-slice';
import GeneralModal from './Modals/GeneralModal';

const RenameChannel = ({ id, status, сhannelExist }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showModalRename, setShowModalRename] = useState(false);
  const handleCloseModalRename = () => setShowModalRename(false);
  const handleShowModalRename = () => setShowModalRename(true);

  const dispatchRenameChannel = async (name) => (
    dispatch(sendRenameChannel({ name, id })).unwrap()
  );

  const textsRenameChannel = {
    success: 'notify.renameChannel',
    header: 'modal.renameChannel',
    title: 'modal.newName',
    channelExist: 'modal.channelExist',
    close: 'modal.close',
    action: 'modal.rename',
    error: 'renameChannelError',
  };

  return (
    <>
      <Dropdown.Item onClick={handleShowModalRename}>
        {t('chat.renameChannel')}
      </Dropdown.Item>
      <GeneralModal
        сhannelExist={сhannelExist}
        status={status}
        showModal={showModalRename}
        closeModal={handleCloseModalRename}
        dispatchAction={dispatchRenameChannel}
        texts={textsRenameChannel}
      />
    </>
  );
};

export default RenameChannel;
