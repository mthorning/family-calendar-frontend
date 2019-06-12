import gql from 'graphql-tag'

export const GET_EVENTS = gql`
    {
        events: listEvents {
            id
            title
            start
            end
            allDay
        }
    }
`
export const CREATE_EVENT = gql`
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

export const UPDATE_EVENT = gql`
    mutation UpdateEvent(
        $id: String!
        $title: String
        $start: String
        $end: String
        $allDay: Boolean
    ) {
        updateEvent(
            id: $id
            title: $title
            start: $start
            end: $end
            allDay: $allDay
        ) {
            id
            title
            start
            end
            allDay
        }
    }
`

export const DELETE_EVENT = gql`
    mutation DeleteEvent($id: String!) {
        deleteEvent(id: $id) {
            id
        }
    }
`

export const GET_HOLIDAYS = gql`
    {
        events: listHolidays {
            id
            start
            end
        }
    }
`
