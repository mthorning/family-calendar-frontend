import React, { useState, useMemo } from 'react'
import Layout from '../components/Layout'
import Calendar from '../components/Calendar'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from '../components/Modal'
import AddEventForm from '../components/AddEventForm'
import moment from 'moment'

export default function IndexPage() {
    const [events, setEvents] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const dateStr = useMemo(() => moment(selectedDate).format('DD/MM/YYYY'), [
        selectedDate,
    ])
    return (
        <Layout>
            <Query query={eventsQuery}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error: ${error.message}</p>
                    setEvents(data.events)
                    return null
                }}
            </Query>
            <Modal
                closeWith={() => setSelectedDate(null)}
                open={!!selectedDate}
            >
                <h1>{dateStr}</h1>
                <AddEventForm />
            </Modal>
            <Calendar setSelectedDate={setSelectedDate} events={events} />
        </Layout>
    )
}

const eventsQuery = gql`
    {
        events: listEvents {
            title
            start
            end
            allDay
        }
    }
`
