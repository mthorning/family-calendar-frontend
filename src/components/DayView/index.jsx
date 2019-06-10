import React, { useContext } from 'react'
import { Mutation } from 'react-apollo'
import { GET_EVENTS, CREATE_EVENT } from 'gql'
import Modal from 'components/Modal'
import EventForm from 'components/EventForm'
import { DateContext } from 'contexts'

function DayView() {
    const { isDate, getDateStr, setDate, getMoment } = useContext(DateContext)

    function closeModal() {
        setDate(null)
    }

    function EventFormWithSubmit(addEvent) {
        function submitHandler(formValues) {
            const start = getMoment().format(
                `YYYY-MM-DDT${formValues.start}:00`
            )
            const end = getMoment().format(`YYYY-MM-DDT${formValues.end}:00`)
            addEvent({
                variables: {
                    title: formValues.title,
                    start,
                    end,
                },
            }).then(closeModal)
        }
        return (
            <EventForm
                {...{
                    submitHandler,
                }}
            />
        )
    }

    return (
        <Modal
            closeWith={closeModal}
            open={isDate}
            title={getDateStr('DD/MM/YYYY')}
        >
            <Mutation
                mutation={CREATE_EVENT}
                update={(cache, { data: { createEvent } }) => {
                    const { events } = cache.readQuery({
                        query: GET_EVENTS,
                    })
                    cache.writeQuery({
                        query: GET_EVENTS,
                        data: { events: events.concat([createEvent]) },
                    })
                }}
            >
                {EventFormWithSubmit}
            </Mutation>
        </Modal>
    )
}

export default DayView
