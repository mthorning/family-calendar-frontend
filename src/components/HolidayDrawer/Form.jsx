import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import {useMutation} from 'react-apollo-hooks';
import {GET_HOLIDAYS, CREATE_HOLIDAY} from 'gql';
import {css} from '@emotion/core';
import moment from 'moment';

const formStyle = css`
  margin-top: 20px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const textFieldStyle = css`
  margin: 10px;
`;

export default function Form() {
  const [formValues, setFormValues] = useState({});

  const createHoliday = useMutation(CREATE_HOLIDAY, {
    update(cache, {data: {createHoliday}}) {
      const {holidays} = cache.readQuery({
        query: GET_HOLIDAYS,
      });
      cache.writeQuery({
        query: GET_HOLIDAYS,
        data: {
          holidays: holidays.concat([createHoliday]),
        },
      });
    },
  });

  const updateFormField = field => e => {
    const {value} = e.target;
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };
  function onKeyDown(e) {
    if (e.which === 13) {
      onSubmit(e);
    }
  }

  function onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const start = moment(formValues.start).format(`YYYY-MM-DDT00:00:00`);
    const end = moment(formValues.start).format(`YYYY-MM-DDT00:00:00`);
    createHoliday({
      variables: {
        start,
        end,
      },
    });
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
      <Button type="submit" css={{alignSelf: 'flex-end'}} color="primary">
        Add
      </Button>
    </form>
  );
}
