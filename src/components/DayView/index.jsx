import React, { useContext } from 'react'
import { Mutation } from 'react-apollo'
import { GET_EVENTS, CREATE_EVENT } from 'gql'
import Modal from 'components/Modal'
import AddEventForm from 'components/AddEventForm'
import { DateContext } from 'contexts'

function DayView() {
    const { isDate, getDateStr, setDate } = useContext(DateContext)
    function closeModal() {
        setDate(null)
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
                {addEvent => (
                    <AddEventForm
                        {...{
                            addEvent,
                            closeModal,
                        }}
                    />
                )}
            </Mutation>
        </Modal>
    )
}

export default DayView
