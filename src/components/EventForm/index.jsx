import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { DateContext } from 'contexts'
import { form, textFieldStyle, saveStyle } from './style'

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    title: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
}

const defaultProps = {
    title: '',
    start: '08:00',
    end: '16:30',
}

function EventForm(props) {
    const { submitHandler, closeModal, ...formProps } = props
    const [formValues, setFormValues] = useState(formProps)

    const updateFormField = field => e => {
        const { value } = e.target
        setFormValues({
            ...formValues,
            [field]: value,
        })
    }

    function onKeyDown(e) {
        if (e.which === 13) {
            e.stopPropagation()
            e.preventDefault()
            onSubmit()
        }
    }

    function onSubmit() {
        submitHandler(formValues)
    }

    return (
        <form onKeyDown={onKeyDown} onSubmit={onSubmit} css={form}>
            <TextField
                autoFocus
                id="name-field"
                value={formValues.title}
                onChange={updateFormField('title')}
                css={textFieldStyle}
                label="Event Name"
                placeholder="Enter a name"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="start-field"
                value={formValues.start}
                onChange={updateFormField('start')}
                css={textFieldStyle}
                label="Start Time"
                type="time"
                InputLabelProps={{
                    shrink: true,
                }}
                field="start"
            />
            <TextField
                id="end-field"
                value={formValues.end}
                onChange={updateFormField('end')}
                css={textFieldStyle}
                label="End Time"
                type="time"
                InputLabelProps={{
                    shrink: true,
                }}
                field="end"
            />
            <Button
                disabled={!formValues.title}
                type="submit"
                variant="contained"
                size="large"
                color="primary"
            >
                <Save css={saveStyle} />
                Save
            </Button>
        </form>
    )
}

EventForm.propTypes = propTypes
EventForm.defaultProps = defaultProps
export default EventForm
