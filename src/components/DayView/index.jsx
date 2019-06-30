import React, {useState, useContext} from 'react';
import {useMutation} from 'react-apollo-hooks';
import {GET_EVENTS, CREATE_EVENT} from 'gql';
import {Tabs, Tab} from '@material-ui/core';
import Modal from 'components/Modal';
import EventForm from 'components/EventForm';
import {DateContext} from 'contexts';

export default function DayView() {
  const {isDate, getDateStr, setDate, getMoment} = useContext(DateContext);
  const [childCover, setChildCover] = useState(0);

  const addEvent = useMutation(CREATE_EVENT, {
    update(cache, {data: {createEvent}}) {
      const {events} = cache.readQuery({
        query: GET_EVENTS,
      });
      cache.writeQuery({
        query: GET_EVENTS,
        data: {events: events.concat([createEvent])},
      });
    },
  });

  function closeModal() {
    setDate(null);
  }

  function submitHandler(formValues) {
    const {title, childCover, notes} = formValues;
    const start = getMoment().format(`YYYY-MM-DDT${formValues.start}:00`);
    const end = getMoment().format(`YYYY-MM-DDT${formValues.end}:00`);
    addEvent({
      variables: {
        title,
        childCover,
        notes,
        start,
        end,
      },
    }).then(closeModal);
  }

  return (
    <Modal
      closeWith={closeModal}
      open={isDate}
      title={getDateStr('DD/MM/YYYY')}>
      <Tabs value={childCover} onChange={(_, val) => setChildCover(val)}>
        <Tab label="Event" />
        <Tab label="Child Cover" />
      </Tabs>
      <EventForm
        {...{
          submitHandler,
          childCover: !!childCover,
        }}
      />
    </Modal>
  );
}
