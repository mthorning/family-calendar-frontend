import React, { useContext, useMemo } from 'react'
import Modal from 'components/Modal'
import { Mutation } from 'react-apollo'
import { GET_EVENTS, UPDATE_EVENT } from 'gql'
import { EventContext } from 'contexts'
import EventForm from 'components/EventForm'
import moment from 'moment'

export default function EventView() {
    const [selectedEvent, setSelectedEvent] = useContext(EventContext)
    const title = selectedEvent && selectedEvent.title
    const formProps = useMemo(() => {
        if (!selectedEvent) return {}
        return {
            id: selectedEvent.id,
            title: selectedEvent.title,
            start: moment(selectedEvent.start).format('HH:mm'),
            end: moment(selectedEvent.end).format('HH:mm'),
        }
    }, [selectedEvent])

    function EventFormWithSubmit(updateEvent) {
        function submitHandler(formValues) {
            const { id, start: savedStart, end: savedEnd } = selectedEvent
            const start = moment(savedStart).format(
                `YYYY-MM-DDT${formValues.start}:00`
            )
            const end = moment(savedStart).format(
                `YYYY-MM-DDT${formValues.end}:00`
            )
            updateEvent({
                variables: {
                    title: formValues.title,
                    id,
                    start,
                    end,
                },
            }).then(() => setSelectedEvent(null))
        }
        return (
            <EventForm
                {...{
                    ...formProps,
                    submitHandler,
                }}
            />
        )
    }

    return (
        <Modal open={!!selectedEvent} title={title}>
            <Mutation mutation={UPDATE_EVENT}>{EventFormWithSubmit}</Mutation>
        </Modal>
    )
}
