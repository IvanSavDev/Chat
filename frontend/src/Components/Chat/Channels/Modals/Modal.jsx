/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../slices/modals-slice';
import RenameChannelModal from './RenameModal';
import CreateChannelModal from './CreateModal';
import DeleteChannelModal from './DeleteModal';

const Modal = () => {
  const { type } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const mapping = {
    deleteChannel: DeleteChannelModal,
    renameChannel: RenameChannelModal,
    createChannel: CreateChannelModal,
  };

  const Component = mapping[type];

  return Component && <Component closeModal={handleCloseModal} />;
};

export default Modal;
