import React from 'react';
import PropTypes from 'prop-types';
import {css} from '@emotion/core';
import {useMutation} from 'react-apollo-hooks';
import {DELETE_HOLIDAY, GET_HOLIDAYS} from 'gql';

const propTypes = {
  holidays: PropTypes.array.isRequired,
};

const listStyle = css`
  width: 350px;
  li:hover {
    cursor: pointer;
  }
`;

function ListItem({start, end, id}) {
  const deleteHoliday = useMutation(DELETE_HOLIDAY, {
    update(cache, {data: {deleteHoliday}}) {
      const {holidays} = cache.readQuery({
        query: GET_HOLIDAYS,
      });
      const deleted = holidays.findIndex(hol => hol.id === deleteHoliday.id);
      cache.writeQuery({
        query: GET_HOLIDAYS,
        data: {
          holidays: [
            ...holidays.slice(0, deleted),
            ...holidays.slice(deleted + 1),
          ],
        },
      });
    },
  });

  return (
    <li key={id} onClick={() => deleteHoliday({variables: {id}})}>
      {`${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`}
    </li>
  );
}

function List({holidays}) {
  return <ul css={listStyle}>{holidays.map(ListItem)}</ul>;
}

List.propTypes = propTypes;
export default List;
