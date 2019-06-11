import React, { useState } from 'react'
import { Button, Drawer, Divider } from '@material-ui/core'
import { css } from '@emotion/core'
import Form from './Form'
import moment from 'moment'

const listStyle = css`
    width: 350px;
`
function stringToDate(holiday) {
    return {
        start: moment(holiday.start).format('YYYY-MM-DDT00:00:00'),
        end: moment(holiday.end).format('YYYY-MM-DDT00:00:00'),
    }
}

function dateToString(holiday) {
    return {
        start: moment(holiday.start).format('DD/MM/YYYY'),
        end: moment(holiday.end).format('DD/MM/YYYY'),
    }
}

function ListItem(holiday) {
    return <li>{`${holiday.start} - ${holiday.end}`}</li>
}

function List({ holidays }) {
    return <ul css={listStyle}>{holidays.map(ListItem)}</ul>
}

function HolidayDrawer(props) {
    const { holidays, setHolidays } = props
    const [open, setOpen] = useState(false)

    function addHoliday(holiday) {
        setHolidays([...holidays, stringToDate(holiday)])
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Holidays</Button>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <div css={{ padding: '8px' }}>
                    <h2>Add a Holiday:</h2>
                    <Form submitHandler={addHoliday} />
                    <Divider />
                    <List holidays={holidays.map(dateToString)} />
                </div>
            </Drawer>
        </>
    )
}

export default HolidayDrawer
