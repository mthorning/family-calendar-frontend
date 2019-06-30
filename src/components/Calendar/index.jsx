import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DateContext, EventContext} from 'contexts';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

const localizer = BigCalendar.momentLocalizer(moment);

const propTypes = {
  holidays: PropTypes.array,
  events: PropTypes.array,
};

const defaultProps = {
  holidays: [],
  events: [],
};

function Calendar({events, holidays}) {
  const {setDate} = useContext(DateContext);
  const {setSelectedEvent} = useContext(EventContext);

  const highlightHolidays = date => {
    const testDate = moment(date);
    holidays.forEach(holiday => {
      if (holiday.start.isBefore(testDate) && holiday.end.isAfter(testDate)) {
        console.log(date, ' is holiday');
        return {
          style: {
            backgroundColor: '#ff180085',
          },
        };
      }
    });
    console.log(date, 'not hol');
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
      events={events}
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
