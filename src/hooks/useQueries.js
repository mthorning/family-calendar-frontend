import {useQuery as useApolloQuery} from 'react-apollo-hooks';
import {GET_EVENTS, GET_HOLIDAYS} from 'gql';
import moment from 'moment';

function dbToMoment(data) {
  return data?.map(datum => {
    return {
      ...datum,
      //apparently Mongo uses ms but moment uses seconds:
      start: moment.unix(datum.start / 1000),
      end: moment.unix(datum.end / 1000),
    };
  });
}

export function useEvents() {
  const {data: queryData, error, loading} = useApolloQuery(GET_EVENTS);
  const data = dbToMoment(queryData?.events);

  return {data, error, loading};
}

export function useHolidays() {
  const {data: queryData, error, loading} = useApolloQuery(GET_HOLIDAYS);
  const data = dbToMoment(queryData?.holidays);

  return {data, error, loading};
}
