import React from 'react'
import Layout from '../components/Layout'
import Calendar from '../components/Calendar'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from '../components/Modal'
import AddEventForm from '../components/AddEventForm'
import useDate from '../hooks/useDate'

export default function IndexPage() {
    const { isDate, getDateStr, setDate, getMoment } = useDate()

    function closeModal() {
        setDate(null)
    }
    return (
        <Layout>
            <Query query={GET_EVENTS}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error: ${error.message}</p>

                    return (
                        <Calendar
                            setSelectedDate={setDate}
                            events={data.events}
                        />
                    )
                }}
            </Query>
            <Modal
                closeWith={closeModal}
                open={isDate}
                title={getDateStr('DD/MM/YYYY')}
            >
                <Mutation
                    mutation={CREATE_EVENT}
                    update={(cache, { data: { createEvent } }) => {
                        const { events } = cache.readQuery({
                            query: GET_EVENTS,
                        })
                        cache.writeQuery({
                            query: GET_EVENTS,
                            data: { events: events.concat([createEvent]) },
                        })
                    }}
                >
                    {addEvent => (
                        <AddEventForm
                            {...{
                                addEvent,
                                getMoment,
                                closeModal,
                            }}
                        />
                    )}
                </Mutation>
            </Modal>
        </Layout>
    )
}

const GET_EVENTS = gql`
    {
        events: listEvents {
            title
            start
            end
            allDay
        }
    }
`

const CREATE_EVENT = gql`
    mutation CreateEvent(
        $title: String!
        $start: String
        $end: String
        $allDay: Boolean
    ) {
        createEvent(title: $title, start: $start, end: $end, allDay: $allDay) {
            id
            title
            start
            end
            allDay
        }
    }
`
