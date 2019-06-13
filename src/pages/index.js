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

    // function isHoliday(date) {
    //     const testDate = moment(date)
    //     holidays.forEach(holiday => {
    //         if (
    //             holiday.start.isBefore(testDate) &&
    //             holiday.end.isAfter(testDate)
    //         ) {
    //             return true
    //         }
    //     })
    //     return false
    // }

    const dateHelpers = useDate()

    function PopulatedCalendar() {
        return (
            <Query query={GET_EVENTS}>
                {({ data, loading, err }) => {
                    if (loading) return <p>Loading...</p>
                    if (err) return <p>Error: ${err.message}</p>

                    return (
                        <Calendar
                            setSelectedDate={dateHelpers.setDate}
                            setSelectedEvent={setSelectedEvent}
                            events={data.events}
                        />
                    )
                }}
            </Query>
        )
    }

    return (
        <Query query={GET_HOLIDAYS}>
            {({ data, loading, err }) => {
                if (err) return <p>Error: ${err.message}</p>
                return (
                    <>
                        {!loading && <HolidayDrawer holidays={data.holidays} />}
                        <Layout>
                            <DateContext.Provider value={dateHelpers}>
                                <EventContext.Provider
                                    value={[selectedEvent, setSelectedEvent]}
                                >
                                    <PopulatedCalendar />
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
