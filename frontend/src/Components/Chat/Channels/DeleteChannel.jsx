import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DeleteModal from './Modals/DeleteModal';

const DeleteChannel = ({ id }) => {
  const { t } = useTranslation();
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);

  return (
    <>
      <Dropdown.Item as="button" onClick={handleShowModalDelete}>
        {t('chat.removeChannel')}
      </Dropdown.Item>
      <DeleteModal
        closeModal={handleCloseModalDelete}
        showModal={showModalDelete}
        idChannel={id}
      />
    </>
  );
};

export default DeleteChannel;
