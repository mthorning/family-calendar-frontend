import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Drawer, Divider } from '@material-ui/core'
import Form from './Form'
import List from './List'
import moment from 'moment'
import { Mutation } from 'react-apollo'
import { DELETE_HOLIDAY, GET_HOLIDAYS, CREATE_HOLIDAY } from 'gql'

function stringToDate(holiday) {
    return {
        ...holiday,
        start: moment(holiday.start),
        end: moment(holiday.end),
    }
}

function dateToString(holiday) {
    return {
        ...holiday,
        //apparently Mongo uses ms but moment uses seconds:
        start: moment.unix(holiday.start / 1000).format('DD/MM/YYYY'),
        end: moment.unix(holiday.end / 1000).format('DD/MM/YYYY'),
    }
}

function HolidayDrawer(props) {
    const { holidays } = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Holidays</Button>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <div css={{ padding: '8px' }}>
                    <h2>Add a Holiday:</h2>
                    <Mutation
                        mutation={CREATE_HOLIDAY}
                        update={(cache, { data: { createHoliday } }) => {
                            const { holidays } = cache.readQuery({
                                query: GET_HOLIDAYS,
                            })
                            cache.writeQuery({
                                query: GET_HOLIDAYS,
                                data: {
                                    holidays: holidays.concat([createHoliday]),
                                },
                            })
                        }}
                    >
                        {createHoliday => (
                            <Form submitHandler={createHoliday} />
                        )}
                    </Mutation>
                    <Divider />
                    <Mutation
                        mutation={DELETE_HOLIDAY}
                        update={(cache, { data: { deleteHoliday } }) => {
                            const { holidays } = cache.readQuery({
                                query: GET_HOLIDAYS,
                            })
                            const deleted = holidays.findIndex(
                                hol => hol.id === deleteHoliday.id
                            )
                            cache.writeQuery({
                                query: GET_HOLIDAYS,
                                data: {
                                    holidays: [
                                        ...holidays.slice(0, deleted),
                                        ...holidays.slice(deleted + 1),
                                    ],
                                },
                            })
                        }}
                    >
                        {deleteHoliday => (
                            <List
                                {...{
                                    holidays: holidays.map(dateToString),
                                    deleteHoliday,
                                }}
                            />
                        )}
                    </Mutation>
                </div>
            </Drawer>
        </>
    )
}

HolidayDrawer.propTypes = {
    holidays: PropTypes.array,
}
HolidayDrawer.defaultProps = {
    holidays: [],
}

export default HolidayDrawer
