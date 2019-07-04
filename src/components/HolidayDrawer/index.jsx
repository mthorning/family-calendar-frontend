import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Drawer, Divider} from '@material-ui/core';
import Form from './Form';
import List from './List';
import Arrow from '@material-ui/icons/ArrowBack';

const propTypes = {
  holidays: PropTypes.array,
};

const defaultProps = {
  holidays: [],
};

function HolidayDrawer({holidays}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button css={{cursor: 'pointer'}} onClick={() => setOpen(true)}>
        Holidays
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div css={{maxWidth: '100vw', padding: '8px'}}>
          <Arrow css={{cursor: 'pointer'}} onClick={() => setOpen(false)} />
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
