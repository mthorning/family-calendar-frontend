import React from 'react'
import { Modal } from '@material-ui/core'
import { whiteBox, modalStyle } from './style'

export default function({ children, closeWith, open }) {
    return (
        <Modal onBackdropClick={closeWith} css={modalStyle} open={open}>
            <div css={whiteBox}>{children}</div>
        </Modal>
    )
}
