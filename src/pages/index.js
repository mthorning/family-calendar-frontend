import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { GET_EVENTS } from 'gql'
import Layout from 'components/Layout'
import Calendar from 'components/Calendar'
import DayView from 'components/DayView'
import EventView from 'components/EventView'
import HolidayDrawer from 'components/HolidayDrawer'
import useDate from 'hooks/useDate'
import { DateContext, EventContext } from 'contexts'

export default function IndexPage() {
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [holidays, setHolidays] = useState([])
    const dateHelpers = useDate()
    return (
        <>
            <HolidayDrawer {...{ holidays, setHolidays }} />
            <Layout>
                <DateContext.Provider value={dateHelpers}>
                    <EventContext.Provider
                        value={[selectedEvent, setSelectedEvent]}
                    >
                        <Query query={GET_EVENTS}>
                            {({ data, loading, error }) => {
                                if (loading) return <p>Loading...</p>
                                if (error) return <p>Error: ${error.message}</p>

                                return (
                                    <Calendar
                                        setSelectedDate={dateHelpers.setDate}
                                        setSelectedEvent={setSelectedEvent}
                                        events={data.events}
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
}
