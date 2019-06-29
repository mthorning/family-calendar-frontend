import React, {useState} from 'react';
import {useQuery} from 'react-apollo-hooks';
import {GET_EVENTS, GET_HOLIDAYS} from 'gql';
import Layout from 'components/Layout';
import Calendar from 'components/Calendar';
import DayView from 'components/DayView';
import EventView from 'components/EventView';
import HolidayDrawer from 'components/HolidayDrawer';
import useDate from 'hooks/useDate';
import {DateContext, EventContext} from 'contexts';

function PopulatedCalendar({holidaysError}) {
  const {data, eventsError, loading} = useQuery(GET_EVENTS);
  const error = eventsError || holidaysError;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error.message}</p>;

  return <Calendar data={data} />;
}

export default function IndexPage() {
  const {data, error, loading} = useQuery(GET_HOLIDAYS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dateHelpers = useDate();

  // function isHoliday(date) {
  //     const testDate = moment(date)
  //     holidays.forEach(holiday => {
  //         if (
  //             holiday.start.isBefore(testDate) &&
  //             holiday.end.isAfter(testDate)
  //         ) {
  //             return true
  //         }
  //     })
  //     return false
  // }

  return (
    <>
      {!loading && <HolidayDrawer data={data} />}
      <Layout>
        <DateContext.Provider value={dateHelpers}>
          <EventContext.Provider value={{selectedEvent, setSelectedEvent}}>
            <PopulatedCalendar holidaysError={error} />
            <DayView />
            <EventView />
          </EventContext.Provider>
        </DateContext.Provider>
      </Layout>
    </>
  );
}
