import React, {useContext, useMemo} from 'react';
import Modal from 'components/Modal';
import {useMutation} from 'react-apollo-hooks';
import {UPDATE_EVENT} from 'gql';
import {EventContext} from 'contexts';
import EventForm from 'components/EventForm';
import DeleteButton from './DeleteButton.jsx';
import moment from 'moment';

export default function EventView() {
  const {selectedEvent, setSelectedEvent} = useContext(EventContext);
  const title = selectedEvent && selectedEvent.title;

  const formProps = useMemo(() => {
    if (!selectedEvent) return {};
    return {
      id: selectedEvent.id,
      title: selectedEvent.title,
      start: moment(selectedEvent.start).format('HH:mm'),
      end: moment(selectedEvent.end).format('HH:mm'),
    };
  }, [selectedEvent]);

  function closeModal() {
    setSelectedEvent(null);
  }

  const updateEvent = useMutation(UPDATE_EVENT, {});

  function submitHandler(formValues) {
    const {id, start: savedStart, end: savedEnd} = selectedEvent;
    const start = moment(savedStart).format(
      `YYYY-MM-DDT${formValues.start}:00`,
    );
    const end = moment(savedEnd).format(`YYYY-MM-DDT${formValues.end}:00`);
    updateEvent({
      variables: {
        title: formValues.title,
        id,
        start,
        end,
      },
    }).then(closeModal);
  }

  return (
    <Modal closeWith={closeModal} open={!!selectedEvent} title={title}>
      <EventForm
        {...{
          ...formProps,
          submitHandler,
        }}
      />
      <div css={{height: '40px'}}>
        <DeleteButton id={formProps.id} closeModal={closeModal} />
      </div>
    </Modal>
  );
}
