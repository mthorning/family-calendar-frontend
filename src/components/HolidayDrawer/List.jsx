import React from 'react'
import { css } from '@emotion/core'

const listStyle = css`
    width: 350px;
`

export default function List({ deleteHoliday, holidays }) {
    function ListItem({ start, end, id }) {
        return (
            <li key={id} onClick={() => deleteHoliday(id)}>
                {`${start} - ${end}`}
            </li>
        )
    }

    return <ul css={listStyle}>{holidays.map(ListItem)}</ul>
}
