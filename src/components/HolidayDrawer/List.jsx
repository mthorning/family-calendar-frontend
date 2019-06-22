import React from 'react'
import { css } from '@emotion/core'

const listStyle = css`
    width: 350px;
    li:hover {
        cursor: pointer;
    }
`

export default function List({ deleteHoliday, holidays }) {
    function ListItem({ start, end, id }) {
        return (
            <li key={id} onClick={() => deleteHoliday({ variables: { id } })}>
                {`${start} - ${end}`}
            </li>
        )
    }

    return <ul css={listStyle}>{holidays.map(ListItem)}</ul>
}
