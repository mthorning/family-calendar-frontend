import React, { useMemo, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { form, textFieldStyle, saveStyle } from './style'

const defaultFormValues = {
    name: '',
    start: '08:00',
    end: '16:30',
}

export default function() {
    const [formValues, setFormValues] = useState(defaultFormValues)

    const updateFormField = field => e => {
        const { value } = e.target
        setFormValues({
            ...formValues,
            [field]: value,
        })
    }

    function submitForm() {
        console.log(formValues)
    }

    return (
        <form css={form}>
            <TextField
                autoFocus
                id="name-field"
                value={formValues.name}
                onChange={updateFormField('name')}
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
                onClick={submitForm}
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
