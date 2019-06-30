import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useMutation} from 'react-apollo-hooks';
import {GET_EVENTS, DELETE_EVENT} from 'gql';
import DeleteIcon from '@material-ui/icons/Delete';
import {css} from '@emotion/core';
import {Button, IconButton} from '@material-ui/core';

const propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.string,
};

function DeleteButton({id, closeModal}) {
  const [deleting, setDeleting] = useState(false);

  const deleteEvent = useMutation(DELETE_EVENT, {
    update(cache, {data: {deleteEvent}}) {
      const {events} = cache.readQuery({
        query: GET_EVENTS,
      });
      const deleted = events.findIndex(event => event.id === deleteEvent.id);
      cache.writeQuery({
        query: GET_EVENTS,
        data: {
          events: [...events.slice(0, deleted), ...events.slice(deleted + 1)],
        },
      });
    },
  });

  const deleteStyle = css`
    &:hover {
      color: red;
    }
  `;

  if (deleting) {
    return (
      <>
        Are you sure?
        <Button
          color="secondary"
          onClick={() => {
            deleteEvent({variables: {id}}).then(closeModal);
          }}>
          Yes
        </Button>
        <Button color="primary" onClick={() => setDeleting(false)}>
          No
        </Button>
      </>
    );
  }

  return (
    <IconButton onClick={() => setDeleting(true)} css={deleteStyle}>
      <DeleteIcon />
    </IconButton>
  );
}

DeleteButton.propTypes = propTypes;
export default DeleteButton;
