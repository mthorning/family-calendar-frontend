import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DateContext, EventContext} from 'contexts';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

const localizer = BigCalendar.momentLocalizer(moment);

const propTypes = {
  data: PropTypes.object,
};

const defaultProps = {
  data: {events: []},
};

function Calendar({data: {events}}) {
  const {setDate} = useContext(DateContext);
  const {setSelectedEvent} = useContext(EventContext);

  const eventsWithDates = events.map(event => ({
    ...event,
    start: new Date(Number(event.start)),
    end: new Date(Number(event.end)),
  }));

  const highlightHolidays = date => {
    // if (isHoliday(date)) {
    //     return {
    //         style: {
    //             backgroundColor: '#ff180085',
    //         },
    //     }
    // } else return {}
    return {};
  };

  function onSelectSlot(selection) {
    setDate(selection.start);
  }
  function onSelectEvent(selectedEvent) {
    setSelectedEvent(selectedEvent);
  }
  return (
    <BigCalendar
      selectable
      localizer={localizer}
      events={eventsWithDates}
      dayPropGetter={highlightHolidays}
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      views={{month: true, week: true}}
    />
  );
}
Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;
export default Calendar;
