import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { selectActiveChat } from '../../../slices/channels-slice';
import DeleteChannel from './DeleteChannel';
import CreateChannel from './CreateChannel';
import RenameChannel from './RenameChannel';

export default function Channels() {
  const dispatch = useDispatch();
  const {
    ids, entities, currentChannelId,
  } = useSelector(
    (state) => state.channels,
  );
  // const { type } = useSelector((state) => state.modals);

  const сhannelExist = (nameChannel) => {
    const namesChannels = ids.map((id) => entities[id].name);
    const isExistName = namesChannels.includes(nameChannel);
    return isExistName;
  };

  return (
    <div>
      {/* {type && <Modal />} */}
      <CreateChannel сhannelExist={сhannelExist} />
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
                  <DeleteChannel id={id} />
                  <RenameChannel id={id} сhannelExist={сhannelExist} />
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
}
