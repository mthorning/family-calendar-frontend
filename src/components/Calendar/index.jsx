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

  const green = '#1bff0085';
  const red = '#ff180085';

  const highlightChildCover = event => {
    if (event.childCover) {
      return {
        style: {
          color: '#000',
          backgroundColor: '#fff',
        },
      };
    }
  };

  const highlightHolidays = date => {
    let isHoliday = false;
    let backgroundColor;
    const currentDate = moment(date);
    holidays.forEach(holiday => {
      if (
        holiday.start.isSameOrBefore(currentDate) &&
        holiday.end.isAfter(currentDate)
      ) {
        isHoliday = true;
        backgroundColor = isCovered(currentDate) ? green : red;
      }
    });
    return isHoliday
      ? {
          style: {
            backgroundColor,
          },
        }
      : {};
  };

  function isCovered(date) {
    return !!events.filter(
      event => event.childCover && date.isSame(event.start, 'day'),
    ).length;
  }

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
      eventPropGetter={highlightChildCover}
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
