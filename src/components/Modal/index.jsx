import React from 'react';
import PropTypes from 'prop-types';
import {Modal as MaterialModal, DialogTitle} from '@material-ui/core';
import {whiteBox, modalStyle} from './style';

const propTypes = {
  closeWith: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

function Modal({children, closeWith, open, title, subtitle}) {
  return (
    <MaterialModal onBackdropClick={closeWith} css={modalStyle} open={open}>
      <div css={whiteBox}>
        <DialogTitle>
          {title}
          <br />
          {subtitle}
        </DialogTitle>
        {children}
      </div>
    </MaterialModal>
  );
}

Modal.propTypes = propTypes;
export default Modal;
