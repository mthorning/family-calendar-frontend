import React from 'react'
import Layout from '../components/Layout'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default function IndexPage() {
    const localizer = BigCalendar.momentLocalizer(moment)
    return (
        <Layout>
            <Query query={eventsQuery}>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error: ${error.message}</p>

                    console.log(data)
                    return (
                        <BigCalendar
                            localizer={localizer}
                            events={data.events}
                            startAccessor="start"
                            endAccessor="end"
                        />
                    )
                }}
            </Query>
        </Layout>
    )
}

const eventsQuery = gql`
    {
        events: listEvents {
            id
            full_day
            date
            month
            year
            day
            name
            start_time {
                hours
                minutes
            }
            end_time {
                hours
                minutes
            }
        }
    }
`
