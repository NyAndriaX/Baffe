import { Modal, TextContainer } from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';

export default function CommonModal({
  optionModal,
  setOptionModal,
  handleAction,
}) {
  return (
    <div style={{ height: '45px', display: 'none' }}>
      <Modal
        open={optionModal.open}
        onClose={() => setOptionModal({ ...optionModal, open: false })}
        title={optionModal.title}
        primaryAction={{
          content: optionModal.buttonLabel,
          onAction: async () => {
            await handleAction();
            setOptionModal({ ...optionModal, open: false });
          },
        }}
        secondaryActions={[
          {
            content: 'Annuler',
            onAction: () => setOptionModal({ ...optionModal, open: false }),
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>{optionModal.content}</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

CommonModal.propTypes = {
  optionModal: PropTypes.exact({
    open: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    buttonLabel: PropTypes.string,
  }),
  setOptionModal: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
};

CommonModal.defaultProps = {
  optionModal: {
    open: false,
    title: null,
    content: null,
    buttonLabel: null,
  },
};
