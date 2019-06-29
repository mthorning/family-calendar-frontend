import React, {useContext} from 'react';
import {useMutation} from 'react-apollo-hooks';
import {GET_EVENTS, CREATE_EVENT} from 'gql';
import Modal from 'components/Modal';
import EventForm from 'components/EventForm';
import {DateContext} from 'contexts';

export default function DayView() {
  const {isDate, getDateStr, setDate, getMoment} = useContext(DateContext);

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
    const start = getMoment().format(`YYYY-MM-DDT${formValues.start}:00`);
    const end = getMoment().format(`YYYY-MM-DDT${formValues.end}:00`);
    addEvent({
      variables: {
        title: formValues.title,
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
      <EventForm
        {...{
          submitHandler,
        }}
      />
    </Modal>
  );
}
