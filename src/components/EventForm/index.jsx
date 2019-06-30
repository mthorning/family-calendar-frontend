import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextField, Button} from '@material-ui/core';
import {Save} from '@material-ui/icons';
import {form, textFieldStyle, saveStyle} from './style';

const propTypes = {
  submitHandler: PropTypes.func.isRequired,
  title: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  childCover: PropTypes.bool,
};

const defaultProps = {
  title: '',
  start: '08:00',
  end: '16:30',
};

function EventForm(props) {
  const {submitHandler, childCover, ...formProps} = props;
  const [formValues, setFormValues] = useState(formProps);

  const updateFormField = field => e => {
    const {value} = e.target;
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  function onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    submitHandler({...formValues, childCover});
  }

  return (
    <form onSubmit={onSubmit} css={form}>
      <TextField
        autoFocus
        id="name-field"
        value={formValues.title}
        onChange={updateFormField('title')}
        css={textFieldStyle}
        label={childCover ? 'Name' : 'Event Name'}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {!childCover && (
        <>
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
        </>
      )}
      {childCover && (
        <TextField
          multiline
          rows={4}
          id="notes"
          value={formValues.notes}
          onChange={updateFormField('notes')}
          css={textFieldStyle}
          label="Notes"
          InputLabelProps={{
            shrink: true,
          }}
          field="notes"
        />
      )}
      <Button
        disabled={!formValues.title}
        type="submit"
        variant="contained"
        size="large"
        color="primary">
        <Save css={saveStyle} />
        Save
      </Button>
    </form>
  );
}

EventForm.propTypes = propTypes;
EventForm.defaultProps = defaultProps;
export default EventForm;
