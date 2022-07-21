import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { selectActiveChat } from '../../../store/channels/channels-slice';
import ChannelModal from './CreateModal/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import ModalDelete from './DeleteModal/ModalDelete';
import RenameModal from './RenameModal/RenameModal';

export default function Channels() {
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
        <span className="me-auto">Каналы</span>
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
                        Удалить
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={handleShowModalRename}
                      >
                        Переименовать
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
