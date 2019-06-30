import gql from 'graphql-tag';

export const GET_EVENTS = gql`
  {
    events: listEvents {
      id
      title
      childCover
      start
      end
      notes
    }
  }
`;
export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $childCover: Boolean
    $start: String
    $end: String
    $notes: String
  ) {
    createEvent(
      title: $title
      childCover: $childCover
      start: $start
      end: $end
      notes: $notes
    ) {
      id
      title
      childCover
      start
      end
      notes
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: String!
    $title: String
    $childCover: Boolean
    $start: String
    $end: String
    $notes: String
  ) {
    updateEvent(
      id: $id
      title: $title
      childCover: $childCover
      start: $start
      end: $end
      notes: $notes
    ) {
      id
      title
      childCover
      start
      end
      notes
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export const GET_HOLIDAYS = gql`
  {
    holidays: listHolidays {
      id
      start
      end
    }
  }
`;

export const CREATE_HOLIDAY = gql`
  mutation CreateHoliday($start: String!, $end: String!) {
    createHoliday(start: $start, end: $end) {
      id
      start
      end
    }
  }
`;

export const DELETE_HOLIDAY = gql`
  mutation DeleteHoliday($id: String!) {
    deleteHoliday(id: $id) {
      id
    }
  }
`;
