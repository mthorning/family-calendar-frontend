import React, {useState} from 'react';
import Layout from 'components/Layout';
import Calendar from 'components/Calendar';
import DayView from 'components/DayView';
import EventView from 'components/EventView';
import HolidayDrawer from 'components/HolidayDrawer';
import {useHolidays, useEvents} from 'hooks/useQueries';
import useDate from 'hooks/useDate';
import {DateContext, EventContext} from 'contexts';
import momentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function IndexPage() {
  const eventsQuery = useEvents();
  const holidaysQuery = useHolidays();

  const events = eventsQuery?.data;
  const holidays = holidaysQuery?.data;
  const error = eventsQuery?.error || holidaysQuery?.error;

  const [selectedEvent, setSelectedEvent] = useState(null);
  const dateHelpers = useDate();

  if (error) return <p>Error: ${error.message}</p>;
  if (eventsQuery?.loading) return <p>Loading...</p>;

  return (
    <MuiPickersUtilsProvider utils={momentUtils}>
      {!holidaysQuery?.loading && <HolidayDrawer {...{holidays}} />}
      <Layout>
        <DateContext.Provider value={dateHelpers}>
          <EventContext.Provider value={{selectedEvent, setSelectedEvent}}>
            <Calendar {...{holidays, events}} />
            <DayView />
            <EventView />
          </EventContext.Provider>
        </DateContext.Provider>
      </Layout>
    </MuiPickersUtilsProvider>
  );
}
