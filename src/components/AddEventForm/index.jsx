import React from 'react'
import { Formik, Form, Field } from 'formik'
import { form, time } from './style'

function TimeInput({ name, label }) {
    return (
        <div css={time}>
            <label htmlFor={name}>{label}</label>
            <Field type="time" name={name} />
        </div>
    )
}

export default function() {
    function onSubmit(...args) {
        console.log(args)
    }
    return (
        <Formik onSubmit={onSubmit}>
            {() => (
                <Form css={form}>
                    <Field placeholder="Event Title" name="title" type="text" />
                    <TimeInput name="start" label="Start Time" />
                    <TimeInput name="end" label="End Time" />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    )
}
