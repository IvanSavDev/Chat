import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectActiveChat } from '../../../slices/channels-slice';
import { openModal } from '../../../slices/modals-slice';
import Modal from './Modals/Modal';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ids, entities, currentChannelId } = useSelector((state) => state.channels);

  const openModalHandler = (typeModal, idChannel = null) => () => {
    dispatch(openModal({ id: idChannel, type: typeModal }));
  };

  return (
    <div>
      <Modal />
      <div className="mb-2 d-flex">
        <span className="me-auto">{t('chat.channels')}</span>
        <Button
          variant="info"
          className="p-0 w-25 h-25"
          onClick={openModalHandler('createChannel')}
        >
          +
        </Button>
      </div>
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
                  <Dropdown.Item as="button" onClick={openModalHandler('deleteChannel', id)}>
                    {t('chat.removeChannel')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={openModalHandler('renameChannel', id)}>
                    {t('chat.renameChannel')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant={id === currentChannelId ? 'info' : 'secondary'}
                onClick={() => dispatch(selectActiveChat(id))}
                className="w-100 text-start"
              >
                <span className="me-1">#</span>
                {currentChannel.name}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Channels;
