import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextField, Button} from '@material-ui/core';
import {TimePicker} from '@material-ui/pickers';
import {Save} from '@material-ui/icons';
import {form, textFieldStyle, saveStyle} from './style';
import moment from 'moment';

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

  function updateFormField(field, value) {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  }

  function onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    submitHandler({...formValues, childCover});
  }

  return (
    <form onSubmit={onSubmit} css={form}>
      <TextField
        id="name-field"
        value={formValues.title}
        onChange={({target: {value}}) => updateFormField('title', value)}
        css={textFieldStyle}
        label={childCover ? 'Name' : 'Event Name'}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {!childCover && (
        <>
          <TimePicker
            value={moment().format('YYYY-MM-DDT' + formValues.start)}
            onChange={date => updateFormField('start', date.format('HH:mm'))}
            label="Start Time"
          />
          <TimePicker
            value={moment().format('YYYY-MM-DDT' + formValues.end)}
            onChange={date => updateFormField('end', date.format('HH:mm'))}
            label="End Time"
          />
        </>
      )}
      {childCover && (
        <TextField
          multiline
          rows={4}
          id="notes"
          value={formValues.notes}
          onChange={({target: {value}}) => updateFormField('notes', value)}
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
