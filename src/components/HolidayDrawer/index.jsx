import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Drawer, Divider} from '@material-ui/core';
import Form from './Form';
import List from './List';
import moment from 'moment';

const propTypes = {
  data: PropTypes.array,
};

const defaultProps = {
  data: {holidays: []},
};

// function stringToDate(holiday) {
//   return {
//     ...holiday,
//     start: moment(holiday.start),
//     end: moment(holiday.end),
//   };
// }

function dateToString(holiday) {
  return {
    ...holiday,
    //apparently Mongo uses ms but moment uses seconds:
    start: moment.unix(holiday.start / 1000).format('DD/MM/YYYY'),
    end: moment.unix(holiday.end / 1000).format('DD/MM/YYYY'),
  };
}

function HolidayDrawer({data: {holidays}}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Holidays</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div css={{padding: '8px'}}>
          <h2>Add a Holiday:</h2>
          <Form />
          <Divider />
          <List holidays={holidays.map(dateToString)} />
        </div>
      </Drawer>
    </>
  );
}

HolidayDrawer.propTypes = propTypes;
HolidayDrawer.defaultProps = defaultProps;
export default HolidayDrawer;
