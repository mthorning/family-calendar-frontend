import React from 'react'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

const localizer = BigCalendar.momentLocalizer(moment)

export default function Calendar({
    setSelectedDate,
    setSelectedEvent,
    isHoliday,
    holidays,
    events,
}) {
    const eventsWithDates = events.map(event => ({
        ...event,
        start: new Date(Number(event.start)),
        end: new Date(Number(event.end)),
    }))

    const highlightHolidays = date => {
        if (isHoliday(date)) {
            return {
                style: {
                    backgroundColor: '#ff180085',
                },
            }
        } else return {}
    }

    function onSelectSlot(selection) {
        setSelectedDate(selection.start)
    }
    function onSelectEvent(selectedEvent) {
        setSelectedEvent(selectedEvent)
    }
    return (
        <BigCalendar
            selectable
            key={holidays.join('')}
            localizer={localizer}
            events={eventsWithDates}
            dayPropGetter={highlightHolidays}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}
            views={{ month: true, week: true }}
        />
    )
}
