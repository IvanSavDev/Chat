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

  const openModalHandler = (typeModal, idChannel = null) => () => {
    dispatch(openModal({ id: idChannel, type: typeModal }));
  };

  const selectColorActiveChat = (id) => {
    if (isMobilePage) {
      return 'secondary';
    }
    return id === currentChannelId ? 'info' : 'secondary';
  };

  return (
    <>
      <div className="d-flex">
        <h3 className="me-auto fw-normal h5">{t('chat.channels')}</h3>
        <Button
          variant="info"
          className="py-0"
          onClick={openModalHandler('createChannel')}
        >
          +
        </Button>
      </div>
      {ids.map((id) => {
        const currentChannel = entities[id];
        return (
          <div key={id} className="mt-3">
            {currentChannel.removable ? (
              <Dropdown as={ButtonGroup} className="w-100">
                <Button
                  className="w-75 text-start text-truncate"
                  variant={selectColorActiveChat(id)}
                  onClick={() => {
                    dispatch(selectActiveChat(id));
                    openMessagePage();
                  }}
                >
                  <span className="me-1">#</span>
                  {currentChannel.name}
                </Button>
                <Dropdown.Toggle
                  className="w-25"
                  split
                  variant={selectColorActiveChat(id)}
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
                variant={selectColorActiveChat(id)}
                onClick={() => {
                  dispatch(selectActiveChat(id));
                  openMessagePage();
                }}
                className="w-100 text-start"
              >
                <span className="me-1">#</span>
                {currentChannel.name}
              </Button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Channels;
