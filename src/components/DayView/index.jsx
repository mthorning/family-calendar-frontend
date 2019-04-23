import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { GET_EVENTS, CREATE_EVENT } from 'gql'
import Modal from 'components/Modal'
import AddEventForm from 'components/AddEventForm'

const propTypes = {
    dateHelpers: PropTypes.object.isRequired,
}

function DayView({ dateHelpers: { isDate, getDateStr, getMoment, setDate } }) {
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
                            getMoment,
                            closeModal,
                        }}
                    />
                )}
            </Mutation>
        </Modal>
    )
}

DayView.propTypes = propTypes
export default DayView
