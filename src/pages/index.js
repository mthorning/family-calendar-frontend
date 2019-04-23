import React from 'react'
import { Query } from 'react-apollo'
import { GET_EVENTS } from 'gql'
import Layout from 'components/Layout'
import Calendar from 'components/Calendar'
import DayView from 'components/DayView'
import useDate from 'hooks/useDate'

export default function IndexPage() {
    const dateHelpers = useDate()

    return (
        <Layout>
            <Query query={GET_EVENTS}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error: ${error.message}</p>

                    return (
                        <Calendar
                            setSelectedDate={dateHelpers.setDate}
                            events={data.events}
                        />
                    )
                }}
            </Query>
            <DayView />
        </Layout>
    )
}
