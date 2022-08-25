import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  selectActiveChat,
  sendRenameChannel,
  emitChannel,
} from '../../../slices/channels-slice';
import DeleteChannel from './Modals/DeleteModal';
import GeneralModal from './Modals/GeneralModal';

export default function Channels() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    ids, entities, currentChannelId, status,
  } = useSelector(
    (state) => state.channels,
  );
  const [showModalReset, setShowModalReset] = useState(false);
  const [showModalRename, setShowModalRename] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleCloseModalReset = () => setShowModalReset(false);
  const handleShowModalReset = () => setShowModalReset(true);
  const handleCloseModalRename = () => setShowModalRename(false);
  const handleShowModalRename = () => setShowModalRename(true);
  const handleCloseModalCreate = () => setShowModalCreate(false);
  const handleShowModalCreate = () => setShowModalCreate(true);

  const isExistChannel = (nameChannel) => {
    const namesChannels = ids.map((id) => entities[id].name);
    const isExistName = namesChannels.includes(nameChannel);
    return isExistName;
  };

  const textsRenameChannel = {
    success: 'notify.renameChannel',
    header: 'modal.renameChannel',
    title: 'modal.newName',
    channelExist: 'modal.channelExist',
    close: 'modal.close',
    action: 'modal.rename',
  };

  const textsCreateChannel = {
    success: 'notify.createChannel',
    header: 'modal.createChannel',
    title: 'modal.nameChannel',
    channelExist: 'modal.channelExist',
    close: 'modal.close',
    action: 'modal.create',
  };

  const dispatchRenameChannel = (id) => async (name) => (
    dispatch(sendRenameChannel({ name, id })).unwrap()
  );

  const dispatchCreateChannel = async (name) => (
    dispatch(emitChannel({ name })).unwrap()
  );

  return (
    <>
      <div className="mb-2 d-flex">
        <span className="me-auto">{t('chat.channels')}</span>
        <button
          type="button"
          className="btn border-info p-0 w-25 h-25"
          onClick={handleShowModalCreate}
        >
          +
        </button>
        <GeneralModal
          status={status}
          isExistChannel={isExistChannel}
          show={showModalCreate}
          handleClose={handleCloseModalCreate}
          dispatchAction={dispatchCreateChannel}
          texts={textsCreateChannel}
        />
      </div>
      <div>
        {ids.map((id) => {
          const currentChannel = entities[id];
          return (
            <div key={id} className="mb-3">
              {currentChannel.removable ? (
                <Dropdown as={ButtonGroup} className="w-100">
                  <Button
                    className="text-start text-truncate w-75"
                    variant={id === currentChannelId ? 'info' : 'secondary'}
                    onClick={() => dispatch(selectActiveChat(id))}
                  >
                    <span className="me-1">#</span>
                    {currentChannel.name}
                  </Button>
                  <Dropdown.Toggle
                    className="w-25"
                    split
                    variant={id === currentChannelId ? 'info' : 'secondary'}
                    id="dropdown-custom-2"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={handleShowModalReset}>
                      {t('chat.removeChannel')}
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={handleShowModalRename}>
                      {t('chat.renameChannel')}
                    </Dropdown.Item>
                    <DeleteChannel
                      handleClose={handleCloseModalReset}
                      show={showModalReset}
                      idChannel={id}
                      status={status}
                    />
                    <GeneralModal
                      isExistChannel={isExistChannel}
                      status={status}
                      show={showModalRename}
                      handleClose={handleCloseModalRename}
                      dispatchAction={dispatchRenameChannel(id)}
                      texts={textsRenameChannel}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant={id === currentChannelId ? 'info' : 'secondary'}
                  onClick={() => dispatch(selectActiveChat(id))}
                  className="w-100"
                  style={{ textAlign: 'start' }}
                >
                  <span className="me-1">#</span>
                  {currentChannel.name}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
