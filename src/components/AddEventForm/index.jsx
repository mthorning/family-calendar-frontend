import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { form, textFieldStyle, saveStyle } from './style'

const defaultFormValues = {
    title: '',
    start: '08:00',
    end: '16:30',
}

export default function({ getMoment, addEvent, closeModal }) {
    const [formValues, setFormValues] = useState(defaultFormValues)

    const updateFormField = field => e => {
        const { value } = e.target
        setFormValues({
            ...formValues,
            [field]: value,
        })
    }

    function submitForm() {
        const start = getMoment().format(`YYYY-MM-DDT${formValues.start}:00`)
        const end = getMoment().format(`YYYY-MM-DDT${formValues.end}:00`)
        addEvent({
            variables: {
                title: formValues.title,
                start,
                end,
            },
        }).then(closeModal)
    }

    function onKeyDown(e) {
        if (e.which === 13) {
            e.stopPropagation()
            e.preventDefault()
            submitForm()
        }
    }

    return (
        <form onKeyDown={onKeyDown} onSubmit={submitForm} css={form}>
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
