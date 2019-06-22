import React, { useState, useContext, useMemo } from 'react'
import Modal from 'components/Modal'
import { Mutation } from 'react-apollo'
import { GET_EVENTS, UPDATE_EVENT, DELETE_EVENT } from 'gql'
import { EventContext } from 'contexts'
import EventForm from 'components/EventForm'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete'
import { css } from '@emotion/core'
import { Button, IconButton } from '@material-ui/core'

export default function EventView() {
    const [selectedEvent, setSelectedEvent] = useContext(EventContext)
    const [deleting, setDeleting] = useState(false)
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

    function closeModal() {
        setDeleting(false)
        setSelectedEvent(null)
    }

    function deleteButton(deleteEvent) {
        const deleteStyle = css`
            &:hover {
                color: red;
            }
        `
        if (deleting) {
            return (
                <>
                    Are you sure?
                    <Button
                        color="secondary"
                        onClick={() => {
                            deleteEvent({ variables: { id: formProps.id } })
                            closeModal()
                        }}
                    >
                        Yes
                    </Button>
                    <Button color="primary" onClick={() => setDeleting(false)}>
                        No
                    </Button>
                </>
            )
        }

        return (
            <IconButton onClick={() => setDeleting(true)} css={deleteStyle}>
                <DeleteIcon />
            </IconButton>
        )
    }

    function eventFormWithSubmit(updateEvent) {
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
            }).then(closeModal)
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
        <Modal closeWith={closeModal} open={!!selectedEvent} title={title}>
            <Mutation mutation={UPDATE_EVENT}>{eventFormWithSubmit}</Mutation>
            <div css={{ height: '40px' }}>
                <Mutation
                    mutation={DELETE_EVENT}
                    update={(cache, { data: { deleteEvent } }) => {
                        const { events } = cache.readQuery({
                            query: GET_EVENTS,
                        })
                        const deleted = events.findIndex(
                            event => event.id === deleteEvent.id
                        )
                        cache.writeQuery({
                            query: GET_EVENTS,
                            data: {
                                events: [
                                    ...events.slice(0, deleted),
                                    ...events.slice(deleted + 1),
                                ],
                            },
                        })
                    }}
                >
                    {deleteButton}
                </Mutation>
            </div>
        </Modal>
    )
}
