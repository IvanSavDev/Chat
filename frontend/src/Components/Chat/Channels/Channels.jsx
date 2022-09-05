import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectActiveChat } from '../../../slices/channels-slice';
import { openModal } from '../../../slices/modals-slice';

const Channels = ({ openMessagePage, isMobilePage }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ids, entities, currentChannelId } = useSelector((state) => state.channels);

  const handleOpenModal = (typeModal, idChannel = null) => () => {
    dispatch(openModal({ id: idChannel, type: typeModal }));
  };

  const handleSelectChannel = (id) => () => {
    dispatch(selectActiveChat(id));
    openMessagePage();
  };

  const selectColorActiveChat = (id, channelId) => {
    if (isMobilePage) {
      return 'secondary';
    }
    return id === channelId ? 'info' : 'secondary';
  };

  return (
    <>
      <div className="d-flex">
        <h3 className="me-auto fw-normal h5">{t('chat.channels')}</h3>
        <Button
          variant="info"
          className="py-0"
          onClick={handleOpenModal('createChannel')}
        >
          +
        </Button>
      </div>
      {ids.map((id) => {
        const currentChannel = entities[id];
        const variantColorButton = selectColorActiveChat(id, currentChannelId);
        return (
          <div key={id} className="mt-3">
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                className="w-100 text-start text-truncate"
                variant={variantColorButton}
                onClick={handleSelectChannel(id)}
              >
                <span className="me-1">#</span>
                {currentChannel.name}
              </Button>
              {currentChannel.removable && (
                <>
                  <Dropdown.Toggle
                    className="w-25"
                    split
                    variant={selectColorActiveChat(id, currentChannelId)}
                    id="dropdown-custom-2"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={handleOpenModal('deleteChannel', id)}>
                      {t('chat.removeChannel')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleOpenModal('renameChannel', id)}>
                      {t('chat.renameChannel')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          </div>
        );
      })}
    </>
  );
};

export default Channels;
