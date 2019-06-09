import React from 'react'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

const localizer = BigCalendar.momentLocalizer(moment)

export default function Calendar({
    setSelectedDate,
    setSelectedEvent,
    events,
}) {
    const eventsWithDates = events.map(event => ({
        ...event,
        start: new Date(Number(event.start)),
        end: new Date(Number(event.end)),
    }))
    function onSelectSlot(selection) {
        setSelectedDate(selection.start)
    }
    function onSelectEvent(selectedEvent) {
        setSelectedEvent(selectedEvent)
    }
    return (
        <BigCalendar
            selectable
            localizer={localizer}
            events={eventsWithDates}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}
            views={{ month: true, week: true }}
        />
    )
}
