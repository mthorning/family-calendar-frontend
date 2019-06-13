import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import { css } from '@emotion/core'
import moment from 'moment'

const formStyle = css`
    margin-top: 20px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const textFieldStyle = css`
    margin: 10px;
`

function Form({ submitHandler }) {
    const [formValues, setFormValues] = useState({})

    const updateFormField = field => e => {
        const { value } = e.target
        setFormValues({
            ...formValues,
            [field]: value,
        })
    }
    function onKeyDown(e) {
        if (e.which === 13) {
            onSubmit(e)
        }
    }

    function onSubmit(e) {
        e.stopPropagation()
        e.preventDefault()
        const start = moment(formValues.start).format(`YYYY-MM-DDT00:00:00`)
        const end = moment(formValues.start).format(`YYYY-MM-DDT00:00:00`)
        submitHandler({
            variables: {
                start,
                end,
            },
        })
    }

    return (
        <form onKeyDown={onKeyDown} onSubmit={onSubmit} css={formStyle}>
            <div>
                <TextField
                    css={textFieldStyle}
                    id="start-date"
                    onChange={updateFormField('start')}
                    label="Start Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    field="start"
                />
                <TextField
                    css={textFieldStyle}
                    id="end-date"
                    onChange={updateFormField('end')}
                    label="End Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    field="end"
                />
            </div>
            <Button
                type="submit"
                css={{ alignSelf: 'flex-end' }}
                color="primary"
            >
                Add
            </Button>
        </form>
    )
}

Form.propTypes = {
    submitHandler: PropTypes.func.isRequired,
}

export default Form
