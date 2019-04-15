import React, { useState } from 'react'
import Layout from '../components/Layout'
import Calendar from '../components/Calendar'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from '../components/Modal'
import AddEventForm from '../components/AddEventForm'
import useDate from '../hooks/useDate'

export default function IndexPage() {
    const [events, setEvents] = useState([])
    const { dateStr, setDate } = useDate()
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
                closeWith={() => setDate(null)}
                open={!!dateStr}
                title={dateStr}
            >
                <AddEventForm />
            </Modal>
            <Calendar setSelectedDate={setDate} events={events} />
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
