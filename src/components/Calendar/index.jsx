import React from 'react'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

const localizer = BigCalendar.momentLocalizer(moment)

export default function Calendar({ setSelectedDate, events }) {
    function onSelectSlot(selection) {
        setSelectedDate(selection.start)
    }
    return (
        <BigCalendar
            selectable
            localizer={localizer}
            events={events}
            onSelectSlot={onSelectSlot}
        />
    )
}
