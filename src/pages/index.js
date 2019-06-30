import React, {useState} from 'react';
import {GET_EVENTS, GET_HOLIDAYS} from 'gql';
import Layout from 'components/Layout';
import Calendar from 'components/Calendar';
import DayView from 'components/DayView';
import EventView from 'components/EventView';
import HolidayDrawer from 'components/HolidayDrawer';
import useQuery from 'hooks/useQuery';
import useDate from 'hooks/useDate';
import {DateContext, EventContext} from 'contexts';

export default function IndexPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dateHelpers = useDate();

  const holidaysQuery = useQuery(GET_HOLIDAYS, 'holidays');
  const holidays = holidaysQuery?.data;

  const eventsQuery = useQuery(GET_EVENTS, 'events');
  const events = eventsQuery?.data;

  const error = eventsQuery?.error || holidaysQuery?.error;

  if (error) return <p>Error: ${error.message}</p>;
  if (eventsQuery?.loading) return <p>Loading...</p>;

  return (
    <>
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
    </>
  );
}
