import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {DatePicker} from '@material-ui/pickers';
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

export default function Form() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, 'day'));

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

  function onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const start = startDate.format(`YYYY-MM-DDT00:00:00`);
    const end = endDate.format(`YYYY-MM-DDT00:00:00`);
    createHoliday({
      variables: {
        start,
        end,
      },
    });
  }

  return (
    <form onSubmit={onSubmit} css={formStyle}>
      <div>
        <DatePicker
          value={startDate}
          onChange={date => setStartDate(date)}
          format="DD MMM YYYY"
          label="Start"
        />
        <DatePicker
          value={endDate}
          onChange={date => setEndDate(date)}
          format="DD MMM YYYY"
          label="End"
        />
      </div>
      <Button type="submit" css={{alignSelf: 'flex-end'}} color="primary">
        Add
      </Button>
    </form>
  );
}
