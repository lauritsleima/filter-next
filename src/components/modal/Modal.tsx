import Modal, {Styles} from 'react-modal';
import React from 'react';
import {Filter} from '@/lib/types';
import {ModalContents} from '@/components/modal/ModalContents';

type ModalProps = {
  filter?: Filter;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const FilterModal: React.FC<ModalProps> = ({filter, isModalOpen, setIsModalOpen}) => {
  const modalStyles: Styles = {
    content: {
      width: '700px',
      height: '300px',
      minHeight: '300px',
      maxHeight: '90vh',
      margin: 'auto',
      resize: 'vertical',
      overflow: 'auto'
    },
  };

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal ariaHideApp={false} isOpen={isModalOpen} onRequestClose={handleClose} style={modalStyles}>
      <ModalContents filter={filter} setIsModalOpen={setIsModalOpen} handleClose={handleClose} />
    </Modal>
  )
}
