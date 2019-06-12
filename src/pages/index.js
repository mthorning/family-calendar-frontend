import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { GET_EVENTS, GET_HOLIDAYS } from 'gql'
import Layout from 'components/Layout'
import Calendar from 'components/Calendar'
import DayView from 'components/DayView'
import EventView from 'components/EventView'
import HolidayDrawer from 'components/HolidayDrawer'
import useDate from 'hooks/useDate'
import { DateContext, EventContext } from 'contexts'
import moment from 'moment'

export default function IndexPage() {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [holidays, setHolidays] = useState([])

    function isHoliday(date) {
        const testDate = moment(date)
        holidays.forEach(holiday => {
            if (
                holiday.start.isBefore(testDate) &&
                holiday.end.isAfter(testDate)
            ) {
                return true
            }
        })
        return false
    }

    const dateHelpers = useDate()
    return (
        <Query query={GET_HOLIDAYS}>
            {({ holData, holLoading, holErr }) => {
                return (
                    <>
                        <HolidayDrawer holidays={holData.holidays} />
                        <Layout>
                            <DateContext.Provider value={dateHelpers}>
                                <EventContext.Provider
                                    value={[selectedEvent, setSelectedEvent]}
                                >
                                    <Query query={GET_EVENTS}>
                                        {({
                                            eventData,
                                            eventLoading,
                                            eventErr,
                                        }) => {
                                            if (holLoading || eventLoading)
                                                return <p>Loading...</p>
                                            if (holErr || eventErr) {
                                                let error = holErr || eventErr
                                                return (
                                                    <p>
                                                        Error: ${error.message}
                                                    </p>
                                                )
                                            }

                                            return (
                                                <Calendar
                                                    holidays={holidays}
                                                    isHoliday={isHoliday}
                                                    setSelectedDate={
                                                        dateHelpers.setDate
                                                    }
                                                    setSelectedEvent={
                                                        setSelectedEvent
                                                    }
                                                    events={eventData.events}
                                                />
                                            )
                                        }}
                                    </Query>
                                    <DayView />
                                    <EventView />
                                </EventContext.Provider>
                            </DateContext.Provider>
                        </Layout>
                    </>
                )
            }}
        </Query>
    )
}
