import {useQuery as useApolloQuery} from 'react-apollo-hooks';
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

export default function useQuery(gcl, name) {
  const {data: queryData, error, loading} = useApolloQuery(gcl);
  const data = dbToMoment(queryData && queryData[name]);

  return {data, error, loading};
}
