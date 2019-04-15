import React from 'react'
import { Modal, DialogTitle } from '@material-ui/core'
import { whiteBox, modalStyle } from './style'

export default function({ children, closeWith, open, title }) {
    return (
        <Modal onBackdropClick={closeWith} css={modalStyle} open={open}>
            <div css={whiteBox}>
                <DialogTitle>{title}</DialogTitle>
                {children}
            </div>
        </Modal>
    )
}
