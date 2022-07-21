import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { selectActiveChat } from '../../../slices/channels-slice';
import ChannelModal from './Modals/CreateModal';
import Dropdown from 'react-bootstrap/Dropdown';
import ModalDelete from './Modals/DeleteModal';
import RenameModal from './Modals/RenameModal';
import { useTranslation } from 'react-i18next';

export default function Channels() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ids, entities, currentChannelId, error } = useSelector(
    (state) => state.channels
  );
  const [showModalReset, setShowModalReset] = useState(false);
  const [showModalRename, setShowModalRename] = useState(false);
  const handleCloseModalReset = () => setShowModalReset(false);
  const handleShowModalReset = () => setShowModalReset(true);
  const handleCloseModalRename = () => setShowModalRename(false);
  const handleShowModalRename = () => setShowModalRename(true);

  return (
    <>
      <div className="mb-2 d-flex">
        <span className="me-auto">{t('chat.channels')}</span>
        <ChannelModal></ChannelModal>
        {error ? <span>{error}</span> : ''}
      </div>
      <div>
        {ids.map((id) => {
          const currentChannel = entities[id];
          return (
            <div key={id} className="mb-3">
              {entities[id].removable ? (
                <>
                  <Dropdown as={ButtonGroup} className="w-100">
                    <Button
                      variant={id === currentChannelId ? 'info' : 'secondary'}
                      onClick={() => dispatch(selectActiveChat(id))}
                      style={{
                        textAlign: 'start',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      <span className="me-1">#</span>
                      {currentChannel.name}
                    </Button>
                    <Dropdown.Toggle
                      split
                      variant={id === currentChannelId ? 'info' : 'secondary'}
                      id="dropdown-custom-2"
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item as="button" onClick={handleShowModalReset}>
                        {t('chat.removeChannel')}
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={handleShowModalRename}
                      >
                        {t('chat.renameChannel')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <ModalDelete
                    handleClose={handleCloseModalReset}
                    show={showModalReset}
                    idChannel={id}
                  ></ModalDelete>
                  <RenameModal
                    handleClose={handleCloseModalRename}
                    show={showModalRename}
                    idChannel={id}
                  ></RenameModal>
                </>
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
