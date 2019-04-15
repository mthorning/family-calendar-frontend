import React from 'react'
import { form, time } from './style'

function TimeInput({ name, label }) {
    return (
        <div css={time}>
            <label htmlFor={name}>{label}</label>
        </div>
    )
}

export default function() {
    function onSubmit(...args) {
        console.log(args)
    }
    return (
        <form css={form}>
            <TimeInput name="start" label="Start Time" />
            <TimeInput name="end" label="End Time" />
            <button type="submit">Submit</button>
        </form>
    )
}
