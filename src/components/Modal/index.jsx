import React from 'react'
import { overlay, modal } from './style'

export default function({ children, date }) {
    return (
        <div css={overlay}>
            <div css={modal}>
                <h1>{date}</h1>
                {children}
            </div>
        </div>
    )
}
