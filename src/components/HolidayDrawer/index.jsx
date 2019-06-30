import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Drawer, Divider} from '@material-ui/core';
import Form from './Form';
import List from './List';

const propTypes = {
  holidays: PropTypes.object,
};

const defaultProps = {
  holidays: [],
};

// function stringToDate(holiday) {
//   return {
//     ...holiday,
//     start: moment(holiday.start),
//     end: moment(holiday.end),
//   };
// }

function HolidayDrawer({holidays}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Holidays</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div css={{padding: '8px'}}>
          <h2>Add a Holiday:</h2>
          <Form />
          <Divider />
          <List holidays={holidays} />
        </div>
      </Drawer>
    </>
  );
}

HolidayDrawer.propTypes = propTypes;
HolidayDrawer.defaultProps = defaultProps;
export default HolidayDrawer;
